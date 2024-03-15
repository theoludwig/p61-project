import type { Goal } from "./Goal"
import type { User } from "./User"
import type { EntityOptions } from "./_Entity"
import { Entity } from "./_Entity"

export interface HabitOptions extends EntityOptions {
  userId: User["id"]
  name: string
  color: string
  icon: string
  goal: Goal
  startDate: Date
  endDate?: Date
}

export class Habit extends Entity implements HabitOptions {
  public userId: HabitOptions["userId"]
  public name: HabitOptions["name"]
  public color: HabitOptions["color"]
  public icon: HabitOptions["icon"]
  public goal: HabitOptions["goal"]
  public startDate: HabitOptions["startDate"]
  public endDate?: HabitOptions["endDate"]

  public constructor(options: HabitOptions) {
    const { id, userId, name, color, icon, goal, startDate, endDate } = options
    super({ id })
    this.userId = userId
    this.name = name
    this.color = color
    this.icon = icon
    this.goal = goal
    this.startDate = startDate
    this.endDate = endDate
  }
}
