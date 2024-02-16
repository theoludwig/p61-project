import renderer from "react-test-renderer"

import HomePage from "@/app/(pages)/index"

describe("<HomePage />", () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    const tree = renderer.create(<HomePage />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
