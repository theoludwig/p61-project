import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"
import React from "react"

/**
 * @see https://icons.expo.fyi/
 * @param props
 * @returns
 */
const TabBarIcon: React.FC<{
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
}> = (props) => {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

const TabLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="home" color={color} />
          },
        }}
      />
      <Tabs.Screen
        name="newHabit"
        options={{
          title: "New Habit",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="plus-square" color={color} />
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="history" color={color} />
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="cog" color={color} />
          },
        }}
      />
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
