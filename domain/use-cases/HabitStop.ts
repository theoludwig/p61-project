import type { Habit } from "../entities/Habit"
import type { HabitEditRepository } from "../repositories/HabitEdit"

export interface HabitStopUseCaseDependencyOptions {
  habitEditRepository: HabitEditRepository
}

export class HabitStopUseCase implements HabitStopUseCaseDependencyOptions {
  public habitEditRepository: HabitEditRepository

  public constructor(options: HabitStopUseCaseDependencyOptions) {
    this.habitEditRepository = options.habitEditRepository
  }

  public async execute(habitToStop: Habit): Promise<Habit> {
    const habit = await this.habitEditRepository.execute({
      habitEditData: {
        ...habitToStop,
        endDate: new Date(),
      },
    })
    return habit
  }
}
