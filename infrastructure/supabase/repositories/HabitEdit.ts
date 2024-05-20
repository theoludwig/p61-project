import type { HabitEditRepository } from "@/domain/repositories/HabitEdit"
import { SupabaseRepository } from "@/infrastructure/supabase/repositories/_SupabaseRepository"
import { habitSupabaseDTO } from "../data-transfer-objects/HabitDTO"

export class HabitEditSupabaseRepository
  extends SupabaseRepository
  implements HabitEditRepository
{
  public execute: HabitEditRepository["execute"] = async (options) => {
    const { habitEditData } = options
    const { data } = await this.supabaseClient
      .from("habits")
      .update(
        habitSupabaseDTO.fromDomainEditDataToSupabaseUpdate(habitEditData),
      )
      .eq("id", habitEditData.id)
      .select("*")
      .single()
      .throwOnError()
    const updatedHabit = data as NonNullable<typeof data>
    return habitSupabaseDTO.fromSupabaseToDomain(updatedHabit)
  }
}
