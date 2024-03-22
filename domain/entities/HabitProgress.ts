import type { GoalProgress, GoalProgressBase } from "./Goal"
import type { Habit } from "./Habit"
import type { EntityData } from "./_Entity"
import { Entity } from "./_Entity"

interface HabitProgressDataBase extends EntityData {
  habitId: Habit["id"]
}

export interface HabitProgressData extends HabitProgressDataBase {
  goalProgress: GoalProgress
  date: Date
}

export interface HabitProgressJSON extends HabitProgressDataBase {
  goalProgress: GoalProgressBase
  date: string
}

export class HabitProgress extends Entity implements HabitProgressData {
  public habitId: HabitProgressData["habitId"]
  public goalProgress: HabitProgressData["goalProgress"]
  public date: HabitProgressData["date"]

  public constructor(options: HabitProgressData) {
    const { id, habitId, goalProgress, date } = options
    super({ id })
    this.habitId = habitId
    this.goalProgress = goalProgress
    this.date = date
  }

  public override toJSON(): HabitProgressJSON {
    return {
      id: this.id,
      habitId: this.habitId,
      goalProgress: this.goalProgress,
      date: this.date.toISOString(),
    }
  }
}
