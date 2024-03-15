import type { HabitHistory } from "./HabitHistory"

export interface HabitsTrackerOptions {
  habitsHistory: HabitHistory[]
}

export class HabitsTracker implements HabitsTrackerOptions {
  public habitsHistory: HabitHistory[]

  public constructor(options: HabitsTrackerOptions) {
    const { habitsHistory } = options
    this.habitsHistory = habitsHistory
  }

  public static default(): HabitsTracker {
    return new HabitsTracker({ habitsHistory: [] })
  }
}
