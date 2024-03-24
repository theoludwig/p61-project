import { useLocalSearchParams } from "expo-router"
import { Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

const HabitPage: React.FC = () => {
  const { habitId } = useLocalSearchParams()

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          alignItems: "center",
        },
      ]}
    >
      <Text>Habit Page {habitId}</Text>
    </SafeAreaView>
  )
}

export default HabitPage
