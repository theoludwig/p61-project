import { SafeAreaView } from "react-native-safe-area-context"
import { ActivityIndicator, Button, Text } from "react-native-paper"

import { HabitsMainPage } from "@/presentation/react/components/HabitsMainPage/HabitsMainPage"
import { useHabitsTracker } from "@/presentation/react/contexts/HabitsTracker"
import { useAuthentication } from "@/presentation/react/contexts/Authentication"

const HabitsPage: React.FC = () => {
  const { habitsTracker, retrieveHabitsTracker, habitsTrackerPresenter } =
    useHabitsTracker()

  const { user } = useAuthentication()

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent:
            retrieveHabitsTracker.state === "loading" ||
            retrieveHabitsTracker.state === "error"
              ? "center"
              : "flex-start",
        },
      ]}
    >
      {retrieveHabitsTracker.state === "loading" ? (
        <ActivityIndicator animating size="large" />
      ) : retrieveHabitsTracker.state === "error" ? (
        <>
          <Text variant="titleLarge">
            Error: There was an issue while retrieving habits, please try again
            later.
          </Text>
          <Button
            mode="contained"
            style={{
              marginTop: 16,
              width: 150,
              height: 40,
            }}
            onPress={async () => {
              if (user === null) {
                return
              }
              await habitsTrackerPresenter.retrieveHabitsTracker({
                userId: user.id,
              })
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Retry
            </Text>
          </Button>
        </>
      ) : (
        <HabitsMainPage habitsTracker={habitsTracker} />
      )}
    </SafeAreaView>
  )
}

export default HabitsPage
