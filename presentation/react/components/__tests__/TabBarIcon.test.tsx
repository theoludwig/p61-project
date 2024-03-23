import renderer from "react-test-renderer"

import { TabBarIcon } from "@/presentation/react/components/TabBarIcon"

describe("<TabBarIcon />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<TabBarIcon name="info" color="black" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
