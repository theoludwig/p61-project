import { RetrieveHabitsTrackerUseCase } from "../domain/use-cases/RetrieveHabitsTracker"
import { HabitsTrackerPresenter } from "../presentation/presenters/HabitsTracker"
import { GetHabitProgressHistorySupabaseRepository } from "./repositories/supabase/lib/GetHabitProgressHistory"
import { GetHabitsByUserIdSupabaseRepository } from "./repositories/supabase/lib/GetHabitsByUserId"
import { supabaseClient } from "./repositories/supabase/supabase"

/**
 * Repositories
 */
const getHabitProgressesRepository =
  new GetHabitProgressHistorySupabaseRepository({
    supabaseClient,
  })
const getHabitsByUserIdRepository = new GetHabitsByUserIdSupabaseRepository({
  supabaseClient,
})

/**
 * Use Cases
 */
const retrieveHabitsTrackerUseCase = new RetrieveHabitsTrackerUseCase({
  getHabitProgressHistoryRepository: getHabitProgressesRepository,
  getHabitsByUserIdRepository,
})

/**
 * Presenters
 */
export const habitsTrackerPresenter = new HabitsTrackerPresenter({
  retrieveHabitsTrackerUseCase,
})
