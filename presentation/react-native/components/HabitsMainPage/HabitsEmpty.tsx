import { useRouter } from "expo-router"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"

export const HabitsEmpty: React.FC = () => {
  const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text variant="titleLarge">{"Let's begin by adding habits! 🤩"}</Text>
      <Button
        mode="contained"
        style={{
          marginTop: 16,
          width: 250,
          height: 40,
        }}
        onPress={() => {
          router.push("/application/habits/new")
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Create your first habit! 🚀
        </Text>
      </Button>
    </View>
  )
}
