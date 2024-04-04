import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  Appbar,
  Button,
  HelperText,
  SegmentedButtons,
  TextInput,
} from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import ColorPicker, {
  HueSlider,
  Panel1,
  Preview,
} from "reanimated-color-picker"

import type { HabitCreateData } from "@/domain/entities/Habit"
import { HabitCreateSchema } from "@/domain/entities/Habit"
import type { User } from "@/domain/entities/User"
import type { GoalFrequency, GoalType } from "@/domain/entities/Goal"
import { GOAL_FREQUENCIES, GOAL_TYPES } from "@/domain/entities/Goal"
import { capitalize } from "@/presentation/presenters/utils/strings"

export interface HabitCreateFormProps {
  user: User
}

export const HabitCreateForm: React.FC<HabitCreateFormProps> = ({ user }) => {
  // const {createHabit, habitPresenter} = useHabitCreate()

  const onSubmit = async (data: HabitCreateData): Promise<void> => {
    // await habitPresenter.createHabit(data)
    console.log(data)
  }

  const frequenciesIcons: {
    [key in GoalFrequency]: string
  } = {
    daily: "calendar",
    weekly: "calendar-week",
    monthly: "calendar-month",
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HabitCreateData>({
    mode: "onChange",
    resolver: zodResolver(HabitCreateSchema),
    defaultValues: {
      userId: user.id,
      name: "",
      color: "#006CFF",
      icon: "lightbulb",
      goal: {
        frequency: "daily",
        target: {
          type: "boolean",
        },
      },
    },
  })

  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content
          title="New Habit"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </Appbar.Header>

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
                style={[styles.input]}
                mode="outlined"
              />
              {errors.name != null ? (
                <HelperText type="error" visible>
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
              style={{ width: "70%" }}
              value={value}
              onChange={(value) => {
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
              style={[styles.input]}
              mode="outlined"
            />
          )
        }}
        name="icon"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <SegmentedButtons
              onValueChange={onChange}
              value={value}
              buttons={GOAL_FREQUENCIES.map((frequency) => {
                return {
                  label: capitalize(frequency),
                  value: frequency,
                  icon: frequenciesIcons[frequency],
                }
              })}
            />
          )
        }}
        name="goal.frequency"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <SegmentedButtons
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
          )
        }}
        name="goal.target.type"
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        // loading={createHabit.state === "loading"}
        // disabled={createHabit.state === "loading"}
      >
        Create your habit
      </Button>
    </SafeAreaView>
  )
}

const styles = {
  input: {
    margin: 8,
  },
}
