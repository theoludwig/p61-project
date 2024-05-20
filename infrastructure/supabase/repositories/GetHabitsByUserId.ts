import type { GetHabitsByUserIdRepository } from "@/domain/repositories/GetHabitsByUserId"
import { SupabaseRepository } from "@/infrastructure/supabase/repositories/_SupabaseRepository"
import { habitsSupabaseDTO } from "../data-transfer-objects/HabitDTO"

export class GetHabitsByUserIdSupabaseRepository
  extends SupabaseRepository
  implements GetHabitsByUserIdRepository
{
  public execute: GetHabitsByUserIdRepository["execute"] = async (options) => {
    const { userId } = options
    const { data } = await this.supabaseClient
      .from("habits")
      .select("*")
      .eq("user_id", userId)
      .throwOnError()
    const habits = data as NonNullable<typeof data>
    return habitsSupabaseDTO.fromSupabaseToDomain(habits)
  }
}
