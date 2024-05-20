import type { SupabaseHabitProgress } from "@/infrastructure/supabase/supabase"
import { HABIT_PROGRESS_MOCK } from "../domain/HabitProgress"

interface SupabaseHabitProgressMockCreateOptions {
  id: SupabaseHabitProgress["id"]
  habitId: SupabaseHabitProgress["habit_id"]
  date?: Date
  goalProgress: SupabaseHabitProgress["goal_progress"]
}
const supabaseHabitProgressMockCreate = (
  options: SupabaseHabitProgressMockCreateOptions,
): SupabaseHabitProgress => {
  const { id, habitId, date = new Date(), goalProgress } = options

  return {
    id,
    habit_id: habitId,
    date: date.toISOString(),
    goal_progress: goalProgress,
  }
}

const exampleByIds = Object.fromEntries(
  Object.entries(HABIT_PROGRESS_MOCK.exampleByIds).map(
    ([id, habitProgress]) => {
      return [
        id,
        supabaseHabitProgressMockCreate({
          id: Number.parseInt(habitProgress.id, 10),
          habitId: Number.parseInt(habitProgress.habitId, 10),
          date: new Date(habitProgress.date),
          goalProgress: habitProgress.goalProgress.isNumeric()
            ? habitProgress.goalProgress.progress
            : habitProgress.goalProgress.isCompleted()
              ? 1
              : 0,
        }),
      ]
    },
  ),
) as {
  [key in keyof (typeof HABIT_PROGRESS_MOCK)["exampleByIds"]]: SupabaseHabitProgress
}

export const SUPABASE_HABIT_PROGRESS_MOCK = {
  create: supabaseHabitProgressMockCreate,
  exampleByIds,
  examples: Object.values(exampleByIds),
}
