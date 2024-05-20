import { useState } from "react"
import { Agenda } from "react-native-calendars"

import { GOAL_FREQUENCIES } from "@/domain/entities/Goal"
import type { HabitsTracker } from "@/domain/entities/HabitsTracker"
import { getISODate, getNowDateUTC } from "@/utils/dates"
import { HabitsEmpty } from "./HabitsEmpty"
import { HabitsList } from "./HabitsList"

export interface HabitsMainPageProps {
  habitsTracker: HabitsTracker
}

export const HabitsMainPage: React.FC<HabitsMainPageProps> = (props) => {
  const { habitsTracker } = props

  const today = getNowDateUTC()
  const todayISO = getISODate(today)

  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const selectedDateISO = getISODate(selectedDate)

  const frequenciesFiltered = GOAL_FREQUENCIES.filter((frequency) => {
    return habitsTracker.habitsHistory[frequency].length > 0
  })

  if (frequenciesFiltered.length <= 0) {
    return <HabitsEmpty />
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
          <HabitsList
            habitsTracker={habitsTracker}
            selectedDate={selectedDate}
          />
        )
      }}
    />
  )
}
