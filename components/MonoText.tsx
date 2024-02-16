import { StyleSheet, Text } from "react-native"

export const MonoText: React.FC<Text["props"]> = (props) => {
  const { style, ...rest } = props

  return <Text style={[style, styles.text]} {...rest} />
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "SpaceMono",
  },
})
