import { useState } from "react"
import { Dimensions, ScrollView } from "react-native"
import { Divider, List } from "react-native-paper"

import type { GoalFrequency } from "@/domain/entities/Goal"
import type { HabitsTracker } from "@/domain/entities/HabitsTracker"
import { capitalize } from "@/utils/strings"
import { HabitCard } from "./HabitCard"

export interface HabitsListProps {
  habitsTracker: HabitsTracker
  selectedDate: Date
  frequenciesFiltered: GoalFrequency[]
}

export const HabitsList: React.FC<HabitsListProps> = (props) => {
  const { habitsTracker, selectedDate, frequenciesFiltered } = props

  const [accordionExpanded, setAccordionExpanded] = useState<{
    [key in GoalFrequency]: boolean
  }>({
    daily: true,
    weekly: true,
    monthly: true,
  })

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingHorizontal: 20,
        width: Dimensions.get("window").width,
        backgroundColor: "white",
      }}
    >
      <Divider />
      <List.Section>
        {frequenciesFiltered.map((frequency) => {
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
              {habitsTracker.habitsHistory[frequency].map((item) => {
                const goalProgress = item.getGoalProgressByDate(selectedDate)
                return (
                  <HabitCard
                    habit={item.habit}
                    goalProgress={goalProgress}
                    key={item.habit.id}
                  />
                )
              })}
            </List.Accordion>
          )
        })}
      </List.Section>
    </ScrollView>
  )
}
