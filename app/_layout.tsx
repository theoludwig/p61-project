import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper"
import { StatusBar } from "expo-status-bar"

import CanterburyFont from "../assets/fonts/Canterbury.ttf"
import GeoramFont from "../assets/fonts/Georama-Black.ttf"
import SpaceMonoFont from "../assets/fonts/SpaceMono-Regular.ttf"

export { ErrorBoundary } from "expo-router"

export const unstableSettings = {
  initialRouteName: "index",
}

SplashScreen.preventAutoHideAsync().catch((error) => {
  console.error(error)
})

const RootLayout: React.FC = () => {
  const [loaded, error] = useFonts({
    Georama: GeoramFont,
    SpaceMono: SpaceMonoFont,
    Canterbury: CanterburyFont,
  })

  useEffect(() => {
    if (error != null) {
      throw error
    }
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch((error) => {
        console.error(error)
      })
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <PaperProvider
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: "#f57c00",
          secondary: "#fbc02d",
        },
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(pages)" />
      </Stack>

      <StatusBar style="dark" />
    </PaperProvider>
  )
}

export default RootLayout
