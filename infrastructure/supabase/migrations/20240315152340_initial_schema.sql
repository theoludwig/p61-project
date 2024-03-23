CREATE TYPE "public"."goal_frequency" AS enum ('daily', 'weekly', 'monthly');

CREATE TABLE "public"."habits" (
  "id" bigint generated by DEFAULT AS identity NOT NULL,
  "name" text NOT NULL,
  "color" text NOT NULL,
  "icon" text NOT NULL,
  "start_date" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "end_date" timestamp WITH time zone,
  "goal_frequency" goal_frequency NOT NULL,
  "goal_target" bigint,
  "goal_target_unit" text,
  "user_id" uuid NOT NULL DEFAULT auth.uid()
);

ALTER TABLE
  "public"."habits" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."habits_progresses" (
  "id" bigint generated by DEFAULT AS identity NOT NULL,
  "habit_id" bigint NOT NULL,
  "date" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "goal_progress" bigint NOT NULL
);

ALTER TABLE
  "public"."habits_progresses" enable ROW LEVEL SECURITY;

CREATE UNIQUE INDEX habits_id_key ON public.habits USING btree (id);

CREATE UNIQUE INDEX habits_pkey ON public.habits USING btree (id);

CREATE UNIQUE INDEX habits_progresses_id_key ON public.habits_progresses USING btree (id);

CREATE UNIQUE INDEX habits_progresses_pkey ON public.habits_progresses USING btree (id);

ALTER TABLE
  "public"."habits"
ADD
  CONSTRAINT "habits_pkey" PRIMARY KEY USING INDEX "habits_pkey";

ALTER TABLE
  "public"."habits_progresses"
ADD
  CONSTRAINT "habits_progresses_pkey" PRIMARY KEY USING INDEX "habits_progresses_pkey";

ALTER TABLE
  "public"."habits"
ADD
  CONSTRAINT "habits_id_key" UNIQUE USING INDEX "habits_id_key";

ALTER TABLE
  "public"."habits"
ADD
  CONSTRAINT "public_habits_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."habits" validate CONSTRAINT "public_habits_user_id_fkey";

ALTER TABLE
  "public"."habits_progresses"
ADD
  CONSTRAINT "habits_progresses_id_key" UNIQUE USING INDEX "habits_progresses_id_key";

ALTER TABLE
  "public"."habits_progresses"
ADD
  CONSTRAINT "public_habits_progresses_habit_id_fkey" FOREIGN KEY (habit_id) REFERENCES habits(id) ON UPDATE CASCADE ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."habits_progresses" validate CONSTRAINT "public_habits_progresses_habit_id_fkey";

GRANT DELETE ON TABLE "public"."habits" TO "anon";

GRANT
INSERT
  ON TABLE "public"."habits" TO "anon";

GRANT REFERENCES ON TABLE "public"."habits" TO "anon";

GRANT
SELECT
  ON TABLE "public"."habits" TO "anon";

GRANT trigger ON TABLE "public"."habits" TO "anon";

GRANT TRUNCATE ON TABLE "public"."habits" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."habits" TO "anon";

GRANT DELETE ON TABLE "public"."habits" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."habits" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."habits" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."habits" TO "authenticated";

GRANT trigger ON TABLE "public"."habits" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."habits" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."habits" TO "authenticated";

GRANT DELETE ON TABLE "public"."habits" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."habits" TO "service_role";

GRANT REFERENCES ON TABLE "public"."habits" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."habits" TO "service_role";

GRANT trigger ON TABLE "public"."habits" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."habits" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."habits" TO "service_role";

GRANT DELETE ON TABLE "public"."habits_progresses" TO "anon";

GRANT
INSERT
  ON TABLE "public"."habits_progresses" TO "anon";

GRANT REFERENCES ON TABLE "public"."habits_progresses" TO "anon";

GRANT
SELECT
  ON TABLE "public"."habits_progresses" TO "anon";

GRANT trigger ON TABLE "public"."habits_progresses" TO "anon";

GRANT TRUNCATE ON TABLE "public"."habits_progresses" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."habits_progresses" TO "anon";

GRANT DELETE ON TABLE "public"."habits_progresses" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."habits_progresses" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."habits_progresses" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."habits_progresses" TO "authenticated";

GRANT trigger ON TABLE "public"."habits_progresses" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."habits_progresses" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."habits_progresses" TO "authenticated";

GRANT DELETE ON TABLE "public"."habits_progresses" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."habits_progresses" TO "service_role";

GRANT REFERENCES ON TABLE "public"."habits_progresses" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."habits_progresses" TO "service_role";

GRANT trigger ON TABLE "public"."habits_progresses" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."habits_progresses" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."habits_progresses" TO "service_role";

CREATE policy "Enable delete for users based on user_id" ON "public"."habits" AS permissive FOR DELETE TO authenticated USING ((auth.uid() = user_id));

CREATE policy "Enable insert for users based on user_id" ON "public"."habits" AS permissive FOR
INSERT
  TO authenticated WITH CHECK ((auth.uid() = user_id));

CREATE policy "Enable select for users based on user_id" ON "public"."habits" AS permissive FOR
SELECT
  TO authenticated USING ((auth.uid() = user_id));

CREATE policy "Enable update for users based on user_id" ON "public"."habits" AS permissive FOR
UPDATE
  TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));

CREATE policy "Enable delete for users based on user_id" ON "public"."habits_progresses" AS permissive FOR DELETE TO authenticated USING (
  (
    auth.uid() IN (
      SELECT
        habits.user_id
      FROM
        habits
      WHERE
        (habits_progresses.habit_id = habits.id)
    )
  )
);

CREATE policy "Enable insert for users based on user_id" ON "public"."habits_progresses" AS permissive FOR
INSERT
  TO authenticated WITH CHECK (
    (
      auth.uid() IN (
        SELECT
          habits.user_id
        FROM
          habits
        WHERE
          (habits_progresses.habit_id = habits.id)
      )
    )
  );

CREATE policy "Enable select for users based on user_id" ON "public"."habits_progresses" AS permissive FOR
SELECT
  TO authenticated USING (
    (
      auth.uid() IN (
        SELECT
          habits.user_id
        FROM
          habits
        WHERE
          (habits_progresses.habit_id = habits.id)
      )
    )
  );

CREATE policy "Enable update for users based on user_id" ON "public"."habits_progresses" AS permissive FOR
UPDATE
  TO authenticated USING (
    (
      auth.uid() IN (
        SELECT
          habits.user_id
        FROM
          habits
        WHERE
          (habits_progresses.habit_id = habits.id)
      )
    )
  ) WITH CHECK (
    (
      auth.uid() IN (
        SELECT
          habits.user_id
        FROM
          habits
        WHERE
          (habits_progresses.habit_id = habits.id)
      )
    )
  );