import type { GoalProgress } from "./Goal"
import type { Habit } from "./Habit"
import type { EntityOptions } from "./_Entity"
import { Entity } from "./_Entity"

export interface HabitProgressOptions extends EntityOptions {
  habitId: Habit["id"]
  goalProgress: GoalProgress
  date: Date
}

export class HabitProgress extends Entity implements HabitProgressOptions {
  public habitId: HabitProgressOptions["habitId"]
  public goalProgress: HabitProgressOptions["goalProgress"]
  public date: HabitProgressOptions["date"]

  public constructor(options: HabitProgressOptions) {
    const { id, habitId, goalProgress, date } = options
    super({ id })
    this.habitId = habitId
    this.goalProgress = goalProgress
    this.date = date
  }
}
