import type { Habit } from "./Habit"
import type { HabitProgress } from "./HabitProgress"

export interface HabitHistoryOptions {
  habit: Habit
  progressHistory: HabitProgress[]
}

export class HabitHistory implements HabitHistoryOptions {
  public habit: Habit
  public progressHistory: HabitProgress[]

  public constructor(options: HabitHistoryOptions) {
    const { habit, progressHistory } = options
    this.habit = habit
    this.progressHistory = progressHistory
  }
}
