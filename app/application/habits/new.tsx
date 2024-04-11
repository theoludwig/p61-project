import { HabitCreateForm } from "@/presentation/react/components/HabitCreateForm/HabitCreateForm"
import { useAuthentication } from "@/presentation/react/contexts/Authentication"

const NewHabitPage: React.FC = () => {
  const { user } = useAuthentication()

  if (user == null) {
    return null
  }

  return <HabitCreateForm user={user} />
}

export default NewHabitPage
