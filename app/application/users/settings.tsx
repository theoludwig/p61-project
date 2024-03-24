import { Text } from "react-native"
import { Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { useAuthentication } from "@/presentation/react/contexts/Authentication"

const SettingsPage: React.FC = () => {
  const { logout, authenticationPresenter } = useAuthentication()

  const handleLogout = async (): Promise<void> => {
    await authenticationPresenter.logout()
  }

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Text>Settings</Text>

      <Button
        mode="contained"
        onPress={handleLogout}
        loading={logout.state === "loading"}
        disabled={logout.state === "loading"}
      >
        Logout
      </Button>
    </SafeAreaView>
  )
}

export default SettingsPage
