-- Users
-- User { email: 'test@test.com', password: 'test1234' }
INSERT INTO
  "auth"."users" (
    "instance_id",
    "id",
    "aud",
    "role",
    "email",
    "encrypted_password",
    "email_confirmed_at",
    "invited_at",
    "confirmation_token",
    "confirmation_sent_at",
    "recovery_token",
    "recovery_sent_at",
    "email_change_token_new",
    "email_change",
    "email_change_sent_at",
    "last_sign_in_at",
    "raw_app_meta_data",
    "raw_user_meta_data",
    "is_super_admin",
    "created_at",
    "updated_at",
    "phone",
    "phone_confirmed_at",
    "phone_change",
    "phone_change_token",
    "phone_change_sent_at",
    "email_change_token_current",
    "email_change_confirm_status",
    "banned_until",
    "reauthentication_token",
    "reauthentication_sent_at",
    "is_sso_user",
    "deleted_at"
  )
VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    'ab054ee9-fbb4-473e-942b-bbf4415f4bef',
    'authenticated',
    'authenticated',
    'test@test.com',
    crypt('test1234', gen_salt('bf')),
    timezone('utc' :: text, NOW()),
    NULL,
    '',
    NULL,
    '',
    NULL,
    '',
    '',
    NULL,
    NULL,
    '{"provider": "email", "providers": ["email"]}',
    '{"display_name": "Test"}',
    NULL,
    timezone('utc' :: text, NOW()),
    timezone('utc' :: text, NOW()),
    NULL,
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL,
    false,
    NULL
  );

INSERT INTO
  "auth"."identities" (
    "id",
    "user_id",
    "identity_data",
    "provider",
    "provider_id",
    "last_sign_in_at",
    "created_at",
    "updated_at"
  )
VALUES
  (
    'ab054ee9-fbb4-473e-942b-bbf4415f4bef',
    'ab054ee9-fbb4-473e-942b-bbf4415f4bef',
    '{"sub": "ab054ee9-fbb4-473e-942b-bbf4415f4bef", "email": "test@test.com"}',
    'email',
    'ab054ee9-fbb4-473e-942b-bbf4415f4bef',
    timezone('utc' :: text, NOW()),
    timezone('utc' :: text, NOW()),
    timezone('utc' :: text, NOW())
  );

-- Habits
INSERT INTO
  "public"."habits" (
    id,
    user_id,
    name,
    color,
    icon,
    start_date,
    end_date,
    goal_frequency,
    goal_target,
    goal_target_unit
  )
VALUES
  (
    1,
    'ab054ee9-fbb4-473e-942b-bbf4415f4bef',
    'Wake up at 07h00',
    '#006CFF',
    'bed',
    timezone('utc' :: text, NOW()),
    NULL,
    'daily',
    NULL,
    NULL
  );

INSERT INTO
  "public"."habits" (
    id,
    user_id,
    name,
    color,
    icon,
    start_date,
    end_date,
    goal_frequency,
    goal_target,
    goal_target_unit
  )
VALUES
  (
    2,
    'ab054ee9-fbb4-473e-942b-bbf4415f4bef',
    'Learn English',
    '#EB4034',
    'language',
    timezone('utc' :: text, NOW()),
    NULL,
    'daily',
    30,
    'minutes'
  );

INSERT INTO
  "public"."habits" (
    id,
    user_id,
    name,
    color,
    icon,
    start_date,
    end_date,
    goal_frequency,
    goal_target,
    goal_target_unit
  )
VALUES
  (
    3,
    'ab054ee9-fbb4-473e-942b-bbf4415f4bef',
    'Walk',
    '#228B22',
    'person-walking',
    timezone('utc' :: text, NOW()),
    NULL,
    'daily',
    5000,
    'steps'
  );

INSERT INTO
  "public"."habits" (
    id,
    user_id,
    name,
    color,
    icon,
    start_date,
    end_date,
    goal_frequency,
    goal_target,
    goal_target_unit
  )
VALUES
  (
    4,
    'ab054ee9-fbb4-473e-942b-bbf4415f4bef',
    'Clean the house',
    '#808080',
    'broom',
    timezone('utc' :: text, NOW()),
    NULL,
    'weekly',
    NULL,
    NULL
  );

INSERT INTO
  "public"."habits" (
    id,
    user_id,
    name,
    color,
    icon,
    start_date,
    end_date,
    goal_frequency,
    goal_target,
    goal_target_unit
  )
VALUES
  (
    5,
    'ab054ee9-fbb4-473e-942b-bbf4415f4bef',
    'Solve Programming Challenges',
    '#DE3163',
    'code',
    timezone('utc' :: text, NOW()),
    NULL,
    'monthly',
    5,
    'challenges'
  );

-- Habits Progresses
INSERT INTO
  "public"."habits_progresses" (
    id,
    habit_id,
    date,
    goal_progress
  )
VALUES
  (
    1,
    4,
    timezone('utc' :: text, NOW()),
    1
  );

INSERT INTO
  "public"."habits_progresses" (
    id,
    habit_id,
    date,
    goal_progress
  )
VALUES
  (
    2,
    3,
    timezone('utc' :: text, NOW()),
    4733
  );
