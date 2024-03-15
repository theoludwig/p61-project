import { StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SettingsPage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Settings</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default SettingsPage
