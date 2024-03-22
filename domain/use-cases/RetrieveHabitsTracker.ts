import { HabitHistory } from "../entities/HabitHistory"
import { HabitsTracker } from "../entities/HabitsTracker"
import type { User } from "../entities/User"
import type { GetHabitProgressHistoryRepository } from "../repositories/GetHabitProgressHistory"
import type { GetHabitsByUserIdRepository } from "../repositories/GetHabitsByUserId"

export interface RetrieveHabitsTrackerUseCaseDependencyOptions {
  getHabitsByUserIdRepository: GetHabitsByUserIdRepository
  getHabitProgressHistoryRepository: GetHabitProgressHistoryRepository
}

export interface RetrieveHabitsTrackerUseCaseOptions {
  userId: User["id"]
}

export class RetrieveHabitsTrackerUseCase
  implements RetrieveHabitsTrackerUseCaseDependencyOptions
{
  public getHabitsByUserIdRepository: GetHabitsByUserIdRepository
  public getHabitProgressHistoryRepository: GetHabitProgressHistoryRepository

  public constructor(options: RetrieveHabitsTrackerUseCaseDependencyOptions) {
    this.getHabitsByUserIdRepository = options.getHabitsByUserIdRepository
    this.getHabitProgressHistoryRepository =
      options.getHabitProgressHistoryRepository
  }

  public async execute(
    options: RetrieveHabitsTrackerUseCaseOptions,
  ): Promise<HabitsTracker> {
    const { userId } = options
    const habits = await this.getHabitsByUserIdRepository.execute({ userId })
    const habitProgressHistories = await Promise.all(
      habits.map(async (habit) => {
        const progressHistory =
          await this.getHabitProgressHistoryRepository.execute({
            habit,
          })
        return new HabitHistory({
          habit,
          progressHistory: progressHistory.sort((a, b) => {
            return a.date.getTime() - b.date.getTime()
          }),
        })
      }),
    )
    const habitsTracker = new HabitsTracker({
      habitsHistory: habitProgressHistories,
    })
    return habitsTracker
  }
}
