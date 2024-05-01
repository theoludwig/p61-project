import { Link } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import { Platform } from "react-native"

type LinkProps = React.ComponentProps<typeof Link>

export const ExternalLink: React.FC<
  Omit<LinkProps, "href"> & {
    href: string
  }
> = (props) => {
  const { href, ...rest } = props

  return (
    <Link
      target="_blank"
      href={href as unknown as LinkProps["href"]}
      {...rest}
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          event.preventDefault()
          await WebBrowser.openBrowserAsync(href)
        }
      }}
    />
  )
}
