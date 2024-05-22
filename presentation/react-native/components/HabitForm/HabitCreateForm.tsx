import type { IconName } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { ScrollView, StyleSheet, View } from "react-native"
import {
  Button,
  HelperText,
  SegmentedButtons,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import ColorPicker, {
  HueSlider,
  Panel1,
  Preview,
} from "reanimated-color-picker"

import type { GoalFrequency, GoalType } from "@/domain/entities/Goal"
import { GOAL_FREQUENCIES, GOAL_TYPES } from "@/domain/entities/Goal"
import type { HabitCreateData } from "@/domain/entities/Habit"
import { HabitCreateSchema } from "@/domain/entities/Habit"
import type { User } from "@/domain/entities/User"
import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"
import { useBoolean } from "@/presentation/react/hooks/useBoolean"
import { IconSelectorModal } from "./IconSelectorModal"

export interface HabitCreateFormProps {
  user: User
}

export const HabitCreateForm: React.FC<HabitCreateFormProps> = ({ user }) => {
  const { habitCreate, habitsTrackerPresenter } = useHabitsTracker()

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<HabitCreateData>({
    mode: "onChange",
    resolver: zodResolver(HabitCreateSchema),
    defaultValues: {
      userId: user.id,
      name: "",
      color: "#006CFF",
      icon: "circle-question",
      goal: {
        frequency: "daily",
        target: {
          type: "boolean",
        },
      },
    },
  })

  const watchGoalType = watch("goal.target.type")

  const [isVisibleSnackbar, setIsVisibleSnackbar] = useState(false)

  const {
    value: isModalIconSelectorVisible,
    setTrue: openModalIconSelector,
    setFalse: closeModalIconSelector,
  } = useBoolean()

  const onDismissSnackbar = (): void => {
    setIsVisibleSnackbar(false)
  }

  const onSubmit = async (data: HabitCreateData): Promise<void> => {
    await habitsTrackerPresenter.habitCreate(data)
    setIsVisibleSnackbar(true)
    closeModalIconSelector()
    reset()
  }

  const habitFrequenciesTranslations: {
    [key in GoalFrequency]: { label: string; icon: string }
  } = {
    daily: {
      label: "Daily",
      icon: "calendar",
    },
    weekly: {
      label: "Weekly",
      icon: "calendar-week",
    },
    monthly: {
      label: "Monthly",
      icon: "calendar-month",
    },
  }

  const habitTypesTranslations: {
    [key in GoalType]: { label: string; icon: string }
  } = {
    boolean: {
      label: "Routine",
      icon: "clock",
    },
    numeric: {
      label: "Target",
      icon: "target",
    },
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <>
                <TextInput
                  placeholder="Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={[
                    styles.spacing,
                    {
                      width: "96%",
                    },
                  ]}
                  mode="outlined"
                />
                {errors.name != null ? (
                  <HelperText type="error" visible style={[{ paddingTop: 0 }]}>
                    {errors.name.type === "too_big"
                      ? "Name is too long"
                      : "Name is required"}
                  </HelperText>
                ) : null}
              </>
            )
          }}
          name="name"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <Text style={[styles.spacing]}>Habit Frequency</Text>
                <SegmentedButtons
                  style={[{ width: "96%" }]}
                  onValueChange={onChange}
                  value={value}
                  buttons={GOAL_FREQUENCIES.map((frequency) => {
                    return {
                      label: habitFrequenciesTranslations[frequency].label,
                      value: frequency,
                      icon: habitFrequenciesTranslations[frequency].icon,
                    }
                  })}
                />
              </>
            )
          }}
          name="goal.frequency"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <Text
                  style={[
                    styles.spacing,
                    { justifyContent: "center", alignContent: "center" },
                  ]}
                >
                  Habit Type
                </Text>
                <SegmentedButtons
                  style={[{ width: "96%" }]}
                  onValueChange={onChange}
                  value={value}
                  buttons={GOAL_TYPES.map((type) => {
                    return {
                      label: habitTypesTranslations[type].label,
                      value: type,
                      icon: habitTypesTranslations[type].icon,
                    }
                  })}
                />
              </>
            )
          }}
          name="goal.target.type"
        />

        {watchGoalType === "numeric" ? (
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              gap: 10,
              width: "96%",
            }}
          >
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <TextInput
                    placeholder="Target (e.g: 5 000)"
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      if (text.length <= 0) {
                        onChange("")
                        return
                      }
                      onChange(Number.parseInt(text, 10))
                    }}
                    value={value?.toString()}
                    style={[
                      styles.spacing,
                      {
                        width: "50%",
                      },
                    ]}
                    mode="outlined"
                    keyboardType="numeric"
                  />
                )
              }}
              name="goal.target.value"
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <TextInput
                    placeholder="Unit (e.g: Steps)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[
                      styles.spacing,
                      {
                        width: "50%",
                      },
                    ]}
                    mode="outlined"
                  />
                )
              }}
              name="goal.target.unit"
            />
          </View>
        ) : null}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <ColorPicker
                style={[{ marginVertical: 15, width: "96%" }]}
                value={value}
                onComplete={(value) => {
                  onChange(value.hex)
                }}
              >
                <Preview hideInitialColor />
                <Panel1 />
                <HueSlider />
              </ColorPicker>
            )
          }}
          name="color"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 20,
                  marginVertical: 5,
                }}
              >
                <FontAwesomeIcon size={36} icon={value as IconName} />
                <Button mode="contained" onPress={openModalIconSelector}>
                  Choose an icon
                </Button>

                <IconSelectorModal
                  key={isModalIconSelectorVisible ? "visible" : "hidden"}
                  isVisible={isModalIconSelectorVisible}
                  selectedIcon={value}
                  handleCloseModal={closeModalIconSelector}
                  onIconSelect={onChange}
                />
              </View>
            )
          }}
          name="icon"
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={habitCreate.state === "loading"}
          disabled={habitCreate.state === "loading" || !isValid}
          style={[{ width: "100%", marginVertical: 15 }]}
        >
          Create your habit! 🚀
        </Button>
      </ScrollView>

      <Snackbar
        visible={isVisibleSnackbar}
        onDismiss={onDismissSnackbar}
        duration={2_000}
      >
        ✅ Habit created successfully!
      </Snackbar>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginVertical: 10,
  },
})
