import type { Habit } from "@/domain/entities/Habit"
import { HABIT_MOCK } from "@/tests/mocks/domain/Habit"
import { HABIT_PROGRESS_MOCK } from "@/tests/mocks/domain/HabitProgress"
import { SUPABASE_HABIT_PROGRESS_MOCK } from "@/tests/mocks/supabase/HabitProgress"
import { habitProgressSupabaseDTO } from "../HabitProgressDTO"

describe("infrastructure/supabase/data-transfer-objects/HabitProgressDTO", () => {
  describe("habitProgressSupabaseDTO.fromSupabaseToDomain", () => {
    for (const example of SUPABASE_HABIT_PROGRESS_MOCK.examples) {
      it(`should return correct HabitProgress entity - ${example.id}`, () => {
        const habit = HABIT_MOCK.examplesByIds[example.habit_id] as Habit
        expect(
          habitProgressSupabaseDTO.fromSupabaseToDomain(example, habit.goal),
        ).toEqual(
          HABIT_PROGRESS_MOCK.exampleByIds[
            example.id as keyof typeof HABIT_PROGRESS_MOCK.exampleByIds
          ],
        )
      })
    }
  })
})
