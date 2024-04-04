import type { Habit } from "../entities/Habit"
import { HabitCreateSchema } from "../entities/Habit"
import type { HabitCreateRepository } from "../repositories/HabitCreate"

export interface HabitCreateUseCaseDependencyOptions {
  habitCreateRepository: HabitCreateRepository
}

export class HabitCreateUseCase implements HabitCreateUseCaseDependencyOptions {
  public habitCreateRepository: HabitCreateRepository

  public constructor(options: HabitCreateUseCaseDependencyOptions) {
    this.habitCreateRepository = options.habitCreateRepository
  }

  public async execute(data: unknown): Promise<Habit> {
    const habitCreateData = await HabitCreateSchema.parseAsync(data)
    const habit = await this.habitCreateRepository.execute({
      habitCreateData,
    })
    return habit
  }
}
