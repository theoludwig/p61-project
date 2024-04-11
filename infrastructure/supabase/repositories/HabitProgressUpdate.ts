import type { HabitProgressUpdateRepository } from "@/domain/repositories/HabitProgressUpdate"
import { SupabaseRepository } from "./_SupabaseRepository"
import { HabitProgress } from "@/domain/entities/HabitProgress"

export class HabitProgressUpdateSupabaseRepository
  extends SupabaseRepository
  implements HabitProgressUpdateRepository
{
  public execute: HabitProgressUpdateRepository["execute"] = async (
    options,
  ) => {
    const { habitProgressData } = options
    const { id, goalProgress, date } = habitProgressData
    let goalProgressValue = goalProgress.isCompleted() ? 1 : 0
    if (goalProgress.isNumeric()) {
      goalProgressValue = goalProgress.progress
    }
    const { data, error } = await this.supabaseClient
      .from("habits_progresses")
      .update({
        date: date.toISOString(),
        goal_progress: goalProgressValue,
      })
      .eq("id", id)
      .select("*")
    const insertedProgress = data?.[0]
    if (error != null || insertedProgress == null) {
      throw new Error(error?.message ?? "Failed to update habit progress.")
    }
    const habitProgress = new HabitProgress({
      id: insertedProgress.id.toString(),
      habitId: insertedProgress.habit_id.toString(),
      date: new Date(insertedProgress.date),
      goalProgress,
    })
    return habitProgress
  }
}
