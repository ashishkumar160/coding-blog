import React from "react"
import Editor from "../Editor"

interface Props {
  slice: any
}

const SolutionCode: React.FC<Props> = ({ slice }) => (
  <div>
    <Editor initValue={slice.primary.solution_code[0].text} />
  </div>
)

export default SolutionCode
