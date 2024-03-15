import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useHabitsTracker } from "@/contexts/HabitsTracker"

const HabitsPage: React.FC = () => {
  const { habitsTrackerPresenterState } = useHabitsTracker()
  const { habitsTracker } = habitsTrackerPresenterState
  const { habitProgressHistories } = habitsTracker

  return (
    <SafeAreaView style={styles.container}>
      {habitProgressHistories.map((progressHistory) => {
        const { habit } = progressHistory

        return (
          <View key={habit.id}>
            <Text>{habit.name}</Text>
          </View>
        )
      })}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default HabitsPage
