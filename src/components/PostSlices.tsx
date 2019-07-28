import React from "react"
import SolutionText from "./slices/SolutionText"
import SolutionCode from "./slices/SolutionCode"

interface Props {
  slices: any
}

const PostSlices: React.FC<Props> = ({ slices }) => {
  return slices.map((slice: any, index: number) => {
    const res = (() => {
      switch (slice.type) {
        case "solution_text":
          return (
            <div key={index}>
              <SolutionText slice={slice} />
            </div>
          )
        case "solution_code":
          return (
            <div key={index}>
              <SolutionCode slice={slice} />
            </div>
          )
        default:
          return
      }
    })()
    return res
  })
}

export default PostSlices
