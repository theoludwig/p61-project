import type { Habit, HabitEditData } from "../entities/Habit"

export interface HabitEditOptions {
  habitEditData: HabitEditData
}

export interface HabitEditRepository {
  execute: (options: HabitEditOptions) => Promise<Habit>
}
