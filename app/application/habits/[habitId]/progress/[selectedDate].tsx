import { Redirect, useLocalSearchParams } from "expo-router"

import { HabitProgress } from "@/presentation/react-native/components/HabitProgress"
import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"

const HabitProgressPage: React.FC = () => {
  const { habitId, selectedDate } = useLocalSearchParams()
  const { habitsTracker } = useHabitsTracker()

  const habitHistory = habitsTracker.getHabitHistoryById(habitId as string)
  const selectedDateParsed = new Date(selectedDate as string)

  if (habitHistory == null) {
    return <Redirect href="/application/habits/" />
  }

  return (
    <HabitProgress
      habitHistory={habitHistory}
      key={habitHistory.habit.id}
      selectedDate={selectedDateParsed}
    />
  )
}

export default HabitProgressPage
