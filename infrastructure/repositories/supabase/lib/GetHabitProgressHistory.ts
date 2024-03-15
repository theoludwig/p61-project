import type { GetHabitProgressHistoryRepository } from "@/domain/repositories/GetHabitProgressHistory"
import { SupabaseRepository } from "./_SupabaseRepository"
import { HabitProgress } from "@/domain/entities/HabitProgress"
import type { GoalProgress } from "@/domain/entities/Goal"
import {
  GoalBooleanProgress,
  GoalNumericProgress,
} from "@/domain/entities/Goal"

export class GetHabitProgressHistorySupabaseRepository
  extends SupabaseRepository
  implements GetHabitProgressHistoryRepository
{
  execute: GetHabitProgressHistoryRepository["execute"] = async (options) => {
    const { habit } = options
    const { data, error } = await this.supabaseClient
      .from("habits_progresses")
      .select("*")
      .eq("habit_id", habit.id)
    if (error != null) {
      throw new Error(error.message)
    }
    const habitProgressHistory = data.map((item) => {
      let goalProgress: GoalProgress | null = null
      if (habit.goal.isNumeric()) {
        goalProgress = new GoalNumericProgress({
          goal: habit.goal,
          progress: item.goal_progress,
        })
      } else if (habit.goal.isBoolean()) {
        goalProgress = new GoalBooleanProgress({
          goal: habit.goal,
          progress: item.goal_progress === 1,
        })
      }
      if (goalProgress == null) {
        throw new Error("Goal progress is null.")
      }
      const habitProgress = new HabitProgress({
        id: item.id.toString(),
        habitId: item.habit_id.toString(),
        goalProgress,
        date: new Date(item.date),
      })
      return habitProgress
    })
    return habitProgressHistory
  }
}
