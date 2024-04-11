import type { Habit } from "../entities/Habit"
import { HabitEditSchema } from "../entities/Habit"
import type { HabitEditRepository } from "../repositories/HabitEdit"

export interface HabitEditUseCaseDependencyOptions {
  habitEditRepository: HabitEditRepository
}

export class HabitEditUseCase implements HabitEditUseCaseDependencyOptions {
  public habitEditRepository: HabitEditRepository

  public constructor(options: HabitEditUseCaseDependencyOptions) {
    this.habitEditRepository = options.habitEditRepository
  }

  public async execute(data: unknown): Promise<Habit> {
    const habitEditData = await HabitEditSchema.parseAsync(data)
    const habit = await this.habitEditRepository.execute({
      habitEditData,
    })
    return habit
  }
}
