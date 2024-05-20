import { Button } from "react-native-paper"

import { About } from "@/presentation/react-native/components/About"
import { useAuthentication } from "@/presentation/react/contexts/Authentication"

const SettingsPage: React.FC = () => {
  const { logout, authenticationPresenter } = useAuthentication()

  const handleLogout = async (): Promise<void> => {
    await authenticationPresenter.logout()
  }

  return (
    <About
      actionButton={
        <Button
          mode="contained"
          labelStyle={{ fontSize: 18 }}
          onPress={handleLogout}
          loading={logout.state === "loading"}
          disabled={logout.state === "loading"}
        >
          Logout
        </Button>
      }
    />
  )
}

export default SettingsPage
