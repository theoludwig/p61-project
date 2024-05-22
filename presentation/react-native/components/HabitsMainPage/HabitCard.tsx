import type { IconName } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Link, useRouter } from "expo-router"
import type LottieView from "lottie-react-native"
import { useState } from "react"
import { View } from "react-native"
import { Button, Checkbox, List, Text } from "react-native-paper"

import type { GoalBoolean } from "@/domain/entities/Goal"
import { GoalBooleanProgress } from "@/domain/entities/Goal"
import type { HabitHistory } from "@/domain/entities/HabitHistory"
import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"
import { getColorRGBAFromHex } from "@/utils/colors"
import { getISODate } from "@/utils/dates"

export interface HabitCardProps {
  habitHistory: HabitHistory
  selectedDate: Date
  confettiRef: React.MutableRefObject<LottieView | null>
}

export const HabitCard: React.FC<HabitCardProps> = (props) => {
  const { habitHistory, selectedDate, confettiRef } = props
  const { habit } = habitHistory

  const router = useRouter()
  const { habitsTrackerPresenter } = useHabitsTracker()

  const goalProgress = habitHistory.getGoalProgressByDate(selectedDate)
  const [checked, setChecked] = useState(goalProgress.isCompleted())

  const habitColor = getColorRGBAFromHex({
    hexColor: habit.color,
    opacity: 0.4,
  })

  return (
    <List.Item
      onPress={() => {
        router.push({
          pathname: "/application/habits/[habitId]/",
          params: {
            habitId: habit.id,
          },
        })
      }}
      title={habit.name}
      style={[
        {
          paddingVertical: 20,
          paddingHorizontal: 10,
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: habitColor,
        },
      ]}
      contentStyle={[
        {
          paddingLeft: 12,
        },
      ]}
      titleStyle={[
        {
          fontSize: 18,
        },
      ]}
      left={() => {
        return (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FontAwesomeIcon
              size={24}
              icon={habit.icon as IconName}
              style={[
                {
                  width: 30,
                },
              ]}
            />
          </View>
        )
      }}
      right={() => {
        if (goalProgress.isNumeric()) {
          const href = {
            pathname: "/application/habits/[habitId]/progress/[selectedDate]/",
            params: {
              habitId: habit.id,
              selectedDate: getISODate(selectedDate),
            },
          }
          return (
            <Link href={href}>
              <View>
                <Text>
                  {goalProgress.progress.toLocaleString()} /{" "}
                  {goalProgress.goal.target.value.toLocaleString()}{" "}
                  {goalProgress.goal.target.unit}
                </Text>

                <Button
                  mode="elevated"
                  onPress={() => {
                    router.push(href)
                  }}
                >
                  Edit
                </Button>
              </View>
            </Link>
          )
        }

        return (
          <Checkbox
            color="black"
            status={checked ? "checked" : "unchecked"}
            onPress={async () => {
              const isCheckedNew = !checked
              setChecked(isCheckedNew)
              if (isCheckedNew) {
                confettiRef.current?.play()
              }
              await habitsTrackerPresenter.habitUpdateProgress({
                date: selectedDate,
                habitHistory,
                goalProgress: new GoalBooleanProgress({
                  goal: habit.goal as GoalBoolean,
                  progress: isCheckedNew,
                }),
              })
            }}
          />
        )
      }}
    />
  )
}
