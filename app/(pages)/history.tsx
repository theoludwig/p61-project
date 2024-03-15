import { StyleSheet } from "react-native"
import { Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

const History: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        mode="contained"
        onPress={() => {
          return console.log("Pressed")
        }}
      >
        Press me
      </Button>
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

export default History
