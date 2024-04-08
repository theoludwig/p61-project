import { Redirect, useLocalSearchParams } from "expo-router"
import { Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"

const HabitPage: React.FC = () => {
  const { habitId } = useLocalSearchParams()
  const { habitsTracker } = useHabitsTracker()

  const habitHistory = habitsTracker.getHabitHistoryById(habitId as string)
  if (habitHistory == null) {
    return <Redirect href="/application/habits/" />
  }

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          alignItems: "center",
        },
      ]}
    >
      <Text>
        Habit Page {habitId} {habitHistory.habit.name}
      </Text>
    </SafeAreaView>
  )
}

export default HabitPage
