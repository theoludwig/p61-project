import { SafeAreaView } from "react-native-safe-area-context"

import { HabitsStatistics } from "@/presentation/react-native/components/HabitsStatistics"
import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"

const StatisticsPage: React.FC = () => {
  const { habitsTracker } = useHabitsTracker()

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "white",
        },
      ]}
    >
      <HabitsStatistics habitsTracker={habitsTracker} />
    </SafeAreaView>
  )
}

export default StatisticsPage
