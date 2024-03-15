export const GOAL_FREQUENCIES = ["daily", "weekly", "monthly"] as const
export type GoalFrequency = (typeof GOAL_FREQUENCIES)[number]

export const GOAL_TYPES = ["numeric", "boolean"] as const
export type GoalType = (typeof GOAL_TYPES)[number]

interface GoalBase {
  frequency: GoalFrequency
}
export abstract class Goal implements GoalBase {
  public frequency: GoalBase["frequency"]
  public abstract readonly type: GoalType

  public constructor(options: GoalBase) {
    const { frequency } = options
    this.frequency = frequency
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
}

interface GoalProgressBase {
  goal: Goal
}
export abstract class GoalProgress implements GoalProgressBase {
  public abstract readonly goal: Goal
  public abstract isCompleted(): boolean
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
}

export class GoalBoolean extends Goal {
  public readonly type = "boolean"
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
}
