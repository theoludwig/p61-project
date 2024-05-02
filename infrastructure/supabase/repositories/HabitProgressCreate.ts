import type { HabitProgressCreateRepository } from "@/domain/repositories/HabitProgressCreate"
import { SupabaseRepository } from "@/infrastructure/supabase/repositories/_SupabaseRepository"
import { habitProgressSupabaseDTO } from "../data-transfer-objects/HabitProgressDTO"

export class HabitProgressCreateSupabaseRepository
  extends SupabaseRepository
  implements HabitProgressCreateRepository
{
  public execute: HabitProgressCreateRepository["execute"] = async (
    options,
  ) => {
    const { habitProgressData } = options
    const { data } = await this.supabaseClient
      .from("habits_progresses")
      .insert(
        habitProgressSupabaseDTO.fromDomainDataToSupabaseInsert(
          habitProgressData,
        ),
      )
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
