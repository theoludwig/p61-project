import { Habit } from "@/domain/entities/Habit"
import type { HabitEditRepository } from "@/domain/repositories/HabitEdit"
import { SupabaseRepository } from "./_SupabaseRepository"
import { Goal } from "@/domain/entities/Goal"

export class HabitEditSupabaseRepository
  extends SupabaseRepository
  implements HabitEditRepository
{
  public execute: HabitEditRepository["execute"] = async (options) => {
    const { habitEditData } = options
    const { data, error } = await this.supabaseClient
      .from("habits")
      .update({
        id: Number(habitEditData.id),
        name: habitEditData.name,
        color: habitEditData.color,
        icon: habitEditData.icon,
        goal_frequency: habitEditData.goal.frequency,
        ...(habitEditData.goal.target.type === "numeric"
          ? {
              goal_target: habitEditData.goal.target.value,
              goal_target_unit: habitEditData.goal.target.unit,
            }
          : {}),
      })
      .select("*")
    const updatedHabit = data?.[0]
    if (error != null || updatedHabit == null) {
      throw new Error(error?.message ?? "Failed to edit habit.")
    }
    const habit = new Habit({
      id: updatedHabit.id.toString(),
      userId: updatedHabit.user_id.toString(),
      name: updatedHabit.name,
      icon: updatedHabit.icon,
      goal: Goal.create(habitEditData.goal),
      color: updatedHabit.color,
      startDate: new Date(updatedHabit.start_date),
    })
    return habit
  }
}
