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
        name="habits/new"
        options={{
          title: "New Habit",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="plus-square" color={color} />
          },
        }}
      />
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
        name="habits/history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="history" color={color} />
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
      <Tabs.Screen
        name="authentication/login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="sign-in" color={color} />
          },
        }}
      />
      <Tabs.Screen
        name="authentication/register"
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
