import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, List, Modal, Portal, TextInput } from "react-native-paper"

import { HabitIconList } from "./HabitIconList"
export interface HabitIconSelectorModalProps {
  visible?: boolean
  value: string
  onDismiss: () => void
  onSelect: (icon: string) => void
  onPress: () => void
}

interface SearchInputProps {
  searchText: string
  handleSearch: (text: string) => void
}

library.add(fas)

const iconNames = Object.keys(fas).map((key) => {
  return fas[key]?.iconName ?? ""
})

const findIconsInLibrary = (icon: string): string[] => {
  return iconNames
    .filter((name, index, self) => {
      return name.includes(icon) && self.indexOf(name) === index
    })
    .slice(0, 20)
}

const SearchInputWithoutMemo: React.FC<SearchInputProps> = (props) => {
  const { searchText, handleSearch } = props
  return (
    <TextInput label="Search" value={searchText} onChangeText={handleSearch} />
  )
}

const SearchInput = memo(SearchInputWithoutMemo)

export const HabitIconSelectorModal: React.FC<HabitIconSelectorModalProps> = ({
  visible = false,
  value,
  onDismiss,
  onSelect,
  onPress,
}) => {
  const [selectedIcon, setSelectedIcon] = useState<string>()
  const [possibleIcons, setPossibleIcons] = useState<string[]>([])
  const [searchText, setSearchText] = useState<string>(value)
  const [isPending, startTransition] = useTransition()

  const handleSearch = useCallback((text: string): void => {
    setSearchText(text)
  }, [])

  useEffect(() => {
    const delay = setTimeout(() => {
      startTransition(() => {
        setPossibleIcons(findIconsInLibrary(searchText))
      })
    }, 500)
    return () => {
      return clearTimeout(delay)
    }
  }, [searchText, isPending])

  const handleIconSelect = useCallback(
    (icon: string): void => {
      setSelectedIcon(icon)
      onSelect(icon)
    },
    [onSelect],
  )

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
                  <SearchInput
                    searchText={searchText}
                    handleSearch={handleSearch}
                  />
                  <HabitIconList
                    selectedIcon={selectedIcon}
                    possibleIcons={possibleIcons}
                    handleIconSelect={handleIconSelect}
                  />
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
