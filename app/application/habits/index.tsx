import { SafeAreaView } from "react-native-safe-area-context"

import { HabitsHistory } from "@/presentation/react/components/HabitsHistory/HabitsHistory"
import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"

const HabitsPage: React.FC = () => {
  const { habitsTracker } = useHabitsTracker()

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          alignItems: "center",
        },
      ]}
    >
      <HabitsHistory habitsHistory={habitsTracker.habitsHistory} />
    </SafeAreaView>
  )
}

export default HabitsPage
