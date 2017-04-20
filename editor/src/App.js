import React from 'react';
import { List, fromJS } from 'immutable';
import './App.css';
import liquid from 'tinyliquid';
import tpl from 'templates/index.html';
import meta from './metadata';
import data, { toLiquid, isString, isKeyed, isIndexed, getScrollTop } from './data';
import { EditorContainer, Editor, EditorInputContainer, EditorInputListItem, EditorInput, EditorFooter, FloatingControl, Iframe } from './styled';
import Button from './Button';
import Onboarding from './Onboarding';
import UUID from 'node-uuid';
import debounce from 'debounce';
import { preloadZip, generateZip } from './zip';
import paths from './util/paths';

const render = liquid.compile(tpl);

const partials = {}

class App extends React.PureComponent {
  state = {
    html: '',
    data,
    uimeta: {
      expanded: {}
    },
    onboarding: true,
    isEditorMaximized: false
  }

  componentDidMount () {
    preloadZip()
    this._updateRiyuTemplate()

    this.updateRiyuTemplate = debounce(this._updateRiyuTemplate, 200)
  }

  onStart = _ => {
    this.setState({ onboarding: false })
  }

  _updateRiyuTemplate = () => {
    const context = liquid.newContext({ locals: toLiquid(this.state.data) })
    context.onInclude((name, callback) => {
      const key = `${paths.templates}/${name}`

      const load = () => {
        const ast = liquid.parse(partials[key])
        callback(null, ast)
      }

      fetch(key)
        .then((resp) => {
          return resp.text()
        })
        .then((body) => {
          partials[key] = body
          load()
        })
    })

    render(context, (err) => {
      if (err) console.error(err)

      this.setState({ html: context.getBuffer() }, this.onIframeLoad)
    })
  }

  // TODO: this is a hack, there should be a way to find out
  // when the iframe can be scrolled
  onIframeLoad () {
    const iframeWindow = this.iframe.contentWindow
    window.setTimeout(
      _ => iframeWindow.scrollTo(0, this.scrollTop),
      50
    )
  }

  changeData = (v) => {
    const iframeWindow = this.iframe.contentWindow
    const scrollTop = getScrollTop(iframeWindow)

    // window.x = iframeWindow
    this.scrollTop = scrollTop

    this.setState({ data: v }, this.updateRiyuTemplate)
  }

  setIn = path => e => {
    this.changeData(this.state.data.setIn(path, e.target.value))
  }

  onExpand = key => e => {
    this.setState(
      { uimeta: { expanded: { ...this.state.uimeta.expanded, [key]: !this.state.uimeta.expanded[key] } } }
    )
  }

  addItem = (path, metadata) => e => {
    this.changeData(
      this.state.data.updateIn(path, arr => {
        if (arr && arr.size > 0) {
          return metadata === 'string' || metadata === 'text'
            ? arr.push('')
            : arr.push(arr.get(0).set('__key', UUID.v4()))
        } else {
          return metadata === 'string' || metadata === 'text'
            ? new List([''])
            : new List([fromJS(metadata)])
        }
      })
    )
  }

  removeItem = (path) => e => {
    this.changeData(this.state.data.deleteIn(path))
  }

  onToggleMaximize = _ => {
    this.setState(({ isEditorMaximized }) => ({ isEditorMaximized: !isEditorMaximized }))
  }

  onShowInfo = _ => {
    this.setState({ onboarding: true })
  }

  onCompile = _ => {
    generateZip(this.state.html, toLiquid(this.state.data))
  }

  generateInput = (data, metadata, path, inner = false) => {
    if (isString(data)) {
      return (
        <EditorInput
          key={path}
          metadata={metadata}
          value={data}
          inner={inner}
          onChange={this.setIn([...path])}
        />
      )
    }

    const keys = metadata ? Array.from(metadata.keys()) : data.keySeq().toArray()

    return keys.map(prop => {
      let value = data.get(prop)

      if (isKeyed(value)) {
        return (
          <EditorInputContainer key={prop} name={prop} inner={inner}>
            {this.generateInput(value, metadata.get(prop), [...path, prop], true)}
          </EditorInputContainer>
        )
      }
      else if (isIndexed(value) || isIndexed(metadata.get(prop))) {
        if (value === undefined) {
          value = []
        }

        const newMetadata = metadata.get(prop) ? metadata.get(prop)[0] : null

        return (
          <EditorInputContainer
            key={prop}
            name={prop}
            inner={inner}
            onAdd={this.addItem([...path, prop], newMetadata)}
            list
          >
            {value.map((obj, i) => {
              const newPath = [...path, prop, i]
              const key = obj.get ? obj.get('__key') : newPath.join('.')
              const justString = isString(obj)

              let name = `${prop} ${i}`
              if (obj.get) {
                name = obj.get('name') || obj.get('title') || name
              }

              return (
                <EditorInputListItem
                  expanded={this.state.uimeta.expanded[key]}
                  onToggleExpand={this.onExpand(key)}
                  key={key}
                  showAsList={justString}
                  name={name}
                  onRemove={this.removeItem(newPath)}
                >
                  {this.generateInput(obj, newMetadata, newPath, true)}
                </EditorInputListItem>
              )
            })}
          </EditorInputContainer>
        )
      }
      else {
        return (
          <EditorInput
            key={prop}
            name={prop}
            value={value}
            inner={inner}
            metadata={metadata.get(prop)}
            onChange={this.setIn([...path, prop])}
          />
        )
      }
    })
  }

  render() {
    return (
      <div>
        <EditorContainer isOnboarding={this.state.onboarding}>
          <Editor maximized={this.state.isEditorMaximized}>
            <h1>Riyu Editor</h1>
            {this.state.data ? this.generateInput(this.state.data, meta, []) : <div></div>}
            <Button onClick={this.onCompile}>Compile & Download</Button>
            <EditorFooter maximized={this.state.isEditorMaximized} />
          </Editor>
          <Iframe
            minimized={this.state.isEditorMaximized}
            innerRef={iframe => { this['iframe'] = iframe }}
            srcDoc={this.state.html}
            height='100%'
            width='100%'
            frameBorder='0'
          />
          <FloatingControl
            floatToRight={this.state.isEditorMaximized}
            onToggleMaximize={this.onToggleMaximize}
            onToggleInfo={this.onShowInfo}
          />
        </EditorContainer>
        <Onboarding onStart={this.onStart} show={this.state.onboarding} />
      </div>
    );
  }
}

export default App;
