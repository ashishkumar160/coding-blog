import React from "react"
import "./editor.css"

interface Props {
  initValue: string
}

interface State {
  value: string
  params: string
  result: string
  editorInstance: any
  monacoInstance: any
  loading: boolean
}

class Editor extends React.Component<Props, State> {
  containerElement: HTMLDivElement | null = null

  state = {
    value: this.props.initValue,
    params: "",
    result: "",
    editorInstance: null,
    monacoInstance: null,
    loading: false,
  }

  getResult() {
    if (this.state.loading) {
      return <div className="loader"></div>
    }
    return <>{this.state.result}</>
  }

  componentDidMount() {
    import("monaco-editor").then(monaco => {
      if (this.containerElement) {
        const editor = monaco.editor.create(this.containerElement, {
          value: this.props.initValue,
          language: "typescript",
          theme: "vs-dark",
        })
        editor.onDidChangeModelContent(() => {
          this.setState({ value: editor.getValue() })
        })
        this.setState({ editorInstance: editor, monacoInstance: monaco })
      }
    })
  }

  render() {
    return (
      <div style={{ display: `flex` }}>
        <div
          ref={component => (this.containerElement = component)}
          style={{
            width: `500px`,
            height: `400px`,
          }}
          className="react-monaco-editor-container"
        />
        <button
          style={{
            margin: `auto`,
            width: `fit-content`,
            height: `fit-content`,
          }}
          onClick={async () => {
            this.setState({ loading: true })
            if (
              this.state.monacoInstance != null &&
              this.state.editorInstance != null
            ) {
              const worker = await this.state.monacoInstance.languages.typescript.getTypeScriptWorker()
              const model = this.state.editorInstance.getModel()
              if (model) {
                const client = await worker(model.uri)
                const result = await client.getEmitOutput(model.uri.toString())
                try {
                  const javascriptResult = eval(
                    `(${result.outputFiles[0].text})(${this.state.params})`
                  )
                  this.setState({ result: javascriptResult + "" })
                } catch (e) {
                  this.setState({ result: e.message })
                } finally {
                  this.setState({ loading: false })
                }
              }
            } else {
              this.setState({ result: "Please try again!" })
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
          Parameters:
          <input
            style={{
              height: `50%`,
              margin: `10px`,
            }}
            type="text"
            value={this.state.params}
            onChange={e => this.setState({ params: e.target.value })}
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
            {this.getResult()}
          </div>
        </div>
      </div>
    )
  }
}

export default Editor
