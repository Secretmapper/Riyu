import React from 'react';
import Immutable, { fromJS } from 'immutable';
import './App.css';
import liquid from 'tinyliquid';
import tpl from 'templates/index.html';
import meta from './metadata';
import data from 'data';
import { Editor, EditorInputContainer, EditorInputListItem, EditorInput, Iframe } from './styled';

const partials = {}

const render = liquid.compile(tpl);

class App extends React.PureComponent {
  state = {
    html: '',
    data: fromJS(data),
    uimeta: {
      expanded: {}
    }
  }

  componentDidMount () {
    this.updateRiyuTemplate()
  }

  updateRiyuTemplate = () => {
    const context = liquid.newContext({ locals: this.state.data.toJS() })
    context.onInclude((name, callback) => {
      const key = `src/templates/${name}`

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
      this.setState({ html: context.getBuffer() })
    })
  }

  changeData = (v) => {
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

  addItem = path => e => {
    // this.changeData(this.state.data.updateIn(path, arr => arr.push(data[path[0]])))
  }

  generateInput = (data, metadata, path, inner = false) => {
    const isString = v => isVarTypeOf(v, String)
    const isKeyed = Immutable.Iterable.isKeyed
    const isIndexed = Immutable.Iterable.isIndexed

    const c = this.changeData

    if (isString(data)) {
      return <EditorInput key={path} value={data} inner={inner} onChange={this.setIn([...path])} />
    }

    const keys = metadata ? Array.from(metadata.keys()) : data.keySeq().toArray()
    if (path[0] === 'projects') {
      // console.log(keys)
    }

    return keys.map(prop => {
      const value = data.get(prop)

      if (prop === 'projects') {
        // console.log(prop, isIndexed(value))
      }

      if (isKeyed(value)) {
        return (
          <EditorInputContainer key={prop} name={prop} inner={inner}>
            {this.generateInput(value, metadata.get(prop), [...path, prop], true)}
          </EditorInputContainer>
        )
      }
      else if (isIndexed(value)) {
        const newMetadata = metadata.get(prop) ? metadata.get(prop)[0] : null

        return (
          <EditorInputContainer key={prop} name={prop} inner={inner} onAdd={this.addItem([...path, prop])} list>
            {value.map((obj, i) => {
              const newPath = [...path, prop, i]
              const key = newPath.join('.')
              const justString = isString(obj)

              return (
                <EditorInputListItem
                  key={key}
                  expanded={this.state.uimeta.expanded[key]}
                  showAsList={justString}
                  name={`${prop} ${i}`}
                  onClick={this.onExpand(key)}
                >
                  {this.generateInput(obj, newMetadata, newPath, true)}
                </EditorInputListItem>
              )
            })}
          </EditorInputContainer>
        )
      }
      else {
        return <EditorInput key={prop} name={prop} value={value} inner={inner} onChange={this.setIn([...path, prop])} />
      }
    })
  }

  render() {
    return (
      <div>
        <Editor>
          <h1>Riyu Editor</h1>
          {this.state.data ? this.generateInput(this.state.data, meta, []) : <div></div>}
        </Editor>
        <Iframe srcDoc={this.state.html} height='100%' width='100%' frameBorder='0' />
      </div>
    );
  }
}

export default App;

function isVarTypeOf(_var, _type) {
  try {
    return _var.constructor === _type;
  } catch(ex) {
    return false;         //fallback for null or undefined
  }
}
