import type { GetHabitsByUserIdRepository } from "@/domain/repositories/GetHabitsByUserId"
import { SupabaseRepository } from "./_SupabaseRepository"
import { Habit } from "@/domain/entities/Habit"
import type { Goal } from "@/domain/entities/Goal"
import { GoalBoolean, GoalNumeric } from "@/domain/entities/Goal"

export class GetHabitsByUserIdSupabaseRepository
  extends SupabaseRepository
  implements GetHabitsByUserIdRepository
{
  public execute: GetHabitsByUserIdRepository["execute"] = async (options) => {
    const { userId } = options
    const { data, error } = await this.supabaseClient
      .from("habits")
      .select("*")
      .eq("user_id", userId)
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
