import { useState } from "react"
import { Image, StyleSheet } from "react-native"
import {
  ActivityIndicator,
  Banner,
  Button,
  HelperText,
  TextInput,
} from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

const LoginPage: React.FC = () => {
  const [hasError, _sethasError] = useState<boolean>(true)

  const [errorMessage, _setErrorMessage] = useState<string>("Error message")

  const [isPerfomingLogin, _setIsPerfomingLogin] = useState<boolean>(true)

  return (
    <SafeAreaView style={styles.container}>
      <Banner
        visible
        actions={[
          {
            label: "Report this problem",
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
        There was an error while trying to login.
      </Banner>
      <TextInput label="Email" mode="outlined" style={styles.input} />
      <TextInput label="Password" mode="outlined" style={styles.input} />
      <HelperText type="error" visible={hasError} style={styles.errorText}>
        {errorMessage}
      </HelperText>
      <Button mode="contained">Login</Button>
      <ActivityIndicator
        animating={isPerfomingLogin}
        color="blue"
        size="large"
        style={styles.indicator}
      />
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
  errorText: {
    marginBottom: 10,
  },
  indicator: {
    marginTop: 10,
    marginBottom: 10,
  },
})

export default LoginPage
