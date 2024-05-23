import { View } from "react-native"
import { Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

import { ExternalLink } from "@/presentation/react-native/ui/ExternalLink"
import { getVersion } from "@/utils/version"

export interface AboutProps {
  actionButton: React.ReactNode
  footer?: React.ReactNode
}

export const About: React.FC<AboutProps> = (props) => {
  const { actionButton, footer } = props

  const version = getVersion()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 28,
            textAlign: "center",
          }}
        >
          Habits Tracker
        </Text>

        <Text
          style={{
            marginTop: 6,
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          To perform at work and in everyday life.
        </Text>

        <Text
          style={{
            marginTop: 6,
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          v{version}
        </Text>
      </View>

      <Text variant="bodyLarge" style={{ textAlign: "center" }}>
        <ExternalLink href="https://unistra.fr" style={{ color: "#006CFF" }}>
          Université de Strasbourg
        </ExternalLink>
      </Text>
      <Text variant="bodyLarge" style={{ textAlign: "center" }}>
        BUT Informatique - IUT Robert Schuman
      </Text>
      <Text variant="bodyLarge" style={{ textAlign: "center" }}>
        P61 Mobile Development
      </Text>

      {footer}

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        {actionButton}
      </View>
    </SafeAreaView>
  )
}
