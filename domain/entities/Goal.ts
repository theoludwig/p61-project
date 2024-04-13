import { z } from "zod"

export const GOAL_FREQUENCIES_ZOD = [
  z.literal("daily"),
  z.literal("weekly"),
  z.literal("monthly"),
] as const
export const goalFrequencyZod = z.union(GOAL_FREQUENCIES_ZOD)
export const GOAL_FREQUENCIES = GOAL_FREQUENCIES_ZOD.map((frequency) => {
  return frequency.value
})
export type GoalFrequency = (typeof GOAL_FREQUENCIES)[number]

export const GOAL_TYPES_ZOD = [
  z.literal("boolean"),
  z.literal("numeric"),
] as const
export const goalTypeZod = z.union(GOAL_TYPES_ZOD)
export const GOAL_TYPES = GOAL_TYPES_ZOD.map((type) => {
  return type.value
})
export type GoalType = (typeof GOAL_TYPES)[number]

export const GoalCreateSchema = z.object({
  frequency: goalFrequencyZod,
  target: z.discriminatedUnion("type", [
    z.object({ type: z.literal("boolean") }),
    z.object({
      type: z.literal("numeric"),
      value: z.number().int().min(1),
      unit: z.string().min(1),
    }),
  ]),
})

export type GoalCreateData = z.infer<typeof GoalCreateSchema>

interface GoalBase {
  frequency: GoalFrequency
}

export interface GoalBaseJSON extends GoalBase {
  type: GoalType
}
export abstract class Goal implements GoalBase {
  public frequency: GoalBase["frequency"]
  public abstract readonly type: GoalType

  public constructor(options: GoalBase) {
    const { frequency } = options
    this.frequency = frequency
  }

  public static create(options: GoalCreateData): Goal {
    if (options.target.type === "boolean") {
      return new GoalBoolean(options)
    }
    return new GoalNumeric({
      frequency: options.frequency,
      target: options.target,
    })
  }

  public static isNumeric(goal: Goal): goal is GoalNumeric {
    return goal.type === "numeric"
  }
  public isNumeric(): this is GoalNumeric {
    return Goal.isNumeric(this)
  }

  public static isBoolean(goal: Goal): goal is GoalBoolean {
    return goal.type === "boolean"
  }
  public isBoolean(): this is GoalBoolean {
    return Goal.isBoolean(this)
  }

  public abstract toJSON(): GoalBaseJSON
}

export interface GoalProgressBase {
  goal: Goal
}
export abstract class GoalProgress implements GoalProgressBase {
  public abstract readonly goal: Goal
  public abstract isCompleted(): boolean

  public abstract toJSON(): GoalProgressBase

  public static isNumeric(
    goalProgress: GoalProgress,
  ): goalProgress is GoalNumericProgress {
    return goalProgress.goal.isNumeric()
  }
  public isNumeric(): this is GoalNumericProgress {
    return GoalProgress.isNumeric(this)
  }

  public static isBoolean(
    goalProgress: GoalProgress,
  ): goalProgress is GoalBooleanProgress {
    return goalProgress.goal.isBoolean()
  }
  public isBoolean(): this is GoalBooleanProgress {
    return GoalProgress.isBoolean(this)
  }
}

interface GoalNumericOptions extends GoalBase {
  target: {
    value: number
    unit: string
  }
}
export class GoalNumeric extends Goal {
  public readonly type = "numeric"
  public target: {
    value: number
    unit: string
  }

  public constructor(options: GoalNumericOptions) {
    super(options)
    const { target } = options
    this.target = target
  }

  public override toJSON(): GoalNumericOptions & GoalBaseJSON {
    return {
      frequency: this.frequency,
      target: this.target,
      type: this.type,
    }
  }
}
interface GoalNumericProgressOptions extends GoalProgressBase {
  goal: GoalNumeric
  progress: number
}
export class GoalNumericProgress extends GoalProgress {
  public readonly goal: GoalNumeric
  public readonly progress: number

  public constructor(options: GoalNumericProgressOptions) {
    const { goal, progress } = options
    super()
    this.goal = goal
    this.progress = progress
  }

  public override isCompleted(): boolean {
    return this.progress >= this.goal.target.value
  }

  public progressRatio(): number {
    return this.goal.target.value <= 0
      ? 0
      : this.progress / this.goal.target.value
  }

  public override toJSON(): GoalNumericProgressOptions {
    return {
      goal: this.goal,
      progress: this.progress,
    }
  }
}

export class GoalBoolean extends Goal {
  public readonly type = "boolean"

  public override toJSON(): GoalBaseJSON {
    return {
      frequency: this.frequency,
      type: this.type,
    }
  }
}
interface GoalBooleanProgressOptions extends GoalProgressBase {
  goal: GoalBoolean
  progress: boolean
}
export class GoalBooleanProgress extends GoalProgress {
  public readonly goal: GoalBoolean
  public progress: boolean

  public constructor(options: GoalBooleanProgressOptions) {
    const { goal, progress } = options
    super()
    this.goal = goal
    this.progress = progress
  }

  public override isCompleted(): boolean {
    return this.progress
  }

  public override toJSON(): GoalBooleanProgressOptions {
    return {
      goal: this.goal,
      progress: this.progress,
    }
  }
}
