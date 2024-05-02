import type { Goal } from "@/domain/entities/Goal"
import { GoalBoolean, GoalNumeric } from "@/domain/entities/Goal"
import type { HabitCreateData, HabitEditData } from "@/domain/entities/Habit"
import { Habit } from "@/domain/entities/Habit"
import type {
  SupabaseHabit,
  SupabaseHabitInsert,
  SupabaseHabitUpdate,
} from "../supabase"

export const habitSupabaseDTO = {
  fromSupabaseToDomain: (supabaseHabit: SupabaseHabit): Habit => {
    let goal: Goal
    if (
      supabaseHabit.goal_target != null &&
      supabaseHabit.goal_target_unit != null
    ) {
      goal = new GoalNumeric({
        frequency: supabaseHabit.goal_frequency,
        target: {
          value: supabaseHabit.goal_target,
          unit: supabaseHabit.goal_target_unit,
        },
      })
    } else {
      goal = new GoalBoolean({
        frequency: supabaseHabit.goal_frequency,
      })
    }
    const habit = new Habit({
      id: supabaseHabit.id.toString(),
      name: supabaseHabit.name,
      color: supabaseHabit.color,
      icon: supabaseHabit.icon,
      userId: supabaseHabit.user_id.toString(),
      startDate: new Date(supabaseHabit.start_date),
      endDate:
        supabaseHabit.end_date != null
          ? new Date(supabaseHabit.end_date)
          : undefined,
      goal,
    })
    return habit
  },
  fromDomainCreateDataToSupabaseInsert: (
    habitCreateData: HabitCreateData,
  ): SupabaseHabitInsert => {
    return {
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
    }
  },
  fromDomainEditDataToSupabaseUpdate: (
    habitEditData: HabitEditData,
  ): SupabaseHabitUpdate => {
    return {
      name: habitEditData.name,
      color: habitEditData.color,
      icon: habitEditData.icon,
      end_date: habitEditData?.endDate?.toISOString(),
    }
  },
}

export const habitsSupabaseDTO = {
  fromSupabaseToDomain: (supabaseHabits: SupabaseHabit[]): Habit[] => {
    return supabaseHabits.map((supabaseHabit) => {
      return habitSupabaseDTO.fromSupabaseToDomain(supabaseHabit)
    })
  },
}
