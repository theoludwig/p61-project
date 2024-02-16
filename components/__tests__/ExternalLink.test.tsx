import renderer from "react-test-renderer"

import { ExternalLink } from "@/components/ExternalLink"

describe("<ExternalLink />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ExternalLink href="https://www.unistra.fr/">
          Awesome Link!
        </ExternalLink>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
