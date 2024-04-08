import { useMemo, useState } from "react"
import { Agenda } from "react-native-calendars"

import type { HabitsTracker } from "@/domain/entities/HabitsTracker"
import { getISODate } from "@/utils/dates"
import { HabitsList } from "./HabitsList"

export interface HabitsMainPageProps {
  habitsTracker: HabitsTracker
}

export const HabitsMainPage: React.FC<HabitsMainPageProps> = (props) => {
  const { habitsTracker } = props

  const today = useMemo(() => {
    return new Date()
  }, [])
  const todayISO = getISODate(today)

  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const selectedISODate = getISODate(selectedDate)

  return (
    <Agenda
      firstDay={1}
      showClosingKnob
      showOnlySelectedDayItems
      onDayPress={(date) => {
        setSelectedDate(new Date(date.dateString))
      }}
      markedDates={{
        [todayISO]: { marked: true },
      }}
      selected={selectedISODate}
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
