import type { GoalProgress } from "../entities/Goal"
import type { HabitHistory } from "../entities/HabitHistory"
import type { HabitProgressCreateRepository } from "../repositories/HabitProgressCreate"
import type { HabitProgressUpdateRepository } from "../repositories/HabitProgressUpdate"

export interface HabitGoalProgressUpdateOptions {
  date: Date
  goalProgress: GoalProgress
  habitHistory: HabitHistory
}

export class HabitGoalProgressUpdateUseCase
  implements HabitGoalProgressUpdateOptions
{
  public date: Date
  public goalProgress: GoalProgress
  public habitHistory: HabitHistory

  public constructor(option: HabitGoalProgressUpdateOptions) {
    this.date = option.date
    this.goalProgress = option.goalProgress
    this.habitHistory = option.habitHistory
  }

  public async execute(data: unknown): Promise<HabitHistory> {
    //
  }
}
