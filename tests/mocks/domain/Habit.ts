import { GoalBoolean, GoalNumeric } from "@/domain/entities/Goal"
import type { HabitData } from "@/domain/entities/Habit"
import { Habit } from "@/domain/entities/Habit"
import { USER_MOCK } from "./User"
import { ONE_DAY_MILLISECONDS } from "@/utils/dates"

interface HabitMockCreateOptions extends Omit<HabitData, "startDate"> {
  startDate?: Date
}
const habitMockCreate = (options: HabitMockCreateOptions): Habit => {
  const {
    id,
    userId,
    name,
    color,
    icon,
    goal,
    startDate = new Date(),
    endDate,
  } = options

  return new Habit({
    id,
    userId,
    name,
    color,
    icon,
    goal,
    startDate,
    endDate,
  })
}

const examplesByNames = {
  "Wake up at 07h00": habitMockCreate({
    id: "1",
    userId: USER_MOCK.example.id,
    name: "Wake up at 07h00",
    color: "#006CFF",
    icon: "bed",
    goal: new GoalBoolean({
      frequency: "daily",
    }),
  }),
  "Learn English": habitMockCreate({
    id: "2",
    userId: USER_MOCK.example.id,
    name: "Learn English",
    color: "#EB4034",
    icon: "language",
    goal: new GoalNumeric({
      frequency: "daily",
      target: {
        value: 30,
        unit: "minutes",
      },
    }),
  }),
  Walk: habitMockCreate({
    id: "3",
    userId: USER_MOCK.example.id,
    name: "Walk",
    color: "#228B22",
    icon: "person-walking",
    goal: new GoalNumeric({
      frequency: "daily",
      target: {
        value: 5000,
        unit: "steps",
      },
    }),
  }),
  "Clean the house": habitMockCreate({
    id: "4",
    userId: USER_MOCK.example.id,
    name: "Clean the house",
    color: "#808080",
    icon: "broom",
    goal: new GoalBoolean({
      frequency: "weekly",
    }),
  }),
  "Solve Programming Challenges": habitMockCreate({
    id: "5",
    userId: USER_MOCK.example.id,
    name: "Solve Programming Challenges",
    color: "#DE3163",
    icon: "code",
    goal: new GoalNumeric({
      frequency: "monthly",
      target: {
        value: 5,
        unit: "challenges",
      },
    }),
    endDate: new Date(Date.now() + ONE_DAY_MILLISECONDS),
  }),
} as const

export const examplesByIds = {
  [examplesByNames["Wake up at 07h00"].id]: examplesByNames["Wake up at 07h00"],
  [examplesByNames["Learn English"].id]: examplesByNames["Learn English"],
  [examplesByNames.Walk.id]: examplesByNames.Walk,
  [examplesByNames["Clean the house"].id]: examplesByNames["Clean the house"],
  [examplesByNames["Solve Programming Challenges"].id]:
    examplesByNames["Solve Programming Challenges"],
} as const

export const HABIT_MOCK = {
  create: habitMockCreate,
  example: examplesByNames["Wake up at 07h00"],
  examplesByNames,
  examplesByIds,
  examples: Object.values(examplesByNames),
}
