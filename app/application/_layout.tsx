import { Redirect, Tabs } from "expo-router"
import React from "react"

import { TabBarIcon } from "@/presentation/react/components/TabBarIcon"
import { useAuthentication } from "@/presentation/react/contexts/Authentication"

const TabLayout: React.FC = () => {
  const { user } = useAuthentication()

  if (user == null) {
    return <Redirect href="/authentication/login" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="habits/index"
        options={{
          headerShown: false,
          title: "Habits",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="sticky-note" color={color} />
          },
        }}
      />
      <Tabs.Screen
        name="habits/new"
        options={{
          title: "New Habit",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="plus-square" color={color} />
          },
        }}
      />
      <Tabs.Screen
        name="habits/[habitId]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="habits/stats"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="line-chart" color={color} />
          },
        }}
      />
      <Tabs.Screen
        name="users/settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="cog" color={color} />
          },
        }}
      />
    </Tabs>
  )
}

export default TabLayout
