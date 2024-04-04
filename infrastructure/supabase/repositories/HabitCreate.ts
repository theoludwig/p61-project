import { Habit } from "@/domain/entities/Habit"
import type { HabitCreateRepository } from "@/domain/repositories/HabitCreate"
import { SupabaseRepository } from "./_SupabaseRepository"
import { Goal } from "@/domain/entities/Goal"

export class HabitCreateSupabaseRepository
  extends SupabaseRepository
  implements HabitCreateRepository
{
  public execute: HabitCreateRepository["execute"] = async (options) => {
    const { habitCreateData } = options
    const { data, error } = await this.supabaseClient
      .from("habits")
      .insert({
        name: habitCreateData.name,
        color: habitCreateData.color,
        icon: habitCreateData.icon,
        goal_frequency: habitCreateData.goal.frequency,
        ...(habitCreateData.goal.target.type === "numeric"
          ? {
              goal_target: habitCreateData.goal.target.value,
              goal_target_unit: habitCreateData.goal.target.unit,
            }
          : {}),
      })
      .select("*")
    const insertedHabit = data?.[0]
    if (error != null || insertedHabit == null) {
      throw new Error(error?.message ?? "Failed to create habit.")
    }
    const habit = new Habit({
      id: insertedHabit.id.toString(),
      userId: insertedHabit.user_id.toString(),
      name: insertedHabit.name,
      icon: insertedHabit.icon,
      goal: Goal.create(habitCreateData.goal),
      color: insertedHabit.color,
      startDate: new Date(insertedHabit.start_date),
    })
    return habit
  }
}
