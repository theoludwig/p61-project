import renderer from "react-test-renderer"

import { MonoText } from "@/presentation/react/components/MonoText"

describe("<MonoText />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<MonoText>Awesome text!</MonoText>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
