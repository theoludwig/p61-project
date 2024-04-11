import { ZodError } from "zod"

import { HabitsTracker } from "@/domain/entities/HabitsTracker"
import type { ErrorGlobal, FetchState } from "./_Presenter"
import { Presenter } from "./_Presenter"
import type {
  RetrieveHabitsTrackerUseCase,
  RetrieveHabitsTrackerUseCaseOptions,
} from "@/domain/use-cases/RetrieveHabitsTracker"
import type { HabitCreateData, HabitEditData } from "@/domain/entities/Habit"
import { getErrorsFieldsFromZodError } from "../../utils/zod"
import type { HabitCreateUseCase } from "@/domain/use-cases/HabitCreate"
import type { HabitEditUseCase } from "@/domain/use-cases/HabitEdit"
import type {
  HabitGoalProgressUpdateUseCase,
  HabitGoalProgressUpdateUseCaseOptions,
} from "@/domain/use-cases/HabitGoalProgressUpdate"

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

  habitEdit: {
    state: FetchState
    errors: {
      fields: Array<keyof HabitEditData>
      global: ErrorGlobal
    }
  }

  habitGoalProgressUpdate: {
    state: FetchState
  }
}

export interface HabitsTrackerPresenterOptions {
  retrieveHabitsTrackerUseCase: RetrieveHabitsTrackerUseCase
  habitCreateUseCase: HabitCreateUseCase
  habitEditUseCase: HabitEditUseCase
  habitGoalProgressUpdateUseCase: HabitGoalProgressUpdateUseCase
}

export class HabitsTrackerPresenter
  extends Presenter<HabitsTrackerPresenterState>
  implements HabitsTrackerPresenterOptions
{
  public retrieveHabitsTrackerUseCase: RetrieveHabitsTrackerUseCase
  public habitCreateUseCase: HabitCreateUseCase
  public habitEditUseCase: HabitEditUseCase
  public habitGoalProgressUpdateUseCase: HabitGoalProgressUpdateUseCase

  public constructor(options: HabitsTrackerPresenterOptions) {
    const {
      retrieveHabitsTrackerUseCase,
      habitCreateUseCase,
      habitEditUseCase,
      habitGoalProgressUpdateUseCase,
    } = options
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
      habitEdit: {
        state: "idle",
        errors: {
          fields: [],
          global: null,
        },
      },
      habitGoalProgressUpdate: {
        state: "idle",
      },
    })
    this.retrieveHabitsTrackerUseCase = retrieveHabitsTrackerUseCase
    this.habitCreateUseCase = habitCreateUseCase
    this.habitEditUseCase = habitEditUseCase
    this.habitGoalProgressUpdateUseCase = habitGoalProgressUpdateUseCase
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

  public async habitEdit(data: unknown): Promise<FetchState> {
    try {
      this.setState((state) => {
        state.habitEdit.state = "loading"
        state.habitEdit.errors = {
          fields: [],
          global: null,
        }
      })
      const habit = await this.habitEditUseCase.execute(data)
      this.setState((state) => {
        state.habitEdit.state = "success"
        state.habitsTracker.editHabit(habit)
      })
      return "success"
    } catch (error) {
      this.setState((state) => {
        state.habitEdit.state = "error"
        if (error instanceof ZodError) {
          state.habitEdit.errors.fields =
            getErrorsFieldsFromZodError<HabitEditData>(error)
        } else {
          state.habitEdit.errors.global = "unknown"
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

  public async habitUpdateProgress(
    options: HabitGoalProgressUpdateUseCaseOptions,
  ): Promise<FetchState> {
    try {
      this.setState((state) => {
        state.habitGoalProgressUpdate.state = "loading"
      })
      const habitProgress =
        await this.habitGoalProgressUpdateUseCase.execute(options)
      this.setState((state) => {
        state.habitsTracker.updateHabitProgress(habitProgress)
        state.habitGoalProgressUpdate.state = "success"
      })
      return "success"
    } catch (error) {
      this.setState((state) => {
        state.habitGoalProgressUpdate.state = "error"
      })
      return "error"
    }
  }
}
