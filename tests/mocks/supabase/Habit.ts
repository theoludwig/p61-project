import type { SupabaseHabit } from "@/infrastructure/supabase/supabase"
import { HABIT_MOCK } from "../domain/Habit"
import { SUPABASE_USER_MOCK } from "./User"

interface SupabaseHabitMockCreateOptions {
  id: SupabaseHabit["id"]
  userId: SupabaseHabit["user_id"]
  name: SupabaseHabit["name"]
  color: SupabaseHabit["color"]
  icon: SupabaseHabit["icon"]
  startDate?: Date
  endDate: Date | null
  goalFrequency: SupabaseHabit["goal_frequency"]
  goalTarget: SupabaseHabit["goal_target"] | null
  goalTargetUnit: SupabaseHabit["goal_target_unit"] | null
}
const supabaseHabitMockCreate = (
  options: SupabaseHabitMockCreateOptions,
): SupabaseHabit => {
  const {
    id,
    userId,
    name,
    color,
    icon,
    startDate = new Date(),
    endDate,
    goalFrequency,
    goalTarget,
    goalTargetUnit,
  } = options

  return {
    id,
    user_id: userId,
    name,
    color,
    icon,
    start_date: startDate.toISOString(),
    end_date: endDate?.toISOString() ?? null,
    goal_frequency: goalFrequency,
    goal_target: goalTarget,
    goal_target_unit: goalTargetUnit,
  }
}

const examplesByNames = Object.fromEntries(
  Object.entries(HABIT_MOCK.examplesByNames).map(([name, habit]) => {
    const goalTarget = habit.goal.isNumeric() ? habit.goal.target.value : null
    const goalTargetUnit = habit.goal.isNumeric()
      ? habit.goal.target.unit
      : null
    return [
      name,
      supabaseHabitMockCreate({
        id: Number.parseInt(habit.id, 10),
        userId: SUPABASE_USER_MOCK.example.id,
        name: habit.name,
        color: habit.color,
        icon: habit.icon,
        startDate: habit.startDate,
        endDate: habit.endDate ?? null,
        goalFrequency: habit.goal.frequency,
        goalTarget,
        goalTargetUnit,
      }),
    ]
  }),
) as {
  [key in keyof (typeof HABIT_MOCK)["examplesByNames"]]: SupabaseHabit
}

export const SUPABASE_HABIT_MOCK = {
  create: supabaseHabitMockCreate,
  example:
    examplesByNames[HABIT_MOCK.example.name as keyof typeof examplesByNames],
  examples: Object.values(examplesByNames),
  examplesByNames,
}
