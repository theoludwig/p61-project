import type { GoalCreateData } from "@/domain/entities/Goal"
import { HABIT_MOCK } from "@/tests/mocks/domain/Habit"
import { SUPABASE_HABIT_MOCK } from "@/tests/mocks/supabase/Habit"
import { habitSupabaseDTO, habitsSupabaseDTO } from "../HabitDTO"

describe("infrastructure/supabase/data-transfer-objects/HabitDTO", () => {
  describe("habitSupabaseDTO.fromSupabaseToDomain", () => {
    for (const example of SUPABASE_HABIT_MOCK.examples) {
      it(`should return correct Habit entity - ${example.name}`, () => {
        expect(habitSupabaseDTO.fromSupabaseToDomain(example)).toEqual(
          HABIT_MOCK.examplesByNames[
            example.name as keyof typeof HABIT_MOCK.examplesByNames
          ],
        )
      })
    }
  })

  describe("habitSupabaseDTO.fromDomainCreateDataToSupabaseInsert", () => {
    for (const example of HABIT_MOCK.examples) {
      it(`should return correct SupabaseHabitInsert entity - ${example.name}`, () => {
        let goalData = {} as GoalCreateData
        if (example.goal.isBoolean()) {
          goalData = {
            frequency: example.goal.frequency,
            target: { type: "boolean" },
          }
        }
        if (example.goal.isNumeric()) {
          goalData = {
            frequency: example.goal.frequency,
            target: {
              type: "numeric",
              value: example.goal.target.value,
              unit: example.goal.target.unit,
            },
          }
        }

        const supabaseData =
          SUPABASE_HABIT_MOCK.examplesByNames[
            example.name as keyof typeof SUPABASE_HABIT_MOCK.examplesByNames
          ]
        expect(
          habitSupabaseDTO.fromDomainCreateDataToSupabaseInsert({
            userId: example.userId,
            name: example.name,
            color: example.color,
            icon: example.icon,
            goal: goalData,
          }),
        ).toEqual({
          name: supabaseData.name,
          color: supabaseData.color,
          icon: supabaseData.icon,
          goal_frequency: supabaseData.goal_frequency,
          ...(supabaseData.goal_target != null &&
          supabaseData.goal_target_unit != null
            ? {
                goal_target: supabaseData.goal_target,
                goal_target_unit: supabaseData.goal_target_unit,
              }
            : {}),
        })
      })
    }
  })

  describe("habitSupabaseDTO.fromDomainEditDataToSupabaseUpdate", () => {
    for (const example of HABIT_MOCK.examples) {
      it(`should return correct SupabaseHabitUpdate entity - ${example.name}`, () => {
        const supabaseData =
          SUPABASE_HABIT_MOCK.examplesByNames[
            example.name as keyof typeof SUPABASE_HABIT_MOCK.examplesByNames
          ]
        expect(
          habitSupabaseDTO.fromDomainEditDataToSupabaseUpdate({
            name: example.name,
            color: example.color,
            icon: example.icon,
            id: example.id,
            userId: example.userId,
          }),
        ).toEqual({
          name: supabaseData.name,
          color: supabaseData.color,
          icon: supabaseData.icon,
        })
      })
    }
  })

  describe("habitsSupabaseDTO.fromSupabaseToDomain", () => {
    it("should return correct Habits entities", () => {
      expect(
        habitsSupabaseDTO.fromSupabaseToDomain(SUPABASE_HABIT_MOCK.examples),
      ).toEqual(HABIT_MOCK.examples)
    })
  })
})
