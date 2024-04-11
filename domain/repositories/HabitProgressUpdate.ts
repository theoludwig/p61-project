import type {
  HabitProgress,
  HabitProgressData,
} from "../entities/HabitProgress"

export interface HabitProgressUpdateOptions {
  habitProgressData: HabitProgressData
}

export interface HabitProgressUpdateRepository {
  execute: (options: HabitProgressUpdateOptions) => Promise<HabitProgress>
}
