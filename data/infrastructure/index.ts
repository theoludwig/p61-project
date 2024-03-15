// export const taskRepository = new TaskLocalStorageRepository()
// export const taskService = new TaskService(taskRepository)
// export const taskPresenter = new TaskPresenter(taskService)

import { RetrieveHabitsTrackerUseCase } from "../domain/use-cases/RetrieveHabitsTracker"
import { HabitsTrackerPresenter } from "./presenters/HabitsTrackerPresenter"
import { GetHabitProgressesSupabaseRepository } from "./repositories/supabase/lib/GetHabitProgresses"
import { GetHabitsByUserIdSupabaseRepository } from "./repositories/supabase/lib/GetHabitsByUserId"
import { supabaseClient } from "./repositories/supabase/supabase"

/**
 * Repositories
 */
const getHabitProgressesRepository = new GetHabitProgressesSupabaseRepository({
  supabaseClient,
})
const getHabitsByUserIdRepository = new GetHabitsByUserIdSupabaseRepository({
  supabaseClient,
})

/**
 * Use Cases
 */
const retrieveHabitsTrackerUseCase = new RetrieveHabitsTrackerUseCase({
  getHabitProgressesRepository,
  getHabitsByUserIdRepository,
})

/**
 * Presenters
 */
export const habitsTrackerPresenter = new HabitsTrackerPresenter({
  retrieveHabitsTrackerUseCase,
})
