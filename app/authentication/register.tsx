import { Controller, useForm } from "react-hook-form"
import { StyleSheet } from "react-native"
import { Button, HelperText, TextInput } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useMemo } from "react"

import type { UserRegisterData } from "@/domain/entities/User"
import { useAuthentication } from "@/presentation/react/contexts/Authentication"

const RegisterPage: React.FC = () => {
  const { register, authenticationPresenter } = useAuthentication()

  const { control, handleSubmit } = useForm<UserRegisterData>({
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: unknown): Promise<void> => {
    await authenticationPresenter.register(data)
  }

  const helperMessage = useMemo(() => {
    if (register.state === "error") {
      if (register.errors.fields.includes("displayName")) {
        return "Display Name is required."
      }
      if (register.errors.fields.includes("email")) {
        return "Invalid email."
      }
      if (register.errors.fields.includes("password")) {
        return "Password must be at least 6 characters."
      }
      return "Invalid credentials."
    }

    // if (register.state === "success") {
    //   return "Success! Please verify your email."
    // }

    return ""
  }, [register.errors.fields, register.state])

  return (
    <SafeAreaView style={[styles.container]}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              placeholder="Display Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input]}
              mode="outlined"
            />
          )
        }}
        name="displayName"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input]}
              mode="outlined"
            />
          )
        }}
        name="email"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input]}
              mode="outlined"
              secureTextEntry
            />
          )
        }}
        name="password"
      />

      <HelperText
        type={register.state === "error" ? "error" : "info"}
        visible={register.state === "error" || register.state === "success"}
        style={[styles.helperText]}
      >
        {helperMessage}
      </HelperText>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={register.state === "loading"}
        disabled={register.state === "loading"}
      >
        Register
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
  },
  helperText: {
    fontSize: 18,
    marginVertical: 20,
  },
})

export default RegisterPage
