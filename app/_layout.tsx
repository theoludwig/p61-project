import { Stack } from "expo-router"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import * as SplashScreen from "expo-splash-screen"
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { HabitsTrackerProvider } from "@/presentation/react/contexts/HabitsTracker"
import {
  AuthenticationProvider,
  useAuthentication,
} from "@/presentation/react/contexts/Authentication"

export { ErrorBoundary } from "expo-router"

export const unstableSettings = {
  initialRouteName: "index",
}

library.add(fas)

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
    />
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
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StackLayout />
          </GestureHandlerRootView>

          <StatusBar style="dark" />
        </PaperProvider>
      </HabitsTrackerProvider>
    </AuthenticationProvider>
  )
}

export default RootLayout
