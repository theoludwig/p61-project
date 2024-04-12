import { SafeAreaView } from "react-native-safe-area-context"
import { Card, Text } from "react-native-paper"
import CircularProgress from "react-native-circular-progress-indicator"
import { ScrollView } from "react-native"
import { Calendar } from "react-native-calendars"

import type { HabitsTracker } from "@/domain/entities/HabitsTracker"

export interface StatsProps {
  habitsTracker: HabitsTracker
}

export const Stats: React.FC<StatsProps> = (props) => {
  const { habitsTracker } = props

  const habitsHistory = habitsTracker.getAllHabitsHistory()
  return (
    <SafeAreaView>
      <ScrollView>
        <Calendar />

        {habitsHistory.map((element) => {
          if (element.habit.goal.frequency === "daily") {
            return (
              <Card key={element.habit.id} mode="outlined">
                <Card.Title title="Sucess Week" />
                <Card.Content>
                  <Text variant="bodyMedium">
                    nbDays Sucess dans la semaine
                  </Text>
                  <CircularProgress
                    value={91}
                    activeStrokeWidth={12}
                    progressValueColor={"#ecf0f1"}
                    circleBackgroundColor="black"
                    titleColor="white"
                    title="%"
                  />
                </Card.Content>
              </Card>
            )
          }
          if (element.habit.goal.frequency === "weekly") {
            return (
              <Card key={element.habit.id} mode="outlined">
                <Card.Title title="Sucess Month" />
                <Card.Content>
                  <Text variant="bodyMedium">nbDays Sucess dans le mois</Text>
                </Card.Content>
              </Card>
            )
          }
          if (element.habit.goal.frequency === "monthly") {
            return (
              <Card key={element.habit.id} mode="outlined">
                <Card.Title title="Sucess Month" />
                <Card.Content>
                  <Text variant="bodyMedium">nbDays Sucess dans le mois</Text>
                </Card.Content>
              </Card>
            )
          }
          return null
        })}
      </ScrollView>
    </SafeAreaView>
  )
}
