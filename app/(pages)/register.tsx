import { StyleSheet, Image } from "react-native"
import {
  Button,
  TextInput,
  HelperText,
  ActivityIndicator as _ActivityIndicator,
  Banner,
} from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import * as React from "react"

const RegisterPage: React.FC = () => {
  const regexEmail = /^[\w.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,4}$/

  const [password, setPassword] = React.useState<string>("")
  const [isPasswordCorrect, setIsPasswordCorrect] =
    React.useState<boolean>(true)
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true)

  return (
    <SafeAreaView style={styles.container}>
      <Banner
        visible
        actions={[
          {
            label: "Report this problem",
            onPress: () => {
              return console.log("Pressed")
            },
          },
        ]}
        icon={({ size }) => {
          return (
            <Image
              source={{
                uri: "https://avatars3.githubusercontent.com/u/17571969?s=400&v=4",
              }}
              style={{
                width: size,
                height: size,
              }}
            />
          )
        }}
      >
        There was an error while trying to register.
      </Banner>
      <TextInput label="Pseudo" mode="outlined" style={styles.input} />
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => {
          setIsEmailValid(regexEmail.test(text))
        }}
      />
      {isEmailValid ? null : (
        <HelperText type="error" visible style={styles.errorText}>
          Email address is invalid!
        </HelperText>
      )}
      <TextInput
        label="Password"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => {
          setPassword(text)
          console.log(text)
        }}
      />
      <TextInput
        label="Confirm password"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => {
          setIsPasswordCorrect(text === password)
        }}
      />
      <HelperText type="error" visible style={styles.errorText}>
        Error message
      </HelperText>
      <Button
        mode="contained"
        onPress={() => {
          return console.log(isPasswordCorrect ? "Pressed" : "Error")
        }}
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
    margin: 10,
  },
  errorText: {
    margin: 10,
  },
})

export default RegisterPage
