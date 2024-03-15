import type { StyleProp, ViewStyle } from "react-native"
import { Pressable, StyleSheet, Text } from "react-native"

export interface ButtonCustomProps
  extends React.ComponentProps<typeof Pressable> {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export const ButtonCustom: React.FC<ButtonCustomProps> = (props) => {
  const { children, style, ...rest } = props

  return (
    <Pressable style={[styles.button, style]} {...rest}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#152B5D",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
})
