import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import { useRouter } from "expo-router"
import { List } from "react-native-paper"

import type { HabitHistory as HabitHistoryType } from "@/domain/entities/HabitHistory"
import { getColorRGBAFromHex } from "@/presentation/presenters/utils/colors"

export interface HabitHistoryProps {
  habitHistory: HabitHistoryType
}

export const HabitHistory: React.FC<HabitHistoryProps> = (props) => {
  const { habitHistory } = props
  const { habit } = habitHistory

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
    />
  )
}
