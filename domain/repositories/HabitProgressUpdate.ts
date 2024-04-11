import type {
  HabitProgress,
  HabitProgressData,
} from "../entities/HabitProgress"

export interface HabitProgressUpdateOptions {
  habitProgressData: Omit<HabitProgressData, "habitId">
}

export interface HabitProgressUpdateRepository {
  execute: (options: HabitProgressUpdateOptions) => Promise<HabitProgress>
}
