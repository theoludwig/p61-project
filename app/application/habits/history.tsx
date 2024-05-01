import { useMemo, useState } from "react"
import { View } from "react-native"
import { Agenda } from "react-native-calendars"
import { Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { getISODate, getNowDateUTC } from "@/utils/dates"

const HistoryPage: React.FC = () => {
  const today = useMemo(() => {
    return getNowDateUTC()
  }, [])
  const todayISO = getISODate(today)

  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const selectedISODate = getISODate(selectedDate)

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "white",
        },
      ]}
    >
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
            <View>
              <Text>{selectedDate.toISOString()}</Text>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}

export default HistoryPage
