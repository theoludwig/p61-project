import { Redirect, Tabs } from "expo-router"
import React from "react"

import { TabBarIcon } from "@/presentation/react-native/ui/TabBarIcon"
import { useAuthentication } from "@/presentation/react/contexts/Authentication"

const TabLayout: React.FC = () => {
  const { user } = useAuthentication()

  if (user != null) {
    return <Redirect href="/application/habits/" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="sign-in" color={color} />
          },
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="user-plus" color={color} />
          },
        }}
      />
    </Tabs>
  )
}

export default TabLayout
