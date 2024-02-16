import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const HomePage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>P61 Project</Text>

      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Canterbury",
    fontSize: 36,
    color: "#006CFF",
    marginVertical: 20,
  },
})

export default HomePage
