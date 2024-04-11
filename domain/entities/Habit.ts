import { z } from "zod"

import { GoalCreateSchema, type Goal, type GoalBaseJSON } from "./Goal"
import { Entity, EntitySchema } from "./_Entity"

export const HabitSchema = EntitySchema.extend({
  userId: z.string(),
  name: z.string().min(1).max(50),
  color: z.string().min(4).max(9).regex(/^#/),
  icon: z.string().min(1),
})

export const HabitCreateSchema = HabitSchema.extend({
  goal: GoalCreateSchema,
}).omit({ id: true })
export type HabitCreateData = z.infer<typeof HabitCreateSchema>

export const HabitEditSchema = HabitSchema.extend({
  goal: GoalCreateSchema,
})
export type HabitEditData = z.infer<typeof HabitEditSchema>

type HabitBase = z.infer<typeof HabitSchema>

export interface HabitData extends HabitBase {
  goal: Goal
  startDate: Date
  endDate?: Date
}

export interface HabitJSON extends HabitBase {
  goal: GoalBaseJSON
  startDate: string
  endDate?: string
}

export class Habit extends Entity implements HabitData {
  public userId: HabitData["userId"]
  public name: HabitData["name"]
  public color: HabitData["color"]
  public icon: HabitData["icon"]
  public goal: HabitData["goal"]
  public startDate: HabitData["startDate"]
  public endDate?: HabitData["endDate"]

  public constructor(options: HabitData) {
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

  public override toJSON(): HabitJSON {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      color: this.color,
      icon: this.icon,
      goal: this.goal,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate?.toISOString(),
    }
  }
}
