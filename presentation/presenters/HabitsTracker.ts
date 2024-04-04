import { ZodError } from "zod"

import { HabitsTracker } from "@/domain/entities/HabitsTracker"
import type { ErrorGlobal, FetchState } from "./_Presenter"
import { Presenter } from "./_Presenter"
import type {
  RetrieveHabitsTrackerUseCase,
  RetrieveHabitsTrackerUseCaseOptions,
} from "@/domain/use-cases/RetrieveHabitsTracker"
import type { HabitCreateData } from "@/domain/entities/Habit"
import { getErrorsFieldsFromZodError } from "./utils/zod"
import type { HabitCreateUseCase } from "@/domain/use-cases/HabitCreate"

export interface HabitsTrackerPresenterState {
  habitsTracker: HabitsTracker

  retrieveHabitsTracker: {
    state: FetchState
  }

  habitCreate: {
    state: FetchState
    errors: {
      fields: Array<keyof HabitCreateData>
      global: ErrorGlobal
    }
  }
}

export interface HabitsTrackerPresenterOptions {
  retrieveHabitsTrackerUseCase: RetrieveHabitsTrackerUseCase
  habitCreateUseCase: HabitCreateUseCase
}

export class HabitsTrackerPresenter
  extends Presenter<HabitsTrackerPresenterState>
  implements HabitsTrackerPresenterOptions
{
  public retrieveHabitsTrackerUseCase: RetrieveHabitsTrackerUseCase
  public habitCreateUseCase: HabitCreateUseCase

  public constructor(options: HabitsTrackerPresenterOptions) {
    const { retrieveHabitsTrackerUseCase, habitCreateUseCase } = options
    const habitsTracker = HabitsTracker.default()
    super({
      habitsTracker,
      retrieveHabitsTracker: { state: "idle" },
      habitCreate: {
        state: "idle",
        errors: {
          fields: [],
          global: null,
        },
      },
    })
    this.retrieveHabitsTrackerUseCase = retrieveHabitsTrackerUseCase
    this.habitCreateUseCase = habitCreateUseCase
  }

  public async habitCreate(data: unknown): Promise<FetchState> {
    try {
      this.setState((state) => {
        state.habitCreate.state = "loading"
        state.habitCreate.errors = {
          fields: [],
          global: null,
        }
      })
      const habit = await this.habitCreateUseCase.execute(data)
      this.setState((state) => {
        state.habitCreate.state = "success"
        state.habitsTracker.addHabit(habit)
      })
      return "success"
    } catch (error) {
      this.setState((state) => {
        state.habitCreate.state = "error"
        if (error instanceof ZodError) {
          state.habitCreate.errors.fields =
            getErrorsFieldsFromZodError<HabitCreateData>(error)
        } else {
          state.habitCreate.errors.global = "unknown"
        }
      })
      return "error"
    }
  }

  public async retrieveHabitsTracker(
    options: RetrieveHabitsTrackerUseCaseOptions,
  ): Promise<void> {
    this.setState((state) => {
      state.retrieveHabitsTracker.state = "loading"
      state.habitsTracker = HabitsTracker.default()
    })
    try {
      const habitsTracker =
        await this.retrieveHabitsTrackerUseCase.execute(options)
      this.setState((state) => {
        state.habitsTracker = habitsTracker
        state.retrieveHabitsTracker.state = "success"
      })
    } catch (error) {
      this.setState((state) => {
        state.retrieveHabitsTracker.state = "error"
      })
    }
  }
}
