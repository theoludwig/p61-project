import { Card, Text } from "react-native-paper"
import CircularProgress from "react-native-circular-progress-indicator"
import { Agenda } from "react-native-calendars"
import { useState } from "react"

import { getNowDateUTC, getISODate } from "@/utils/dates"
import type { HabitsTracker } from "@/domain/entities/HabitsTracker"

export interface StatsProps {
  habitsTracker: HabitsTracker
}

export const Stats: React.FC<StatsProps> = (props) => {
  const { habitsTracker } = props

  const today = getNowDateUTC()
  const todayISO = getISODate(today)

  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const selectedDateISO = getISODate(selectedDate)

  const habitsHistory = habitsTracker.getAllHabitsHistory()

  let goalDays = 0
  let totalGoalDays = 0
  const dailyHabits = habitsHistory.filter((el) => {
    return (
      el.habit.goal.frequency === "daily" && el.habit.startDate <= selectedDate
    )
  })
  let displayDaily = true
  if (dailyHabits.length === 0) {
    displayDaily = false
  } else {
    for (const el of dailyHabits) {
      totalGoalDays++
      if (
        el.getProgressesByDate(selectedDate)[0]?.goalProgress.isCompleted() ??
        false
      ) {
        goalDays++
      }
    }
  }

  let goalWeek = 0
  let totalGoalWeek = 0
  const weeklyHabits = habitsHistory.filter((el) => {
    return (
      el.habit.goal.frequency === "weekly" && el.habit.startDate <= selectedDate
    )
  })

  let displayWeekly = true
  if (weeklyHabits.length === 0) {
    displayWeekly = false
  } else {
    for (const el of weeklyHabits) {
      totalGoalWeek++
      if (
        el.getProgressesByDate(selectedDate)[0]?.goalProgress.isCompleted() ??
        false
      ) {
        goalWeek++
      }
    }
  }

  let goalMonth = 0
  let totalGoalMonth = 0
  const monthlyHabits = habitsHistory.filter((el) => {
    return (
      el.habit.goal.frequency === "monthly" &&
      el.habit.startDate <= selectedDate
    )
  })

  let displayMonthly = true
  if (monthlyHabits.length === 0) {
    displayMonthly = false
  } else {
    for (const el of monthlyHabits) {
      totalGoalMonth++
      if (
        el.getProgressesByDate(selectedDate)[0]?.goalProgress.isCompleted() ??
        false
      ) {
        goalMonth++
      }
    }
  }

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
            {displayDaily ? (
              <Card key="statsDay" mode="outlined">
                <Card.Title title="Sucess Day" />
                <Card.Content>
                  <Text variant="bodyMedium">
                    {goalDays} but réussi dans la journée sur {totalGoalDays}
                  </Text>
                  <CircularProgress
                    value={(goalDays / totalGoalDays) * 100}
                    activeStrokeWidth={12}
                    progressValueColor={"#ecf0f1"}
                    circleBackgroundColor="black"
                    titleColor="white"
                    title="%"
                  />
                </Card.Content>
              </Card>
            ) : null}
            {displayWeekly ? (
              <Card key="statsWeek" mode="outlined">
                <Card.Title title="Sucess Week" />
                <Card.Content>
                  <Text variant="bodyMedium">
                    {goalWeek} but réussi dans la semaine sur {totalGoalWeek}
                  </Text>
                  <CircularProgress
                    value={(goalWeek / totalGoalWeek) * 100}
                    activeStrokeWidth={12}
                    progressValueColor={"#ecf0f1"}
                    circleBackgroundColor="black"
                    titleColor="white"
                    title="%"
                  />
                </Card.Content>
              </Card>
            ) : null}
            {displayMonthly ? (
              <Card key="statsMonth" mode="outlined">
                <Card.Title title="Sucess Month" />
                <Card.Content>
                  <Text variant="bodyMedium">
                    {goalMonth} but réussi dans le mois sur {totalGoalMonth}
                  </Text>
                  <CircularProgress
                    value={(goalMonth / totalGoalMonth) * 100}
                    activeStrokeWidth={12}
                    progressValueColor={"#ecf0f1"}
                    circleBackgroundColor="black"
                    titleColor="white"
                    title="%"
                  />
                </Card.Content>
              </Card>
            ) : null}
          </>
        )
      }}
    />
  )
}
