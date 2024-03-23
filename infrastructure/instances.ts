import { AuthenticationUseCase } from "@/domain/use-cases/Authentication"
import { RetrieveHabitsTrackerUseCase } from "../domain/use-cases/RetrieveHabitsTracker"
import { HabitsTrackerPresenter } from "../presentation/presenters/HabitsTracker"
import { AuthenticationSupabaseRepository } from "./supabase/repositories/Authentication"
import { GetHabitProgressHistorySupabaseRepository } from "./supabase/repositories/GetHabitProgressHistory"
import { GetHabitsByUserIdSupabaseRepository } from "./supabase/repositories/GetHabitsByUserId"
import { supabaseClient } from "./supabase/supabase"
import { AuthenticationPresenter } from "@/presentation/presenters/Authentication"

/**
 * Repositories
 */
const authenticationRepository = new AuthenticationSupabaseRepository({
  supabaseClient,
})
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
const authenticationUseCase = new AuthenticationUseCase({
  authenticationRepository,
})
const retrieveHabitsTrackerUseCase = new RetrieveHabitsTrackerUseCase({
  getHabitProgressHistoryRepository: getHabitProgressesRepository,
  getHabitsByUserIdRepository,
})

/**
 * Presenters
 */
export const authenticationPresenter = new AuthenticationPresenter({
  authenticationUseCase,
})
export const habitsTrackerPresenter = new HabitsTrackerPresenter({
  retrieveHabitsTrackerUseCase,
})