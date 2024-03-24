import { Controller, useForm } from "react-hook-form"
import { StyleSheet } from "react-native"
import { Button, HelperText, TextInput } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import type { UserLoginData } from "@/domain/entities/User"
import { useAuthentication } from "@/presentation/react/contexts/Authentication"

const LoginPage: React.FC = () => {
  const { login, authenticationPresenter } = useAuthentication()

  const { control, handleSubmit } = useForm<UserLoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: unknown): Promise<void> => {
    await authenticationPresenter.login(data)
  }

  return (
    <SafeAreaView style={[styles.container]}>
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
        type="error"
        visible={login.state === "error"}
        style={[styles.helperText]}
      >
        Invalid credentials.
      </HelperText>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={login.state === "loading"}
        disabled={login.state === "loading"}
      >
        Login
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

export default LoginPage
