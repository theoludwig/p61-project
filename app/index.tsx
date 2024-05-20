import { Redirect } from "expo-router"

import { useAuthentication } from "@/presentation/react/contexts/Authentication"

const HomePage: React.FC = () => {
  const { user } = useAuthentication()

  if (user == null) {
    return <Redirect href="/authentication/about" />
  }

  return <Redirect href="/application/habits/" />
}

export default HomePage
