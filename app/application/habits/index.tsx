import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"

const HabitsPage: React.FC = () => {
  const { habitsTracker } = useHabitsTracker()

  return (
    <SafeAreaView style={styles.container}>
      {habitsTracker.habitsHistory.map((progressHistory) => {
        const { habit } = progressHistory

        return (
          <View key={habit.id}>
            <Text>
              {habit.name} ({habit.goal.type})
            </Text>
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
