import { Redirect, useLocalSearchParams } from "expo-router"

import { HabitEditForm } from "@/presentation/react-native/components/HabitForm/HabitEditForm"
import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"

const HabitPage: React.FC = () => {
  const { habitId } = useLocalSearchParams()
  const { habitsTracker } = useHabitsTracker()

  const habitHistory = habitsTracker.getHabitHistoryById(habitId as string)

  if (habitHistory == null) {
    return <Redirect href="/application/habits/" />
  }

  return (
    <HabitEditForm habit={habitHistory.habit} key={habitHistory.habit.id} />
  )
}

export default HabitPage
