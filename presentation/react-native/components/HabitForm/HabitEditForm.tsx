import type { IconName } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { ScrollView, StyleSheet, View } from "react-native"
import {
  Button,
  HelperText,
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

import type { Habit, HabitEditData } from "@/domain/entities/Habit"
import { HabitEditSchema } from "@/domain/entities/Habit"
import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"
import { useBoolean } from "@/presentation/react/hooks/useBoolean"
import { IconSelectorModal } from "./IconSelectorModal"

export interface HabitEditFormProps {
  habit: Habit
}

export const HabitEditForm: React.FC<HabitEditFormProps> = ({ habit }) => {
  const { habitEdit, habitStop, habitsTrackerPresenter } = useHabitsTracker()

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<HabitEditData>({
    mode: "onChange",
    resolver: zodResolver(HabitEditSchema),
    defaultValues: {
      id: habit.id,
      userId: habit.userId,
      name: habit.name,
      color: habit.color,
      icon: habit.icon,
    },
  })

  const {
    value: isModalIconSelectorVisible,
    setTrue: openModalIconSelector,
    setFalse: closeModalIconSelector,
  } = useBoolean()

  const [isVisibleSnackbar, setIsVisibleSnackbar] = useState(false)

  const onDismissSnackbar = (): void => {
    setIsVisibleSnackbar(false)
  }

  const onSubmit = async (data: HabitEditData): Promise<void> => {
    await habitsTrackerPresenter.habitEdit(data)
    setIsVisibleSnackbar(true)
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
              <ColorPicker
                style={[styles.spacing, { width: "96%" }]}
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
          loading={habitEdit.state === "loading"}
          disabled={habitEdit.state === "loading" || !isValid}
          style={[styles.spacing, { width: "96%" }]}
        >
          Save
        </Button>

        {habit.endDate == null ? (
          <Button
            mode="outlined"
            onPress={async () => {
              await habitsTrackerPresenter.habitStop(habit)
            }}
            loading={habitStop.state === "loading"}
            disabled={habitStop.state === "loading"}
            style={[styles.spacing, { width: "96%" }]}
          >
            🛑 Stop Habit (effective tomorrow)
          </Button>
        ) : (
          <Text
            style={{
              textAlign: "center",
              marginVertical: 20,
              fontSize: 20,
            }}
          >
            🛑 The habit has been stopped! (No further progress can be saved)
          </Text>
        )}
      </ScrollView>

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
