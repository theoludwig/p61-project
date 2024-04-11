import type { HabitProgressCreateRepository } from "@/domain/repositories/HabitProgressCreate"
import { SupabaseRepository } from "./_SupabaseRepository"
import { HabitProgress } from "@/domain/entities/HabitProgress"

export class HabitProgressCreateSupabaseRepository
  extends SupabaseRepository
  implements HabitProgressCreateRepository
{
  public execute: HabitProgressCreateRepository["execute"] = async (
    options,
  ) => {
    const { habitProgressData } = options
    const { goalProgress, date, habitId } = habitProgressData
    let goalProgressValue = goalProgress.isCompleted() ? 1 : 0
    if (goalProgress.isNumeric()) {
      goalProgressValue = goalProgress.progress
    }
    const { data, error } = await this.supabaseClient
      .from("habits_progresses")
      .insert({
        habit_id: Number(habitId),
        date: date.toISOString(),
        goal_progress: goalProgressValue,
      })
      .select("*")
    const insertedProgress = data?.[0]
    if (error != null || insertedProgress == null) {
      throw new Error(error?.message ?? "Failed to create habit progress.")
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
