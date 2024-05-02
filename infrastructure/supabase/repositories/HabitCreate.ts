import type { HabitCreateRepository } from "@/domain/repositories/HabitCreate"
import { SupabaseRepository } from "@/infrastructure/supabase/repositories/_SupabaseRepository"
import { habitSupabaseDTO } from "../data-transfer-objects/HabitDTO"

export class HabitCreateSupabaseRepository
  extends SupabaseRepository
  implements HabitCreateRepository
{
  public execute: HabitCreateRepository["execute"] = async (options) => {
    const { habitCreateData } = options
    const { data } = await this.supabaseClient
      .from("habits")
      .insert(
        habitSupabaseDTO.fromDomainCreateDataToSupabaseInsert(habitCreateData),
      )
      .select("*")
      .single()
      .throwOnError()
    const insertedHabit = data as NonNullable<typeof data>
    return habitSupabaseDTO.fromSupabaseToDomain(insertedHabit)
  }
}
