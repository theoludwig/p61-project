import { Stats } from "@/presentation/react/components/Stats/Stats"
import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"

const StatsPage: React.FC = () => {
  const { habitsTracker } = useHabitsTracker()

  return <Stats habitsTracker={habitsTracker} />
}

export default StatsPage
