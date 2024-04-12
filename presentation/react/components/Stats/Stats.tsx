import { SafeAreaView } from "react-native-safe-area-context"
import { Card, Text } from "react-native-paper"

export const Stats: React.FC = () => {
  return (
    <SafeAreaView>
      <Text> {"Statistique"} </Text>

      <Card mode="outlined">
        <Card.Title title="Current Streak" />
        <Card.Content>
          <Text variant="bodyMedium">nbDays Sucess that follow</Text>
        </Card.Content>
      </Card>
      <Card mode="outlined">
        <Card.Title title="Sucess" />
        <Card.Content>
          <Text variant="bodyMedium">nbDays Sucess</Text>
        </Card.Content>
      </Card>
      <Card mode="outlined">
        <Card.Title title="Failed" />
        <Card.Content>
          <Text variant="bodyMedium">nbDays Fail</Text>
        </Card.Content>
      </Card>
      <Card mode="outlined">
        <Card.Title title="Card Title" />
        <Card.Content>
          <Text variant="bodyMedium">CardContent</Text>
        </Card.Content>
      </Card>
    </SafeAreaView>
  )
}
