import { Button, Text } from "react-native-paper"
import { View } from "react-native"

import { About } from "@/presentation/react-native/components/About"
import { useAuthentication } from "@/presentation/react/contexts/Authentication"

const SettingsPage: React.FC = () => {
  const { logout, authenticationPresenter, user } = useAuthentication()

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
      footer={
        <View
          style={{
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Currenty logged in as
          </Text>
          <Text
            style={{
              marginTop: 6,
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {user?.displayName}
          </Text>
        </View>
      }
    />
  )
}

export default SettingsPage
