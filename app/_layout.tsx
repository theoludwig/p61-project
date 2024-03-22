import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"

import { HabitsTrackerProvider } from "@/presentation/react/contexts/HabitsTracker"
import {
  AuthenticationProvider,
  useAuthentication,
} from "@/presentation/react/contexts/Authentication"

export { ErrorBoundary } from "expo-router"

export const unstableSettings = {
  initialRouteName: "index",
}

SplashScreen.preventAutoHideAsync().catch((error) => {
  console.error(error)
})

const StackLayout: React.FC = () => {
  const { hasLoaded } = useAuthentication()

  useEffect(() => {
    if (!hasLoaded) {
      SplashScreen.hideAsync().catch((error) => {
        console.error(error)
      })
    }
  }, [hasLoaded])

  if (hasLoaded) {
    return <></>
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

const RootLayout: React.FC = () => {
  return (
    <AuthenticationProvider>
      <HabitsTrackerProvider>
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
          <StackLayout />

          <StatusBar style="dark" />
        </PaperProvider>
      </HabitsTrackerProvider>
    </AuthenticationProvider>
  )
}

export default RootLayout
