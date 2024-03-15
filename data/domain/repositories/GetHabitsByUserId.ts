import type { Habit } from "../entities/Habit"
import type { User } from "../entities/User"

export interface GetHabitsByUserIdOptions {
  userId: User["id"]
}

export interface GetHabitsByUserIdRepository {
  execute: (options: GetHabitsByUserIdOptions) => Promise<Habit[]>
}
