import React from "react"
import { RichText } from "prismic-reactjs"
import linkResolver from "../../utils/linkResolver"

interface Props {
  slice: any
}

const SolutionText: React.FC<Props> = ({ slice }) => (
  <div>{RichText.render(slice.primary.question_text, linkResolver)}</div>
)

export default SolutionText
