import { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Snackbar, Text, TextInput } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import type { IconName } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import type { GoalNumeric } from "@/domain/entities/Goal"
import { GoalNumericProgress } from "@/domain/entities/Goal"
import type { HabitHistory } from "@/domain/entities/HabitHistory"
import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"
import { LOCALE, capitalize } from "@/utils/strings"

export interface HabitProgressProps {
  habitHistory: HabitHistory
  selectedDate: Date
}

export const HabitProgress: React.FC<HabitProgressProps> = ({
  habitHistory,
  selectedDate,
}) => {
  const { habitsTrackerPresenter, habitGoalProgressUpdate } = useHabitsTracker()

  const [isVisibleSnackbar, setIsVisibleSnackbar] = useState(false)

  const onDismissSnackbar = (): void => {
    setIsVisibleSnackbar(false)
  }

  const goalProgress = habitHistory.getGoalProgressByDate(selectedDate)

  const goalProgresses = habitHistory.getProgressesByDate(selectedDate)

  const values = {
    progress: 0,
    min: 0,
    max: 0,
  }
  if (goalProgress.isNumeric()) {
    values.max = goalProgress.goal.target.value
  }
  const [progressValue, setProgressValue] = useState(values.progress)

  if (!goalProgress.isNumeric()) {
    return <></>
  }

  const progressTotal = goalProgress.progress + progressValue

  const handleSave = async (): Promise<void> => {
    setIsVisibleSnackbar(true)
    await habitsTrackerPresenter.habitUpdateProgress({
      date: selectedDate,
      habitHistory,
      goalProgress: new GoalNumericProgress({
        goal: habitHistory.habit.goal as GoalNumeric,
        progress: progressValue,
      }),
    })
    setProgressValue(0)
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
          }}
        >
          <FontAwesomeIcon
            size={24}
            icon={habitHistory.habit.icon as IconName}
            style={[
              {
                width: 30,
              },
            ]}
          />

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 28,
              textAlign: "center",
            }}
          >
            {habitHistory.habit.name}
          </Text>
        </View>

        <Text
          style={{
            marginTop: 10,
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {capitalize(habitHistory.habit.goal.frequency)} Progress
        </Text>

        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            marginBottom: 15,
          }}
        >
          {selectedDate.toLocaleDateString(LOCALE, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>

        <View
          style={{
            width: "100%",
            borderBottomWidth: 1,
            borderColor: "#f57c00",
            marginVertical: 10,
          }}
        />

        <Text style={{ marginVertical: 10, fontWeight: "bold", fontSize: 18 }}>
          {goalProgress.progress.toLocaleString(LOCALE)} /{" "}
          {goalProgress.goal.target.value.toLocaleString(LOCALE)}{" "}
          {goalProgress.goal.target.unit}
        </Text>

        <TextInput
          placeholder="Progress to add (e.g: 5 000)"
          value={progressValue === 0 ? "" : progressValue.toString()}
          onChangeText={(text) => {
            const hasDigits = /\d+$/.test(text)
            if (text.length <= 0 || !hasDigits) {
              setProgressValue(0)
              return
            }
            setProgressValue(Number.parseInt(text, 10))
          }}
          style={[
            styles.spacing,
            {
              width: "80%",
            },
          ]}
          mode="outlined"
          keyboardType="numeric"
        />

        {goalProgress.progress > 0 && progressValue > 0 ? (
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            {goalProgress.progress.toLocaleString()} +{" "}
            {progressValue.toLocaleString()} = {progressTotal.toLocaleString()}{" "}
            {goalProgress.goal.target.unit}
          </Text>
        ) : (
          <></>
        )}

        <Button
          mode="contained"
          onPress={handleSave}
          loading={habitGoalProgressUpdate.state === "loading"}
          disabled={
            habitGoalProgressUpdate.state === "loading" || progressValue === 0
          }
          style={[styles.spacing, { width: "80%" }]}
        >
          Save Progress ✨
        </Button>

        <View
          style={{
            width: "100%",
            borderBottomWidth: 1,
            borderColor: "#f57c00",
            marginVertical: 10,
          }}
        />

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            margin: 15,
          }}
        >
          Progress History
        </Text>

        <ScrollView
          style={{
            width: "100%",
            marginVertical: 20,
          }}
        >
          {goalProgresses.map((habitProgress, index) => {
            if (!habitProgress.goalProgress.isNumeric()) {
              return <></>
            }

            return (
              <View
                key={habitProgress.id + index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderBottomWidth: 1,
                  borderColor: "#f57c00",
                  width: "100%",
                }}
              >
                <Text>
                  {habitProgress.date.toLocaleDateString(LOCALE, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
                <Text>
                  {habitProgress.goalProgress.progress.toLocaleString(LOCALE)}{" "}
                  {habitProgress.goalProgress.goal.target.unit}
                </Text>
              </View>
            )
          })}
        </ScrollView>
      </View>

      <Snackbar
        visible={isVisibleSnackbar}
        onDismiss={onDismissSnackbar}
        duration={2_000}
      >
        ✅ Habit Saved successfully!
      </Snackbar>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginVertical: 16,
  },
})
