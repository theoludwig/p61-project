import { Card, Text } from "react-native-paper"
import CircularProgress from "react-native-circular-progress-indicator"
import { Agenda } from "react-native-calendars"
import type { SetStateAction } from "react"
import { useState, useEffect } from "react"

import { getNowDateUTC, getISODate } from "@/utils/dates"
import type { HabitsTracker } from "@/domain/entities/HabitsTracker"
import type { HabitHistory } from "@/domain/entities/HabitHistory"

export interface StatsProps {
  habitsTracker: HabitsTracker
}

export const Stats: React.FC<StatsProps> = ({ habitsTracker }) => {
  const today = getNowDateUTC()
  const todayISO = getISODate(today)

  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const selectedDateISO = getISODate(selectedDate)

  const habitsHistory = habitsTracker.getAllHabitsHistory()

  const [goalDays, setGoalDays] = useState(0)
  const [totalGoalDays, setTotalGoalDays] = useState(0)
  const [displayDaily, setDisplayDaily] = useState(true)
  const [goalWeek, setGoalWeek] = useState(0)
  const [totalGoalWeek, setTotalGoalWeek] = useState(0)
  const [displayWeekly, setDisplayWeekly] = useState(true)
  const [goalMonth, setGoalMonth] = useState(0)
  const [totalGoalMonth, setTotalGoalMonth] = useState(0)
  const [displayMonthly, setDisplayMonthly] = useState(true)

  const updateStats = (date: Date): void => {
    const dailyHabits = habitsHistory.filter((el) => {
      return (
        el.habit.goal.frequency === "daily" &&
        el.habit.startDate.getFullYear() <= date.getFullYear() &&
        el.habit.startDate.getMonth() <= date.getMonth() &&
        el.habit.startDate.getDate() <= date.getDate()
      )
    })
    const weeklyHabits = habitsHistory.filter((el) => {
      return (
        el.habit.goal.frequency === "weekly" &&
        el.habit.startDate.getFullYear() <= date.getFullYear() &&
        el.habit.startDate.getMonth() <= date.getMonth() &&
        el.habit.startDate.getDate() <= date.getDate()
      )
    })
    const monthlyHabits = habitsHistory.filter((el) => {
      return (
        el.habit.goal.frequency === "monthly" &&
        el.habit.startDate.getFullYear() <= date.getFullYear() &&
        el.habit.startDate.getMonth() <= date.getMonth() &&
        el.habit.startDate.getDate() <= date.getDate()
      )
    })

    const calculateGoals = (
      habits: HabitHistory[],
      setTotalGoals: {
        (value: SetStateAction<number>): void
        (value: SetStateAction<number>): void
        (value: SetStateAction<number>): void
        (arg0: any): void
      },
      setGoals: {
        (value: SetStateAction<number>): void
        (value: SetStateAction<number>): void
        (value: SetStateAction<number>): void
        (arg0: any): void
      },
    ): void => {
      setTotalGoals(habits.length)
      const completedGoals = habits.filter((el) => {
        return (
          el.getProgressesByDate(date)[0]?.goalProgress.isCompleted() ?? false
        )
      }).length
      setGoals(completedGoals)
    }

    if (dailyHabits.length === 0) {
      setDisplayDaily(false)
    } else {
      setDisplayDaily(true)
      calculateGoals(dailyHabits, setTotalGoalDays, setGoalDays)
    }

    if (weeklyHabits.length === 0) {
      setDisplayWeekly(false)
    } else {
      setDisplayWeekly(true)
      calculateGoals(weeklyHabits, setTotalGoalWeek, setGoalWeek)
    }

    if (monthlyHabits.length === 0) {
      setDisplayMonthly(false)
    } else {
      setDisplayMonthly(true)
      calculateGoals(monthlyHabits, setTotalGoalMonth, setGoalMonth)
    }
  }

  useEffect(() => {
    updateStats(selectedDate)
  }, [selectedDate])

  return (
    <Agenda
      firstDay={1}
      showClosingKnob
      onDayPress={(date) => {
        return setSelectedDate(new Date(date.dateString))
      }}
      markedDates={{
        [todayISO]: { marked: true, today: true },
      }}
      maxDate={todayISO}
      selected={selectedDateISO}
      renderList={() => {
        return (
          <>
            <Card key="statsDay" mode="outlined">
              <Card.Title title="Success Day" />
              <Card.Content>
                {displayDaily ? (
                  <>
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
                  </>
                ) : (
                  <Text variant="bodyMedium">Aucun objectif quotidien</Text>
                )}
              </Card.Content>
            </Card>

            <Card key="statsWeek" mode="outlined">
              <Card.Title title="Success Week" />
              <Card.Content>
                {displayWeekly ? (
                  <>
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
                  </>
                ) : (
                  <Text variant="bodyMedium">Aucun objectif hebdomadaire</Text>
                )}
              </Card.Content>
            </Card>

            <Card key="statsMonth" mode="outlined">
              <Card.Title title="Success Month" />
              <Card.Content>
                {displayMonthly ? (
                  <>
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
                  </>
                ) : (
                  <Text variant="bodyMedium">Aucun objectif mensuel</Text>
                )}
              </Card.Content>
            </Card>
          </>
        )
      }}
    />
  )
}
