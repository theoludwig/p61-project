import type { Habit, HabitCreateData } from "../entities/Habit"

export interface HabitCreateOptions {
  habitCreateData: HabitCreateData
}

export interface HabitCreateRepository {
  execute: (options: HabitCreateOptions) => Promise<Habit>
}
