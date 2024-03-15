import { useState } from "react"
import { StyleSheet } from "react-native"
import { Calendar } from "react-native-calendars"
import { SafeAreaView } from "react-native-safe-area-context"

const HistoryPage: React.FC = () => {
  const [selected, setSelected] = useState("")

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString)
        }}
        markedDates={{
          "2023-03-01": { selected: true, marked: true, selectedColor: "blue" },
          "2023-03-02": { marked: true },
          "2023-03-03": { selected: true, marked: true, selectedColor: "blue" },
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: "orange",
          },
        }}
        theme={{
          backgroundColor: "#000000",
          calendarBackground: "#000000",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9efff",
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default HistoryPage
