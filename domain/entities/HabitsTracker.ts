import type { HabitHistory } from "./HabitHistory"

export interface HabitsTrackerData {
  habitsHistory: HabitHistory[]
}

export class HabitsTracker implements HabitsTrackerData {
  public habitsHistory: HabitHistory[]

  public constructor(options: HabitsTrackerData) {
    const { habitsHistory } = options
    this.habitsHistory = habitsHistory
  }

  public static default(): HabitsTracker {
    return new HabitsTracker({ habitsHistory: [] })
  }
}
