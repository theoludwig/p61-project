import LottieView from "lottie-react-native"
import { useRef, useState } from "react"
import { Dimensions, ScrollView, View } from "react-native"
import { Divider, List, Text } from "react-native-paper"

import { GOAL_FREQUENCIES, type GoalFrequency } from "@/domain/entities/Goal"
import type { HabitHistory } from "@/domain/entities/HabitHistory"
import type { HabitsTracker } from "@/domain/entities/HabitsTracker"
import { LOCALE, capitalize } from "@/utils/strings"
import confettiJSON from "../../../assets/confetti.json"
import { HabitCard } from "./HabitCard"

export interface HabitsListProps {
  habitsTracker: HabitsTracker
  selectedDate: Date
}

export const HabitsList: React.FC<HabitsListProps> = (props) => {
  const { habitsTracker, selectedDate } = props

  const [accordionExpanded, setAccordionExpanded] = useState<{
    [key in GoalFrequency]: boolean
  }>({
    daily: true,
    weekly: true,
    monthly: true,
  })

  const confettiRef = useRef<LottieView | null>(null)

  const habitsHistoriesByFrequency: Record<GoalFrequency, HabitHistory[]> = {
    daily: habitsTracker.getHabitsHistoriesByDate({
      selectedDate,
      frequency: "daily",
    }),
    weekly: habitsTracker.getHabitsHistoriesByDate({
      selectedDate,
      frequency: "weekly",
    }),
    monthly: habitsTracker.getHabitsHistoriesByDate({
      selectedDate,
      frequency: "monthly",
    }),
  }

  const frequenciesFiltered = GOAL_FREQUENCIES.filter((frequency) => {
    return habitsHistoriesByFrequency[frequency].length > 0
  })

  return (
    <>
      <View
        pointerEvents="none"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          ref={confettiRef}
          source={confettiJSON}
          autoPlay={false}
          loop={false}
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          ]}
          resizeMode="cover"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
          width: Dimensions.get("window").width,
          backgroundColor: "white",
        }}
      >
        <Divider />

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {selectedDate.toLocaleDateString(LOCALE, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>

        {frequenciesFiltered.length > 0 ? (
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
                  {habitsHistoriesByFrequency[frequency].map((item) => {
                    return (
                      <HabitCard
                        habitHistory={item}
                        selectedDate={selectedDate}
                        key={item.habit.id + selectedDate.toISOString()}
                        confettiRef={confettiRef}
                      />
                    )
                  })}
                </List.Accordion>
              )
            })}
          </List.Section>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 6,
            }}
          >
            <Text variant="titleLarge">No habits for this date</Text>
          </View>
        )}
      </ScrollView>
    </>
  )
}
