import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"

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
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(pages)" />
    </Stack>
  )
}

export default RootLayout
