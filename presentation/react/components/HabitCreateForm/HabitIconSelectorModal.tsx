import React, { useState, useEffect } from "react"
import {
  Modal,
  IconButton,
  Portal,
  List,
  Button,
  TextInput,
  Text,
} from "react-native-paper"
import { ScrollView, View, StyleSheet } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import type {
  IconDefinition,
  IconName,
} from "@fortawesome/fontawesome-svg-core"
import { library, findIconDefinition } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

export interface HabitIconSelectorModalProps {
  visible?: boolean
  value: string
  onDismiss: () => void
  onSelect: (icon: string) => void
  onPress: () => void
}

export const HabitIconSelectorModal: React.FC<HabitIconSelectorModalProps> = ({
  visible = false,
  value,
  onDismiss,
  onSelect,
  onPress,
}) => {
  const [selectedIcon, setSelectedIcon] = useState<string>()
  const [possibleIcons, setPossibleIcons] = useState<IconDefinition[]>([])
  const [searchText, setSearchText] = useState<string>(value)

  useEffect(() => {
    setPossibleIcons(findIconsInLibrary(searchText))
  }, [searchText])

  library.add(fas)

  const handleIconSelect = (icon: string): void => {
    setSelectedIcon(icon)
    onSelect(icon)
  }

  const findIconsInLibrary = (icon: string): IconDefinition[] => {
    const iconNames = Object.keys(fas).map((key) => {
      return fas[key]?.iconName ?? ""
    })
    const matchedValue: string[] = iconNames.filter((name) => {
      return name.includes(icon)
    })
    return matchedValue.length > 0
      ? matchedValue.map((name) => {
          return findIconDefinition({
            prefix: "fas",
            iconName: name as IconName,
          })
        })
      : []
  }

  return (
    <>
      <Button onPress={onPress}>Click to open icon list</Button>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContent}
      >
        <Portal>
          <View>
            <ScrollView style={styles.scrollView}>
              <List.Section title="Select an icon">
                <View style={styles.iconContainer}>
                  <TextInput
                    label="Search"
                    value={searchText}
                    onChangeText={(text) => {
                      return setSearchText(text)
                    }}
                  />
                  {possibleIcons.length > 0 ? (
                    <View>
                      {possibleIcons.map((icon) => {
                        return (
                          <IconButton
                            key={icon.iconName}
                            containerColor="white"
                            icon={({ size }) => {
                              return (
                                <FontAwesomeIcon
                                  icon={icon}
                                  size={size}
                                  color={
                                    selectedIcon === icon.iconName
                                      ? "blue"
                                      : "black"
                                  }
                                />
                              )
                            }}
                            size={30}
                            onPress={() => {
                              handleIconSelect(icon.iconName)
                            }}
                          />
                        )
                      })}
                    </View>
                  ) : (
                    <View style={styles.noResults}>
                      <Text>No results found</Text>
                    </View>
                  )}
                </View>
              </List.Section>
            </ScrollView>
          </View>
        </Portal>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  scrollView: {
    maxHeight: 10000,
    maxWidth: 5000,
  },
  noResults: {
    marginTop: 20,
    alignItems: "center",
  },
})
