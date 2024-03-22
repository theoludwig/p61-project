import { HabitsTracker } from "@/domain/entities/HabitsTracker"
import type { FetchState } from "./_Presenter"
import { Presenter } from "./_Presenter"
import type {
  RetrieveHabitsTrackerUseCase,
  RetrieveHabitsTrackerUseCaseOptions,
} from "@/domain/use-cases/RetrieveHabitsTracker"

export interface HabitsTrackerPresenterState {
  habitsTracker: HabitsTracker

  retrieveHabitsTracker: {
    state: FetchState
  }
}

export interface HabitsTrackerPresenterOptions {
  retrieveHabitsTrackerUseCase: RetrieveHabitsTrackerUseCase
}

export class HabitsTrackerPresenter
  extends Presenter<HabitsTrackerPresenterState>
  implements HabitsTrackerPresenterOptions
{
  public retrieveHabitsTrackerUseCase: RetrieveHabitsTrackerUseCase

  public constructor(options: HabitsTrackerPresenterOptions) {
    const { retrieveHabitsTrackerUseCase } = options
    const habitsTracker = HabitsTracker.default()
    super({ habitsTracker, retrieveHabitsTracker: { state: "idle" } })
    this.retrieveHabitsTrackerUseCase = retrieveHabitsTrackerUseCase
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
