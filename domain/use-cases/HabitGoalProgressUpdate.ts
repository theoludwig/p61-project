import type { GoalProgress } from "../entities/Goal"
import type { HabitHistory } from "../entities/HabitHistory"
import type { HabitProgress } from "../entities/HabitProgress"
import type { HabitProgressCreateRepository } from "../repositories/HabitProgressCreate"
import type { HabitProgressUpdateRepository } from "../repositories/HabitProgressUpdate"

export interface HabitGoalProgressUpdateUseCaseOptions {
  date: Date
  goalProgress: GoalProgress
  habitHistory: HabitHistory
}

export interface HabitGoalProgressUpdateUseCaseDependencyOptions {
  habitProgressCreateRepository: HabitProgressCreateRepository
  habitProgressUpdateRepository: HabitProgressUpdateRepository
}

export class HabitGoalProgressUpdateUseCase
  implements HabitGoalProgressUpdateUseCaseDependencyOptions
{
  public habitProgressCreateRepository: HabitProgressCreateRepository
  public habitProgressUpdateRepository: HabitProgressUpdateRepository

  public constructor(options: HabitGoalProgressUpdateUseCaseDependencyOptions) {
    this.habitProgressCreateRepository = options.habitProgressCreateRepository
    this.habitProgressUpdateRepository = options.habitProgressUpdateRepository
  }

  public async execute(
    options: HabitGoalProgressUpdateUseCaseOptions,
  ): Promise<HabitProgress> {
    const { date, goalProgress, habitHistory } = options

    if (goalProgress.isBoolean()) {
      const currentHabitProgress = habitHistory.getProgressesByDate(date)[0]
      if (currentHabitProgress == null) {
        return await this.habitProgressCreateRepository.execute({
          habitProgressData: {
            date,
            goalProgress,
            habitId: habitHistory.habit.id,
          },
        })
      }
      return await this.habitProgressUpdateRepository.execute({
        habitProgressData: {
          date,
          goalProgress,
          id: currentHabitProgress.id,
        },
      })
    }

    if (goalProgress.isNumeric()) {
      return await this.habitProgressCreateRepository.execute({
        habitProgressData: {
          date,
          goalProgress,
          habitId: habitHistory.habit.id,
        },
      })
    }

    throw new Error("Not implemented")
  }
}
