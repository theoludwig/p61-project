import LottieView from "lottie-react-native"
import { useRef, useState } from "react"
import { Dimensions, ScrollView, View } from "react-native"
import { Divider, List } from "react-native-paper"

import type { GoalFrequency } from "@/domain/entities/Goal"
import type { HabitsTracker } from "@/domain/entities/HabitsTracker"
import { capitalize } from "@/utils/strings"
import confettiJSON from "../../../assets/confetti.json"
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

  const confettiRef = useRef<LottieView | null>(null)

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
                {habitsTracker.habitsHistory[frequency]
                  .filter((habitItem) => {
                    return (
                      (habitItem.habit.endDate != null &&
                        habitItem.habit.endDate >= selectedDate) ||
                      habitItem.habit.endDate == null
                    )
                  })
                  .map((item) => {
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
      </ScrollView>
    </>
  )
}
