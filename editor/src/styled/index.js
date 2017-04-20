import React from 'react'
import styled from 'styled-components'
import URemoveIcon from 'react-icons/lib/md/remove-circle'
import ExpandMoreIcon from 'react-icons/lib/md/expand-more'
import ExpandLessIcon from 'react-icons/lib/md/expand-less'
import URightIcon from 'react-icons/lib/md/chevron-right'
import UInfoIcon from 'react-icons/lib/md/info'

const dimensions = {
  width: 340,
  editorFooter: 65
}

export const EditorContainer = styled.div`
  transform: ${props => props.isOnboarding ? 'scale(0.9);' : 'scale(1);'}
  transition: transform 0.3s linear;
  display: relative;
  height: 100vh;
  width: 100%;
`

export const Editor = styled.aside`
  background-color: whitesmoke;
  background: whitesmoke;
  display: inline-block;
  overflow: auto;
  text-align: left;
  vertical-align: top;
  height: 100%;

  padding-bottom: ${props => dimensions.editorFooter}px;
  width: ${props => props.maximized ? '100%' : '0' };

  @media (min-width: 768px) {
    width: ${props => props.maximized ? '100%' : dimensions.width + 'px'};
  }

  position: fixed;
  top: 0;
  bottom: 0;
  overflow: auto;

  h1 {
    text-align: center;
  }
`

const InputContainer = styled.div`
  padding: ${props => props.inner ? '5px 0 7px 7px' : '5px 15px 7px' };
  ${props => props.indent && 'padding-left: 30px;'}

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`

const InputTitle = styled.div`
  margin-bottom: 6px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
`

const Input = styled.input`
  font-size: 16px;
  padding: 10px 12px;
  width: 100%;
`

const TextArea = styled.textarea`
  border: 0;
  font-size: 16px;
  padding: 10px 12px;
  width: 100%;
`

const InputListItem = styled.div`
  cursor: pointer;
  padding: 10px 12px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  & svg {
  }
`

const SRemoveIcon = styled(({topLevel, ...props}) => <URemoveIcon {...props} />)`
  position: absolute;
  right: ${props => props.topLevel ? '0px': '-20px'};
  top: ${props => props.topLevel ? '12px': '23px'};
  color: red;
  cursor: pointer;
  float: right;
`

export const EditorInputContainer = ({ children, name, list, onAdd, inner }) => (
  <InputContainer inner={inner}>
    <InputTitle>{name}</InputTitle>
    {children}
    {list
      ? <InputContainer onClick={onAdd}>
        <div style={{ cursor: 'pointer' }}>Add Item</div>
      </InputContainer>
      : <div></div>
    }
  </InputContainer>
)

export class EditorInputListItem extends React.Component {
  render () {
    const { children, name, showAsList, onToggleExpand, onRemove, expanded } = this.props

    return (
      <div style={{ position: 'relative' }}>
        {!showAsList && <InputListItem onClick={onToggleExpand}>
            { expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            {name}<SRemoveIcon onClick={onRemove} data-item-remove='true' topLevel/>
          </InputListItem>
        }
        {(expanded || showAsList) && (
          showAsList
            ? <div style={{ position: 'relative' }}><SRemoveIcon onClick={onRemove} data-item-remove='true' />{children}</div>
            : (
              <InputContainer indent={showAsList}>
                {children}
              </InputContainer>
            )
        )}
      </div>
    )
  }
}

export const EditorInput = ({ name, value, inner, onChange, metadata }) => (
  <InputContainer inner={inner}>
    {name && <InputTitle>{name}</InputTitle>}
    {metadata === 'text'
      ? <TextArea value={value} onChange={onChange} rows='4' />
      : <Input value={value} onChange={onChange} />
    }
  </InputContainer>
)

const Container = styled.div`
  background-color: white;
  border-top: 1px solid #DCDCDC;
  bottom: 0;
  font-size: 14px;
  height: ${props => dimensions.editorFooter + 'px'};
  left: 0;
  padding: 15px;
  position: fixed;
  right: 0;

  width: ${props => props.maximized ? '100%' : dimensions.width + 'px'};
`

export const EditorFooter = ({ maximized }) => (
  <Container maximized={maximized}>
    <div>Riyu & Riyu Editor © 2017</div>
    <div>by <a href='//twitter.com/Secretmapper'>@secretmapper</a></div>

  </Container>
)

const FloatingControlContainer = styled.div`
  background-color: whitesmoke;
  border-radius: 0 15px 15px 0;
  box-shadow: 0 1px 2px #aaa;
  cursor: pointer;
  display: inline-block;
  position: relative;
  padding-left: 5px;
  margin-top: 10px;

  svg {
    font-size: 2rem;
  }
`

export const FloatingControl = ({ onToggleMaximize, onToggleInfo, floatToRight }) => (
  <div>
    <div>
      <FloatingControlContainer onClick={onToggleMaximize} floatToRight>
        <URightIcon />
      </FloatingControlContainer>
    </div>
    <div>
      <FloatingControlContainer onClick={onToggleInfo} floatToRight>
        <UInfoIcon />
      </FloatingControlContainer>
    </div>
  </div>
)

export const Iframe = styled.iframe`
  background-color: white;
  display: inline-block;
  height: 100vh;
  vertical-align: top;

  width: ${props => props.minimized ? '0%' : '100%' };

  @media (min-width: 768px) {
    left: ${props => dimensions.width + 'px'};
    width: ${props => props.minimized ? '0%' : 'calc(100% - ' + dimensions.width + 'px)' };
  }

  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: scroll;
`
