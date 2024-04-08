import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import { useRouter } from "expo-router"
import { View } from "react-native"
import { List, Text } from "react-native-paper"

import type { GoalProgress } from "@/domain/entities/Goal"
import type { Habit } from "@/domain/entities/Habit"
import { getColorRGBAFromHex } from "@/utils/colors"

export interface HabitCardProps {
  habit: Habit
  goalProgress: GoalProgress
}

export const HabitCard: React.FC<HabitCardProps> = (props) => {
  const { habit, goalProgress } = props

  const router = useRouter()

  const habitColor = getColorRGBAFromHex({
    hexColor: habit.color,
    opacity: 0.4,
  })

  return (
    <List.Item
      onPress={() => {
        router.push({
          pathname: "/application/habits/[habitId]/",
          params: {
            habitId: habit.id,
          },
        })
      }}
      title={habit.name}
      style={[
        {
          paddingVertical: 20,
          paddingHorizontal: 10,
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: habitColor,
        },
      ]}
      contentStyle={[
        {
          paddingLeft: 12,
        },
      ]}
      titleStyle={[
        {
          fontSize: 18,
        },
      ]}
      left={() => {
        return (
          <FontAwesome6
            size={24}
            name={habit.icon}
            style={[
              {
                width: 30,
              },
            ]}
          />
        )
      }}
      right={() => {
        if (goalProgress.isNumeric()) {
          return (
            <View>
              <Text>
                {goalProgress.progress.toLocaleString()} /{" "}
                {goalProgress.goal.target.value.toLocaleString()}{" "}
                {goalProgress.goal.target.unit}
              </Text>
            </View>
          )
        }

        return (
          <View>
            <Text>{goalProgress.isCompleted() ? "true" : "false"}</Text>
          </View>
        )
      }}
    />
  )
}
