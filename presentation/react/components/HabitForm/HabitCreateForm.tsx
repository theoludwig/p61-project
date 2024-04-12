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
import { useHabitsTracker } from "../../contexts/HabitsTracker"
import { useBoolean } from "../../hooks/useBoolean"
import { IconSelectorModal } from "./IconSelectorModal"

export interface HabitCreateFormProps {
  user: User
}

export const HabitCreateForm: React.FC<HabitCreateFormProps> = ({ user }) => {
  const { habitCreate, habitsTrackerPresenter } = useHabitsTracker()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
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
                      width: "90%",
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
                  style={[{ width: "90%" }]}
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
                  {/* <Tooltip
                    title="Routine habits are activities performed regularly, while Target habits involve setting specific objectives to be achieved through repeated actions."
                    enterTouchDelay={50}
                    leaveTouchDelay={25}
                  >
                    <IconButton
                      icon="chat-question-outline"
                      selected
                      size={24}
                      onPress={() => {}}
                      style={{ alignSelf: "center" }}
                    />
                  </Tooltip> */}
                </Text>
                <SegmentedButtons
                  style={[{ width: "90%" }]}
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

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <ColorPicker
                style={[styles.spacing, { width: "90%" }]}
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
                  marginVertical: 30,
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
          disabled={habitCreate.state === "loading"}
          style={[styles.spacing, { width: "100%" }]}
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
    marginVertical: 16,
  },
})
