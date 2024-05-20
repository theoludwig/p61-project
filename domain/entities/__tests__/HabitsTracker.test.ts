import { HABIT_MOCK } from "@/tests/mocks/domain/Habit"
import { GOAL_FREQUENCIES } from "../Goal"
import { HabitsTracker } from "../HabitsTracker"
import { HabitHistory } from "../HabitHistory"
import { HABIT_PROGRESS_MOCK } from "@/tests/mocks/domain/HabitProgress"

describe("domain/entities/HabitsTracker", () => {
  describe("HabitsTracker.default", () => {
    for (const frequency of GOAL_FREQUENCIES) {
      it(`should return empty habitsHistory for ${frequency}`, () => {
        const habitsTracker = HabitsTracker.default()
        expect(habitsTracker.habitsHistory[frequency]).toEqual([])
      })
    }
  })

  describe("getAllHabitsHistory", () => {
    it("should return all habits history", () => {
      const habitsTracker = HabitsTracker.default()
      const habit = HABIT_MOCK.examplesByNames.Walk
      habitsTracker.addHabit(habit)
      expect(habitsTracker.getAllHabitsHistory()).toEqual([
        new HabitHistory({
          habit,
          progressHistory: [],
        }),
      ])
    })

    it("should return empty array when no habits are added", () => {
      const habitsTracker = HabitsTracker.default()
      expect(habitsTracker.getAllHabitsHistory()).toEqual([])
    })
  })

  describe("getHabitHistoryById", () => {
    it("should return habit history by id", () => {
      const habitsTracker = HabitsTracker.default()
      const habit = HABIT_MOCK.examplesByNames.Walk
      habitsTracker.addHabit(habit)
      expect(habitsTracker.getHabitHistoryById(habit.id)).toEqual(
        new HabitHistory({
          habit,
          progressHistory: [],
        }),
      )
    })

    it("should return undefined when habit is not found", () => {
      const habitsTracker = HabitsTracker.default()
      expect(habitsTracker.getHabitHistoryById("invalid-id")).toBeUndefined()
    })
  })

  describe("addHabit", () => {
    it("should add habit to habitsHistory", () => {
      const habitsTracker = HabitsTracker.default()
      const habit = HABIT_MOCK.examplesByNames.Walk
      habitsTracker.addHabit(habit)
      expect(habitsTracker.habitsHistory[habit.goal.frequency]).toEqual([
        new HabitHistory({
          habit,
          progressHistory: [],
        }),
      ])
    })
  })

  describe("editHabit", () => {
    it("should edit habit in habitsHistory", () => {
      const habitsTracker = HabitsTracker.default()
      const habit = HABIT_MOCK.examplesByNames.Walk
      habitsTracker.addHabit(habit)
      habit.name = "Run"
      habitsTracker.editHabit(habit)
      expect(habitsTracker.habitsHistory[habit.goal.frequency]).toEqual([
        new HabitHistory({
          habit,
          progressHistory: [],
        }),
      ])
    })

    it("should not edit habit in habitsHistory when habit is not found", () => {
      const habitsTracker = HabitsTracker.default()
      const habit = HABIT_MOCK.examplesByNames.Walk
      habitsTracker.editHabit(habit)
      expect(habitsTracker.habitsHistory[habit.goal.frequency]).toEqual([])
    })
  })

  describe("updateHabitProgress", () => {
    it("should update habit progress in habitsHistory (add new habit progress if not yet added)", () => {
      const habitsTracker = HabitsTracker.default()
      const habit = HABIT_MOCK.examplesByNames["Clean the house"]
      habitsTracker.addHabit(habit)
      habitsTracker.updateHabitProgress(HABIT_PROGRESS_MOCK.exampleByIds[1])
      expect(habitsTracker.habitsHistory[habit.goal.frequency]).toEqual([
        new HabitHistory({
          habit,
          progressHistory: [HABIT_PROGRESS_MOCK.exampleByIds[1]],
        }),
      ])
    })
  })
})
