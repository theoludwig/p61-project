import { HabitProgressHistory } from "../entities/HabitProgressHistory"
import { HabitsTracker } from "../entities/HabitsTracker"
import type { User } from "../entities/User"
import type { GetHabitProgressesRepository } from "../repositories/GetHabitProgresses"
import type { GetHabitsByUserIdRepository } from "../repositories/GetHabitsByUserId"

export interface RetrieveHabitsTrackerUseCaseDependencyOptions {
  getHabitsByUserIdRepository: GetHabitsByUserIdRepository
  getHabitProgressesRepository: GetHabitProgressesRepository
}

export interface RetrieveHabitsTrackerUseCaseOptions {
  userId: User["id"]
}

export class RetrieveHabitsTrackerUseCase
  implements RetrieveHabitsTrackerUseCaseDependencyOptions
{
  public getHabitsByUserIdRepository: GetHabitsByUserIdRepository
  public getHabitProgressesRepository: GetHabitProgressesRepository

  public constructor(options: RetrieveHabitsTrackerUseCaseDependencyOptions) {
    this.getHabitsByUserIdRepository = options.getHabitsByUserIdRepository
    this.getHabitProgressesRepository = options.getHabitProgressesRepository
  }

  public async execute(
    options: RetrieveHabitsTrackerUseCaseOptions,
  ): Promise<HabitsTracker> {
    const { userId } = options
    const habits = await this.getHabitsByUserIdRepository.execute({ userId })
    const habitProgressHistories = await Promise.all(
      habits.map(async (habit) => {
        const habitProgresses = await this.getHabitProgressesRepository.execute(
          {
            habit,
          },
        )
        return new HabitProgressHistory({ habit, habitProgresses })
      }),
    )
    const habitsTracker = new HabitsTracker({ habitProgressHistories })
    return habitsTracker
  }
}
