import { FlatList } from "react-native"
import { List } from "react-native-paper"

import type { HabitHistory as HabitHistoryType } from "@/domain/entities/HabitHistory"
import { HabitHistory } from "./HabitHistory"

export interface HabitsHistoryProps {
  habitsHistory: HabitHistoryType[]
}

export const HabitsHistory: React.FC<HabitsHistoryProps> = (props) => {
  const { habitsHistory } = props

  return (
    <List.Section
      style={[
        {
          width: "90%",
        },
      ]}
    >
      <FlatList
        data={habitsHistory}
        renderItem={({ item }) => {
          return <HabitHistory habitHistory={item} />
        }}
      />
    </List.Section>
  )
}
