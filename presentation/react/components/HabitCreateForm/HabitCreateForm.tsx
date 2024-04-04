import { useForm } from "react-hook-form"
import { Appbar } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import type { HabitCreateData } from "@/domain/entities/Habit"
import type { User } from "@/domain/entities/User"

export interface HabitCreateFormProps {
  user: User
}

export const HabitCreateForm: React.FC<HabitCreateFormProps> = ({ user }) => {
  useForm<HabitCreateData>({
    // const { control, handleSubmit, setValue } = useForm<HabitCreateData>({
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
      {/* <Controller></Controller> */}
    </SafeAreaView>
  )
}
