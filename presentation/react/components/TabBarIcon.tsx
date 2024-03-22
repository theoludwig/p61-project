import FontAwesome from "@expo/vector-icons/FontAwesome"

/**
 * @see https://icons.expo.fyi/
 * @param props
 * @returns
 */
export const TabBarIcon: React.FC<{
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
}> = (props) => {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}
