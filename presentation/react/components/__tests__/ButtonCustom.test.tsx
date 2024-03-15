import renderer from "react-test-renderer"

import { ButtonCustom } from "@/presentation/react/components/ButtonCustom"

describe("<ButtonCustom />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<ButtonCustom>Awesome Button!</ButtonCustom>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
