import { Stats } from "@/presentation/react/components/Stats/Stats"
import { useAuthentication } from "@/presentation/react/contexts/Authentication"

const StatsPage: React.FC = () => {
  const { user } = useAuthentication()

  if (user == null) {
    return null
  }

  return <Stats />
}

export default StatsPage
