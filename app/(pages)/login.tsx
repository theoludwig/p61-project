import { StyleSheet, Image } from "react-native"
import {
  Button,
  TextInput,
  HelperText,
  ActivityIndicator,
  Banner,
} from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import * as React from "react"

const LoginPage: React.FC = () => {
  // Gérer l'état de votre formulaire ici : timeout, invalidité, etc.
  // Possible de changer le type comme string.
  const [hasError, _sethasError] = React.useState<boolean>(true)

  // Message d'erreur à afficher pour HelperText
  const [errorMessage, _setErrorMessage] =
    React.useState<string>("Error message")

  // Affichage de l'indicateur de chargement
  const [isPerfomingLogin, _setIsPerfomingLogin] = React.useState<boolean>(true)

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
        There was an error while trying to login.
      </Banner>
      <TextInput label="Email" mode="outlined" style={styles.input} />
      <TextInput label="Password" mode="outlined" style={styles.input} />
      <HelperText type="error" visible={hasError} style={styles.errorText}>
        {errorMessage}
      </HelperText>
      <Button
        mode="contained"
        onPress={() => {
          return console.log("Pressed")
          // TODO: Implement login logic
        }}
      >
        Login
      </Button>
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
