import type { GetHabitProgressHistoryRepository } from "@/domain/repositories/GetHabitProgressHistory"
import { SupabaseRepository } from "@/infrastructure/supabase/repositories/_SupabaseRepository"
import { habitProgressHistorySupabaseDTO } from "../data-transfer-objects/HabitProgressDTO"

export class GetHabitProgressHistorySupabaseRepository
  extends SupabaseRepository
  implements GetHabitProgressHistoryRepository
{
  public execute: GetHabitProgressHistoryRepository["execute"] = async (
    options,
  ) => {
    const { habit } = options
    const { data } = await this.supabaseClient
      .from("habits_progresses")
      .select("*")
      .eq("habit_id", habit.id)
      .throwOnError()
    const habitProgressHistory = data as NonNullable<typeof data>
    return habitProgressHistorySupabaseDTO.fromSupabaseToDomain(
      habitProgressHistory,
      habit.goal,
    )
  }
}
