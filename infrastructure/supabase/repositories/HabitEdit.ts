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
        name: habitEditData.name,
        color: habitEditData.color,
        icon: habitEditData.icon,
        end_date: habitEditData?.endDate?.toISOString(),
      })
      .eq("id", habitEditData.id)
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
      goal: Goal.create({
        frequency: updatedHabit.goal_frequency,
        target:
          updatedHabit.goal_target != null &&
          updatedHabit.goal_target_unit != null
            ? {
                type: "numeric",
                value: updatedHabit.goal_target,
                unit: updatedHabit.goal_target_unit,
              }
            : {
                type: "boolean",
              },
      }),
      color: updatedHabit.color,
      startDate: new Date(updatedHabit.start_date),
      endDate:
        updatedHabit.end_date != null
          ? new Date(updatedHabit.end_date)
          : undefined,
    })
    return habit
  }
}
