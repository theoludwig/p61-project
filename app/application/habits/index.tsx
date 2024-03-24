import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import { FlatList, StyleSheet } from "react-native"
import { List } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"
import { colorsPresenter } from "@/presentation/presenters/utils/ColorsPresenter"

const HabitsPage: React.FC = () => {
  const { habitsTracker } = useHabitsTracker()

  return (
    <SafeAreaView style={[styles.container]}>
      <List.Section style={[styles.habitsList]}>
        <FlatList
          data={habitsTracker.habitsHistory}
          renderItem={({ item }) => {
            const { habit } = item

            return (
              <List.Item
                title={habit.name}
                style={[
                  styles.habitItem,
                  {
                    backgroundColor: colorsPresenter.hexToRgbA(
                      habit.color,
                      0.4,
                    ),
                  },
                ]}
                contentStyle={[
                  {
                    paddingLeft: 12,
                  },
                ]}
                titleStyle={[
                  {
                    fontSize: 18,
                  },
                ]}
                left={() => {
                  return (
                    <FontAwesome6
                      size={24}
                      name={habit.icon}
                      style={[styles.habitItemIcon]}
                    />
                  )
                }}
              />
            )
          }}
        />
      </List.Section>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  habitsList: {
    width: "90%",
  },
  habitItem: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  habitItemIcon: {
    width: 30,
  },
})

export default HabitsPage
