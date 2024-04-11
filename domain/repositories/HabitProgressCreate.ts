import type {
  HabitProgress,
  HabitProgressData,
} from "../entities/HabitProgress"

export interface HabitProgressCreateOptions {
  habitProgressData: Omit<HabitProgressData, "id">
}

export interface HabitProgressCreateRepository {
  execute: (options: HabitProgressCreateOptions) => Promise<HabitProgress>
}
