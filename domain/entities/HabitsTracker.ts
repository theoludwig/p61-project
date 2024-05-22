import type { GoalFrequency } from "./Goal"
import type { Habit } from "./Habit"
import { HabitHistory } from "./HabitHistory"
import type { HabitProgress } from "./HabitProgress"

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

  public editHabit(habit: Habit): void {
    const habitHistory = this.getHabitHistoryById(habit.id)
    if (habitHistory == null) {
      return
    }
    habitHistory.habit = habit
  }

  public updateHabitProgress(habitProgress: HabitProgress): void {
    const habitHistory = this.getHabitHistoryById(habitProgress.habitId)
    if (habitHistory == null) {
      return
    }
    const habitProgressSaved = habitHistory.progressHistory.find((progress) => {
      return progress.id === habitProgress.id
    })
    if (habitProgressSaved == null) {
      habitHistory.progressHistory = [
        ...habitHistory.progressHistory,
        habitProgress,
      ]
      return
    }
    habitProgressSaved.goalProgress = habitProgress.goalProgress
    habitProgressSaved.date = habitProgress.date
  }

  public getAllHabitsHistory(): HabitHistory[] {
    return [
      ...this.habitsHistory.daily,
      ...this.habitsHistory.weekly,
      ...this.habitsHistory.monthly,
    ]
  }

  public getHabitHistoryById(id: Habit["id"]): HabitHistory | undefined {
    return this.getAllHabitsHistory().find((habitHistory) => {
      return habitHistory.habit.id === id
    })
  }

  public getHabitsHistoriesByDate({
    selectedDate,
    frequency,
  }: {
    selectedDate: Date
    frequency: GoalFrequency
  }): HabitHistory[] {
    return this.habitsHistory[frequency].filter((habitItem) => {
      const startDate = new Date(habitItem.habit.startDate)
      startDate.setHours(0, 0, 0, 0)

      return (
        startDate <= selectedDate &&
        (habitItem.habit.endDate == null ||
          (habitItem.habit.endDate != null &&
            habitItem.habit.endDate >= selectedDate))
      )
    })
  }

  public getHabitsStatisticsByDateAndFrequency({
    selectedDate,
    frequency,
  }: {
    selectedDate: Date
    frequency: GoalFrequency
  }): {
    totalGoalsSuccess: number
    totalGoals: number
  } {
    const habitsHistory = this.getHabitsHistoriesByDate({
      selectedDate,
      frequency,
    })
    let totalGoalsSuccess = 0
    const totalGoals = habitsHistory.length
    for (const habitHistory of habitsHistory) {
      const goalProgress = habitHistory.getGoalProgressByDate(selectedDate)
      if (goalProgress.isCompleted()) {
        totalGoalsSuccess++
      }
    }
    return { totalGoalsSuccess, totalGoals }
  }
}
