import type { Goal, GoalProgress } from "@/domain/entities/Goal"
import {
  GoalBooleanProgress,
  GoalNumericProgress,
} from "@/domain/entities/Goal"
import { HabitProgress } from "@/domain/entities/HabitProgress"
import type { HabitProgressCreateOptions } from "@/domain/repositories/HabitProgressCreate"
import type { HabitProgressUpdateOptions } from "@/domain/repositories/HabitProgressUpdate"
import type {
  SupabaseHabitProgress,
  SupabaseHabitProgressInsert,
  SupabaseHabitProgressUpdate,
} from "../supabase"

export const habitProgressSupabaseDTO = {
  fromSupabaseToDomain: (
    supabaseHabitProgress: SupabaseHabitProgress,
    goal: Goal,
  ): HabitProgress => {
    let goalProgress: GoalProgress | null = null
    if (goal.isNumeric()) {
      goalProgress = new GoalNumericProgress({
        goal,
        progress: supabaseHabitProgress.goal_progress,
      })
    } else if (goal.isBoolean()) {
      goalProgress = new GoalBooleanProgress({
        goal,
        progress: supabaseHabitProgress.goal_progress === 1,
      })
    }
    const habitProgress = new HabitProgress({
      id: supabaseHabitProgress.id.toString(),
      habitId: supabaseHabitProgress.habit_id.toString(),
      goalProgress: goalProgress as GoalProgress,
      date: new Date(supabaseHabitProgress.date),
    })
    return habitProgress
  },
  fromDomainDataToSupabaseInsert: (
    habitProgressData: HabitProgressCreateOptions["habitProgressData"],
  ): SupabaseHabitProgressInsert => {
    const { goalProgress, date, habitId } = habitProgressData
    let goalProgressValue = goalProgress.isCompleted() ? 1 : 0
    if (goalProgress.isNumeric()) {
      goalProgressValue = goalProgress.progress
    }
    return {
      habit_id: Number.parseInt(habitId, 10),
      date: date.toISOString(),
      goal_progress: goalProgressValue,
    }
  },
  fromDomainDataToSupabaseUpdate: (
    habitProgressData: HabitProgressUpdateOptions["habitProgressData"],
  ): SupabaseHabitProgressUpdate => {
    const { goalProgress, date } = habitProgressData
    let goalProgressValue = goalProgress.isCompleted() ? 1 : 0
    if (goalProgress.isNumeric()) {
      goalProgressValue = goalProgress.progress
    }
    return {
      date: date.toISOString(),
      goal_progress: goalProgressValue,
    }
  },
}

export const habitProgressHistorySupabaseDTO = {
  fromSupabaseToDomain: (
    supabaseHabitHistory: SupabaseHabitProgress[],
    goal: Goal,
  ): HabitProgress[] => {
    return supabaseHabitHistory.map((item) => {
      return habitProgressSupabaseDTO.fromSupabaseToDomain(item, goal)
    })
  },
}
