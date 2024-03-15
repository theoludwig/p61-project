import type { Habit } from "./Habit"
import type { HabitProgress } from "./HabitProgress"

export interface HabitProgressHistoryOptions {
  habit: Habit
  habitProgresses: HabitProgress[]
}

export class HabitProgressHistory implements HabitProgressHistoryOptions {
  public habit: Habit
  public habitProgresses: HabitProgress[]

  public constructor(options: HabitProgressHistoryOptions) {
    const { habit, habitProgresses } = options
    this.habit = habit
    this.habitProgresses = habitProgresses
  }
}
