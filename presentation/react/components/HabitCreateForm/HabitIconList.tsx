import type { IconName } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { memo } from "react"
import { View, StyleSheet } from "react-native"
import { IconButton, Text } from "react-native-paper"

export interface HabitIconListProps {
  selectedIcon?: string
  possibleIcons: string[]
  handleIconSelect: (icon: string) => void
}

const HabitIconListWithoutMemo: React.FC<HabitIconListProps> = (props) => {
  const { selectedIcon, possibleIcons, handleIconSelect } = props
  if (possibleIcons.length > 0) {
    return (
      <View>
        {possibleIcons.map((icon) => {
          return (
            <IconButton
              key={icon}
              containerColor="white"
              icon={({ size }) => {
                return (
                  <FontAwesomeIcon
                    icon={icon as IconName}
                    size={size}
                    color={selectedIcon === icon ? "blue" : "black"}
                  />
                )
              }}
              size={30}
              onPress={() => {
                handleIconSelect(icon)
              }}
            />
          )
        })}
      </View>
    )
  }
  return (
    <View style={styles.noResults}>
      <Text>No results found</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  noResults: {
    marginTop: 20,
    alignItems: "center",
  },
})

export const HabitIconList = memo(HabitIconListWithoutMemo)
