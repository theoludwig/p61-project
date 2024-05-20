import type { GoalBoolean, GoalNumeric } from "@/domain/entities/Goal"
import {
  GoalBooleanProgress,
  GoalNumericProgress,
} from "@/domain/entities/Goal"
import type { HabitProgressData } from "@/domain/entities/HabitProgress"
import { HabitProgress } from "@/domain/entities/HabitProgress"
import { HABIT_MOCK } from "./Habit"

interface HabitProgressMockCreateOptions
  extends Omit<HabitProgressData, "date"> {
  date?: Date
}

const habitProgressMockCreate = (
  options: HabitProgressMockCreateOptions,
): HabitProgress => {
  const { id, habitId, goalProgress, date = new Date() } = options

  return new HabitProgress({
    date,
    goalProgress,
    habitId,
    id,
  })
}

const exampleByIds = {
  1: habitProgressMockCreate({
    id: "1",
    habitId: HABIT_MOCK.examplesByNames["Clean the house"].id,
    goalProgress: new GoalBooleanProgress({
      goal: HABIT_MOCK.examplesByNames["Clean the house"].goal as GoalBoolean,
      progress: true,
    }),
  }),
  2: habitProgressMockCreate({
    id: "2",
    habitId: HABIT_MOCK.examplesByNames.Walk.id,
    goalProgress: new GoalNumericProgress({
      goal: HABIT_MOCK.examplesByNames.Walk.goal as GoalNumeric,
      progress: 4_733,
    }),
  }),
} as const

export const HABIT_PROGRESS_MOCK = {
  create: habitProgressMockCreate,
  exampleByIds,
  examples: Object.values(exampleByIds),
}
