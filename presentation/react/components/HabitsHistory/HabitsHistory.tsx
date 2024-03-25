import { FlatList } from "react-native"
import { List } from "react-native-paper"
import { useState } from "react"

import type { GoalFrequency } from "@/domain/entities/Goal"
import { GOAL_FREQUENCIES } from "@/domain/entities/Goal"
import type { HabitsTracker } from "@/domain/entities/HabitsTracker"
import { capitalize } from "@/presentation/presenters/utils/strings"
import { HabitHistory } from "./HabitHistory"

export interface HabitsHistoryProps {
  habitsTracker: HabitsTracker
}

export const HabitsHistory: React.FC<HabitsHistoryProps> = (props) => {
  const { habitsTracker } = props

  const [accordionExpanded, setAccordionExpanded] = useState<{
    [key in GoalFrequency]: boolean
  }>({
    daily: true,
    weekly: true,
    monthly: true,
  })

  return (
    <List.Section
      style={[
        {
          width: "92%",
        },
      ]}
    >
      {GOAL_FREQUENCIES.map((frequency) => {
        return (
          <List.Accordion
            expanded={accordionExpanded[frequency]}
            onPress={() => {
              setAccordionExpanded((old) => {
                return {
                  ...old,
                  [frequency]: !old[frequency],
                }
              })
            }}
            key={frequency}
            title={capitalize(frequency)}
            titleStyle={[
              {
                fontSize: 26,
              },
            ]}
          >
            <FlatList
              data={habitsTracker.habitsHistory[frequency]}
              renderItem={({ item }) => {
                return <HabitHistory habitHistory={item} />
              }}
            />
          </List.Accordion>
        )
      })}
    </List.Section>
  )
}
