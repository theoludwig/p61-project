import { StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

const NewHabitPage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>New Habit</Text>
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

export default NewHabitPage
