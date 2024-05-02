import type { HabitProgressUpdateRepository } from "@/domain/repositories/HabitProgressUpdate"
import { SupabaseRepository } from "@/infrastructure/supabase/repositories/_SupabaseRepository"
import { habitProgressSupabaseDTO } from "../data-transfer-objects/HabitProgressDTO"

export class HabitProgressUpdateSupabaseRepository
  extends SupabaseRepository
  implements HabitProgressUpdateRepository
{
  public execute: HabitProgressUpdateRepository["execute"] = async (
    options,
  ) => {
    const { habitProgressData } = options
    const { data } = await this.supabaseClient
      .from("habits_progresses")
      .update(
        habitProgressSupabaseDTO.fromDomainDataToSupabaseUpdate(
          habitProgressData,
        ),
      )
      .eq("id", habitProgressData.id)
      .select("*")
      .single()
      .throwOnError()
    const insertedProgress = data as NonNullable<typeof data>
    return habitProgressSupabaseDTO.fromSupabaseToDomain(
      insertedProgress,
      habitProgressData.goalProgress.goal,
    )
  }
}
