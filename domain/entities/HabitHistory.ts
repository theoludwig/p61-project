import { getISODate, getWeekNumber } from "@/utils/dates"
import type { Habit } from "./Habit"
import type { HabitProgress } from "./HabitProgress"
import type { GoalProgress } from "./Goal"
import { GoalBooleanProgress, GoalNumericProgress } from "./Goal"

export interface HabitHistoryJSON {
  habit: Habit
  progressHistory: HabitProgress[]
}

export class HabitHistory implements HabitHistoryJSON {
  public habit: Habit

  private _progressHistory: HabitProgress[] = []

  public constructor(options: HabitHistoryJSON) {
    const { habit, progressHistory } = options
    this.habit = habit
    this.progressHistory = progressHistory
  }

  /**
   * Progress History sorted chronologically (from old to most recent progress at the end).
   */
  public get progressHistory(): HabitProgress[] {
    return this._progressHistory
  }

  public set progressHistory(progressHistory: HabitProgress[]) {
    this._progressHistory = [...progressHistory]
    this._progressHistory.sort((a, b) => {
      return a.date.getTime() - b.date.getTime()
    })
  }

  public getProgressesByDate(date: Date): HabitProgress[] {
    return this._progressHistory.filter((progress) => {
      if (this.habit.goal.frequency === "monthly") {
        return (
          date.getFullYear() === progress.date.getFullYear() &&
          date.getMonth() === progress.date.getMonth()
        )
      }
      if (this.habit.goal.frequency === "weekly") {
        return (
          getWeekNumber(date) === getWeekNumber(progress.date) &&
          date.getFullYear() === progress.date.getFullYear()
        )
      }
      if (this.habit.goal.frequency === "daily") {
        return getISODate(date) === getISODate(progress.date)
      }
      return false
    })
  }

  public getGoalProgressByDate(date: Date): GoalProgress {
    const progresses = this.getProgressesByDate(date)
    if (this.habit.goal.isBoolean()) {
      const lastSavedProgress = progresses[progresses.length - 1]
      return new GoalBooleanProgress({
        goal: this.habit.goal,
        progress: lastSavedProgress?.goalProgress?.isCompleted() ?? false,
      })
    }

    if (this.habit.goal.isNumeric()) {
      return new GoalNumericProgress({
        goal: this.habit.goal,
        progress: progresses.reduce((sum, current) => {
          const goalProgress = current.goalProgress as GoalNumericProgress
          return sum + goalProgress.progress
        }, 0),
      })
    }

    throw new Error("Invalid")
  }
}
