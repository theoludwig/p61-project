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
    </Tabs>
  )
}

export default TabLayout
