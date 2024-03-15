import type { HabitProgressHistory } from "./HabitProgressHistory"

export interface HabitsTrackerOptions {
  habitProgressHistories: HabitProgressHistory[]
}

export class HabitsTracker implements HabitsTrackerOptions {
  public habitProgressHistories: HabitProgressHistory[]

  public constructor(options: HabitsTrackerOptions) {
    const { habitProgressHistories } = options
    this.habitProgressHistories = habitProgressHistories
  }

  public static default(): HabitsTracker {
    return new HabitsTracker({ habitProgressHistories: [] })
  }
}
