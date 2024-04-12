import { fas } from "@fortawesome/free-solid-svg-icons"
import { memo, useCallback, useEffect, useState, useTransition } from "react"
import { Modal, ScrollView, View } from "react-native"
import { Button, List, Text, TextInput } from "react-native-paper"
import type { IconName } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { IconsList } from "./IconsList"

export interface IconSelectorModalProps {
  isVisible?: boolean
  selectedIcon?: string
  onIconSelect: (icon: string) => void
  handleCloseModal?: () => void
}

interface SearchInputProps {
  searchText: string
  handleSearch: (text: string) => void
}
const SearchInputWithoutMemo: React.FC<SearchInputProps> = (props) => {
  const { searchText, handleSearch } = props
  return (
    <TextInput label="Search" value={searchText} onChangeText={handleSearch} />
  )
}
const SearchInput = memo(SearchInputWithoutMemo)

const iconNames = Object.keys(fas).map((key) => {
  return fas[key]?.iconName ?? key
})

const findIconsInLibrary = (icon: string): string[] => {
  return iconNames
    .filter((name, index, self) => {
      return name.includes(icon) && self.indexOf(name) === index
    })
    .slice(0, 50)
}

export const IconSelectorModal: React.FC<IconSelectorModalProps> = ({
  isVisible = false,
  selectedIcon,
  onIconSelect,
  handleCloseModal,
}) => {
  const [possibleIcons, setPossibleIcons] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchText, setSearchText] = useState<string>("")
  const [_isPending, startTransition] = useTransition()

  const handleSearch = useCallback((text: string): void => {
    setSearchText(text)
  }, [])

  useEffect(() => {
    const handlePossibleIcons = (): void => {
      startTransition(() => {
        setPossibleIcons(findIconsInLibrary(searchText))
        setIsLoading(false)
      })
    }
    const debounceHandleSearch = setTimeout(handlePossibleIcons, 400)

    return () => {
      return clearTimeout(debounceHandleSearch)
    }
  }, [searchText])

  const handleIconSelect = useCallback(
    (icon: string): void => {
      onIconSelect(icon)
    },
    [onIconSelect],
  )

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            width: "96%",
            height: "99%",
            backgroundColor: "white",
            borderColor: "black",
            borderWidth: 1,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text style={{ marginVertical: 8 }}>Selected Icon:</Text>
            <FontAwesomeIcon size={46} icon={selectedIcon as IconName} />
          </View>
          <SearchInput searchText={searchText} handleSearch={handleSearch} />
          <ScrollView>
            <List.Section title="Choose an icon:">
              <IconsList
                isLoading={isLoading}
                selectedIcon={selectedIcon}
                possibleIcons={possibleIcons}
                handleIconSelect={handleIconSelect}
              />
            </List.Section>
          </ScrollView>
          <View style={{ marginVertical: 15 }}>
            <Button mode="contained" onPress={handleCloseModal}>
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}
