import { useRouter } from "expo-router"
import { useState } from "react"
import { Dimensions, ScrollView, View } from "react-native"
import { Button, List, Text } from "react-native-paper"

import type { GoalFrequency } from "@/domain/entities/Goal"
import { GOAL_FREQUENCIES } from "@/domain/entities/Goal"
import type { HabitsTracker } from "@/domain/entities/HabitsTracker"
import { capitalize } from "@/presentation/presenters/utils/strings"
import { HabitCard } from "./HabitCard"

export interface HabitsMainPageProps {
  habitsTracker: HabitsTracker
}

export const HabitsMainPage: React.FC<HabitsMainPageProps> = (props) => {
  const { habitsTracker } = props

  const router = useRouter()

  const habitsByFrequency = GOAL_FREQUENCIES.filter((frequency) => {
    return habitsTracker.habitsHistory[frequency].length > 0
  })

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingHorizontal: 20,
        width: Dimensions.get("window").width,
      }}
    >
      <List.Section>
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
              {habitsTracker.habitsHistory[frequency].map((item) => {
                return <HabitCard habitHistory={item} key={item.habit.id} />
              })}
            </List.Accordion>
          )
        })}
      </List.Section>
    </ScrollView>
  )
}
