import { AuthenticationUseCase } from "@/domain/use-cases/Authentication"
import { HabitCreateUseCase } from "@/domain/use-cases/HabitCreate"
import { HabitEditUseCase } from "@/domain/use-cases/HabitEdit"
import { HabitGoalProgressUpdateUseCase } from "@/domain/use-cases/HabitGoalProgressUpdate"
import { HabitStopUseCase } from "@/domain/use-cases/HabitStop"
import { AuthenticationPresenter } from "@/presentation/presenters/Authentication"
import { RetrieveHabitsTrackerUseCase } from "../domain/use-cases/RetrieveHabitsTracker"
import { HabitsTrackerPresenter } from "../presentation/presenters/HabitsTracker"
import { AuthenticationSupabaseRepository } from "./supabase/repositories/Authentication"
import { GetHabitProgressHistorySupabaseRepository } from "./supabase/repositories/GetHabitProgressHistory"
import { GetHabitsByUserIdSupabaseRepository } from "./supabase/repositories/GetHabitsByUserId"
import { HabitCreateSupabaseRepository } from "./supabase/repositories/HabitCreate"
import { HabitEditSupabaseRepository } from "./supabase/repositories/HabitEdit"
import { HabitProgressCreateSupabaseRepository } from "./supabase/repositories/HabitProgressCreate"
import { HabitProgressUpdateSupabaseRepository } from "./supabase/repositories/HabitProgressUpdate"
import { supabaseClient } from "./supabase/supabase"

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
const habitProgressCreateRepository = new HabitProgressCreateSupabaseRepository(
  {
    supabaseClient,
  },
)
const habitProgressUpdateRepository = new HabitProgressUpdateSupabaseRepository(
  {
    supabaseClient,
  },
)

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
const habitGoalProgressUpdateUseCase = new HabitGoalProgressUpdateUseCase({
  habitProgressCreateRepository,
  habitProgressUpdateRepository,
})
const habitStopUseCase = new HabitStopUseCase({
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
  habitStopUseCase,
  habitGoalProgressUpdateUseCase,
})
