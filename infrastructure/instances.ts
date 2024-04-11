import { AuthenticationUseCase } from "@/domain/use-cases/Authentication"
import { RetrieveHabitsTrackerUseCase } from "../domain/use-cases/RetrieveHabitsTracker"
import { HabitsTrackerPresenter } from "../presentation/presenters/HabitsTracker"
import { AuthenticationSupabaseRepository } from "./supabase/repositories/Authentication"
import { GetHabitProgressHistorySupabaseRepository } from "./supabase/repositories/GetHabitProgressHistory"
import { GetHabitsByUserIdSupabaseRepository } from "./supabase/repositories/GetHabitsByUserId"
import { supabaseClient } from "./supabase/supabase"
import { AuthenticationPresenter } from "@/presentation/presenters/Authentication"
import { HabitCreateSupabaseRepository } from "./supabase/repositories/HabitCreate"
import { HabitCreateUseCase } from "@/domain/use-cases/HabitCreate"
import { HabitEditSupabaseRepository } from "./supabase/repositories/HabitEdit"
import { HabitEditUseCase } from "@/domain/use-cases/HabitEdit"

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
const habitCreateRepository = new HabitCreateSupabaseRepository({
  supabaseClient,
})
const habitEditRepository = new HabitEditSupabaseRepository({
  supabaseClient,
})

/**
 * Use Cases
 */
const authenticationUseCase = new AuthenticationUseCase({
  authenticationRepository,
})
const habitCreateUseCase = new HabitCreateUseCase({
  habitCreateRepository,
})
const retrieveHabitsTrackerUseCase = new RetrieveHabitsTrackerUseCase({
  getHabitProgressHistoryRepository: getHabitProgressesRepository,
  getHabitsByUserIdRepository,
})
const habitEditUseCase = new HabitEditUseCase({
  habitEditRepository,
})

/**
 * Presenters
 */
export const authenticationPresenter = new AuthenticationPresenter({
  authenticationUseCase,
})
export const habitsTrackerPresenter = new HabitsTrackerPresenter({
  retrieveHabitsTrackerUseCase,
  habitCreateUseCase,
  habitEditUseCase,
})
