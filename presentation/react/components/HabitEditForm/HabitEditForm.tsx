import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { ScrollView, StyleSheet } from "react-native"
import { Button, HelperText, Snackbar, TextInput } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import ColorPicker, {
  HueSlider,
  Panel1,
  Preview,
} from "reanimated-color-picker"

import type { Habit, HabitEditData } from "@/domain/entities/Habit"
import { HabitEditSchema } from "@/domain/entities/Habit"
import { useHabitsTracker } from "../../contexts/HabitsTracker"

export interface HabitEditFormProps {
  habit: Habit
}

export const HabitEditForm: React.FC<HabitEditFormProps> = ({ habit }) => {
  const { habitEdit, habitsTrackerPresenter } = useHabitsTracker()

  const {
    control,
    handleSubmit,
    formState: { errors },
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
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <TextInput
                placeholder="Icon"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[styles.spacing, { width: "90%" }]}
                mode="outlined"
              />
            )
          }}
          name="icon"
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={habitEdit.state === "loading"}
          disabled={habitEdit.state === "loading"}
          style={[styles.spacing, { width: "90%" }]}
        >
          Save
        </Button>
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
