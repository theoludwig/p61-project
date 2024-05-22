import { Card, Divider, Text } from "react-native-paper"
import CircularProgress from "react-native-circular-progress-indicator"
import { Agenda } from "react-native-calendars"
import { useState } from "react"

import { getNowDateUTC, getISODate } from "@/utils/dates"
import type { HabitsTracker } from "@/domain/entities/HabitsTracker"
import { LOCALE } from "@/utils/strings"
import {
  GOAL_FREQUENCIES,
  GOAL_FREQUENCIES_TYPES,
} from "@/domain/entities/Goal"
import { calculateRatio } from "@/utils/maths"

export interface HabitsStatisticsProps {
  habitsTracker: HabitsTracker
}

export const HabitsStatistics: React.FC<HabitsStatisticsProps> = (props) => {
  const { habitsTracker } = props

  const today = getNowDateUTC()
  const todayISO = getISODate(today)

  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const selectedDateISO = getISODate(selectedDate)

  return (
    <Agenda
      firstDay={1}
      showClosingKnob
      onDayPress={(date) => {
        setSelectedDate(new Date(date.dateString))
      }}
      markedDates={{
        [todayISO]: { marked: true, today: true },
      }}
      maxDate={todayISO}
      selected={selectedDateISO}
      renderList={() => {
        return (
          <>
            <Divider />

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 22,
                textAlign: "center",
                marginVertical: 10,
              }}
            >
              {selectedDate.toLocaleDateString(LOCALE, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>

            {GOAL_FREQUENCIES.map((frequency) => {
              const { totalGoalsSuccess, totalGoals } =
                habitsTracker.getHabitsStatisticsByDateAndFrequency({
                  selectedDate,
                  frequency,
                })
              const percentage =
                calculateRatio(totalGoalsSuccess, totalGoals) * 100
              return {
                totalGoalsSuccess,
                totalGoals,
                percentage,
                frequency,
              }
            })
              .filter(({ totalGoals }) => {
                return totalGoals > 0
              })
              .map(
                ({ frequency, totalGoals, totalGoalsSuccess, percentage }) => {
                  return (
                    <Card
                      key={frequency}
                      mode="elevated"
                      style={{ marginVertical: 8, marginHorizontal: 10 }}
                    >
                      <Card.Content
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text variant="bodyMedium" style={{ marginBottom: 5 }}>
                          {totalGoalsSuccess} achieved goals in the{" "}
                          {GOAL_FREQUENCIES_TYPES[frequency]} out of{" "}
                          {totalGoals}.
                        </Text>
                        <CircularProgress
                          value={percentage}
                          progressValueColor={"#ecf0f1"}
                          circleBackgroundColor="black"
                          titleColor="white"
                          title="%"
                        />
                      </Card.Content>
                    </Card>
                  )
                },
              )}
          </>
        )
      }}
    />
  )
}
