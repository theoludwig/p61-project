import type { GetHabitsByUserIdRepository } from "@/data/domain/repositories/GetHabitsByUserId"
import { SupabaseRepository } from "./_SupabaseRepository"
import { Habit } from "@/data/domain/entities/Habit"
import type { Goal } from "@/data/domain/entities/Goal"
import { GoalBoolean, GoalNumeric } from "@/data/domain/entities/Goal"

export class GetHabitsByUserIdSupabaseRepository
  extends SupabaseRepository
  implements GetHabitsByUserIdRepository
{
  // execute: GetHabitsByUserIdRepository["execute"] = async (options) => {
  //   const { userId } = options
  //   const { data, error } = await this.supabaseClient
  //     .from("habits")
  //     .select("*")
  //     .eq("user_id", userId)
  execute: GetHabitsByUserIdRepository["execute"] = async () => {
    const { data, error } = await this.supabaseClient.from("habits").select("*")
    if (error != null) {
      throw new Error(error.message)
    }
    return data.map((item) => {
      let goal: Goal
      if (item.goal_target != null && item.goal_target_unit != null) {
        goal = new GoalNumeric({
          frequency: item.goal_frequency,
          target: {
            value: item.goal_target,
            unit: item.goal_target_unit,
          },
        })
      } else {
        goal = new GoalBoolean({
          frequency: item.goal_frequency,
        })
      }
      const habit = new Habit({
        id: item.id.toString(),
        name: item.name,
        color: item.color,
        icon: item.icon,
        userId: item.user_id.toString(),
        startDate: new Date(item.start_date),
        endDate: item.end_date != null ? new Date(item.end_date) : undefined,
        goal,
      })
      return habit
    })
  }
}
