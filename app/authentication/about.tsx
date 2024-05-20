import { Button } from "react-native-paper"
import { useRouter } from "expo-router"

import { About } from "@/presentation/react-native/components/About"

const AboutPage: React.FC = () => {
  const router = useRouter()

  return (
    <About
      actionButton={
        <Button
          mode="contained"
          labelStyle={{ fontSize: 18 }}
          onPress={() => {
            router.push("/authentication/login")
          }}
        >
          Get Started 🚀
        </Button>
      }
    />
  )
}

export default AboutPage
