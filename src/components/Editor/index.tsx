import React, { useState } from "react"
import MonacoEditor from "react-monaco-editor"
import "./editor.css"

interface Props {
  initValue: string
}

const Editor: React.FC<Props> = ({ initValue }) => {
  const [value, setValue] = useState(initValue)
  const [params, setParams] = useState("")
  const [result, setResult] = useState("")
  const [editorInstance, setEditor] = useState()
  const [monacoInstance, setMonaco] = useState()
  const [loading, setLoading] = useState(false)

  const getResult = () => {
    if (loading) {
      return <div className="loader"></div>
    }
    return <>{result}</>
  }

  return (
    <div
      style={{
        display: `flex`,
      }}
    >
      <MonacoEditor
        width="500"
        height="400"
        language="typescript"
        theme="vs-dark"
        value={value}
        onChange={(newValue, e) => setValue(newValue)}
        editorDidMount={(editor, monaco) => {
          setEditor(editor)
          setMonaco(monaco)
        }}
      />
      <button
        style={{
          margin: `auto`,
          width: `fit-content`,
          height: `fit-content`,
        }}
        onClick={async () => {
          setLoading(true)
          const worker = await monacoInstance.languages.typescript.getTypeScriptWorker()
          const model = editorInstance.getModel()
          if (model) {
            const client = await worker(model.uri)
            const result = await client.getEmitOutput(model.uri.toString())
            try {
              const javascriptResult = eval(
                `(${result.outputFiles[0].text})(${params})`
              )
              setResult(javascriptResult + "")
            } catch (e) {
              setResult(e.message)
            } finally {
              setLoading(false)
            }
          }
        }}
      >
        Run
      </button>
      <div
        style={{
          width: `33%`,
          display: `flex`,
          flexDirection: `column`,
        }}
      >
        Paramters:
        <input
          style={{
            height: `50%`,
            margin: `10px`,
          }}
          type="text"
          value={params}
          onChange={e => setParams(e.target.value)}
        ></input>
        Output:
        <div
          style={{
            color: `white`,
            backgroundColor: `black`,
            height: `50%`,
            margin: `10px`,
          }}
        >
          {getResult()}
        </div>
      </div>
    </div>
  )
}

export default Editor
