import { FlatList, View } from "react-native"
import { Button, List, Text } from "react-native-paper"
import { useMemo, useState } from "react"
import { useRouter } from "expo-router"

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

  const router = useRouter()

  const habitsByFrequency = useMemo(() => {
    return GOAL_FREQUENCIES.filter((frequency) => {
      return habitsTracker.habitsHistory[frequency].length > 0
    })
  }, [habitsTracker])

  const [accordionExpanded, setAccordionExpanded] = useState<{
    [key in GoalFrequency]: boolean
  }>({
    daily: true,
    weekly: true,
    monthly: true,
  })

  if (habitsByFrequency.length <= 0) {
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

  return (
    <List.Section
      style={[
        {
          width: "92%",
        },
      ]}
    >
      {habitsByFrequency.map((frequency) => {
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
