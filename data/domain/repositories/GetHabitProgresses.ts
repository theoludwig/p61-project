import type { Habit } from "../entities/Habit"
import type { HabitProgress } from "../entities/HabitProgress"

export interface GetHabitProgressesOptions {
  habit: Habit
}

export interface GetHabitProgressesRepository {
  execute: (options: GetHabitProgressesOptions) => Promise<HabitProgress[]>
}
