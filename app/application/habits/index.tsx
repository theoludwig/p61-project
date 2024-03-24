import { SafeAreaView } from "react-native-safe-area-context"
import { ActivityIndicator } from "react-native-paper"

import { HabitsHistory } from "@/presentation/react/components/HabitsHistory/HabitsHistory"
import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"

const HabitsPage: React.FC = () => {
  const { habitsTracker, retrieveHabitsTracker } = useHabitsTracker()

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent:
            retrieveHabitsTracker.state === "loading" ? "center" : "flex-start",
        },
      ]}
    >
      {retrieveHabitsTracker.state === "loading" ? (
        <ActivityIndicator animating size="large" />
      ) : (
        <HabitsHistory habitsHistory={habitsTracker.habitsHistory} />
      )}
    </SafeAreaView>
  )
}

export default HabitsPage
