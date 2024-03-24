import { Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

const NewHabitPage: React.FC = () => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Text>New Habit</Text>
    </SafeAreaView>
  )
}

export default NewHabitPage
