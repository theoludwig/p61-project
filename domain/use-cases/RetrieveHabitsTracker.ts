import { HabitHistory } from "../entities/HabitHistory"
import type { HabitsTrackerData } from "../entities/HabitsTracker"
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
          progressHistory,
        })
      }),
    )
    const habitsHistory = habitProgressHistories.reduce<
      HabitsTrackerData["habitsHistory"]
    >(
      (accumulator, habitHistory) => {
        const { habit } = habitHistory
        const frequency = habit.goal.frequency
        accumulator[frequency].push(habitHistory)
        return accumulator
      },
      {
        daily: [],
        weekly: [],
        monthly: [],
      },
    )
    const habitsTracker = new HabitsTracker({
      habitsHistory,
    })
    return habitsTracker
  }
}
