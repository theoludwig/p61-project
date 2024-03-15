import { HabitsTracker } from "@/data/domain/entities/HabitsTracker"
import { Presenter } from "./_Presenter"
import type {
  RetrieveHabitsTrackerUseCase,
  RetrieveHabitsTrackerUseCaseOptions,
} from "@/data/domain/use-cases/RetrieveHabitsTracker"

export interface HabitsTrackerPresenterState {
  habitsTracker: HabitsTracker
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
    super({ habitsTracker })
    this.retrieveHabitsTrackerUseCase = retrieveHabitsTrackerUseCase
  }

  public async retrieveHabitsTracker(
    options: RetrieveHabitsTrackerUseCaseOptions,
  ): Promise<void> {
    const habitsTracker =
      await this.retrieveHabitsTrackerUseCase.execute(options)
    this.setState((state) => {
      state.habitsTracker = habitsTracker
    })
  }
}
