import type { Habit } from "./Habit"
import type { HabitProgress } from "./HabitProgress"

export interface HabitHistoryJSON {
  habit: Habit
  progressHistory: HabitProgress[]
}

export class HabitHistory implements HabitHistoryJSON {
  public habit: Habit
  public progressHistory: HabitProgress[]

  public constructor(options: HabitHistoryJSON) {
    const { habit, progressHistory } = options
    this.habit = habit
    this.progressHistory = progressHistory
  }
}
