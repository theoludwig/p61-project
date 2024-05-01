import type { IconName } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { memo } from "react"
import { View } from "react-native"
import { ActivityIndicator, IconButton, Text } from "react-native-paper"

export interface IconsListProps {
  selectedIcon?: string
  possibleIcons: string[]
  isLoading?: boolean
  handleIconSelect: (icon: string) => void
}

const IconsListWithoutMemo: React.FC<IconsListProps> = (props) => {
  const {
    selectedIcon,
    possibleIcons,
    isLoading = false,
    handleIconSelect,
  } = props

  if (possibleIcons.length <= 0) {
    return (
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text>No results found</Text>
        )}
      </View>
    )
  }

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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

export const IconsList = memo(IconsListWithoutMemo)
