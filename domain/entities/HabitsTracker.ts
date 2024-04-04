import type { GoalFrequency } from "./Goal"
import type { Habit } from "./Habit"
import { HabitHistory } from "./HabitHistory"

export interface HabitsTrackerData {
  habitsHistory: {
    [key in GoalFrequency]: HabitHistory[]
  }
}

export class HabitsTracker implements HabitsTrackerData {
  public habitsHistory: HabitsTrackerData["habitsHistory"]

  public constructor(options: HabitsTrackerData) {
    const { habitsHistory } = options
    this.habitsHistory = habitsHistory
  }

  public static default(): HabitsTracker {
    return new HabitsTracker({
      habitsHistory: {
        daily: [],
        weekly: [],
        monthly: [],
      },
    })
  }

  public addHabit(habit: Habit): void {
    this.habitsHistory[habit.goal.frequency].push(
      new HabitHistory({
        habit,
        progressHistory: [],
      }),
    )
  }
}
