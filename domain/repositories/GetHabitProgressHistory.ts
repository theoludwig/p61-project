import type { Habit } from "../entities/Habit"
import type { HabitProgress } from "../entities/HabitProgress"

export interface GetHabitProgressHistoryOptions {
  habit: Habit
}

export interface GetHabitProgressHistoryRepository {
  execute: (options: GetHabitProgressHistoryOptions) => Promise<HabitProgress[]>
}
