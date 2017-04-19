import React from 'react'
import styled from 'styled-components'

export const Editor = styled.aside`
  background-color: whitesmoke;
  background: whitesmoke;
  display: inline-block;
  overflow: auto;
  text-align: left;
  vertical-align: top;
  height: 100%;
  width: 340px;

  position: fixed;
  top: 0;
  bottom: 0;
  overflow: auto;

  h1 {
    text-align: center;
  }
`

const InputContainer = styled.div`
  padding: ${props => props.inner ? '10px 0 15px 15px' : '10px 30px 15px' };
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

const InputListItem = styled.div`
  cursor: pointer;
  padding: 10px 12px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`

export const EditorInputContainer = ({ children, name, list, onAdd }) => (
  <InputContainer>
    <InputTitle>{name}</InputTitle>
    {children}
    {list
      ? <InputContainer onClick={onAdd}>
        <div>Add Item</div>
      </InputContainer>
      : <div></div>
    }
  </InputContainer>
)

export const EditorInputListItem = ({ children, name, expanded, onClick, showAsList }) => (
  <div>
    {!showAsList && <InputListItem onClick={onClick}>- {name}</InputListItem>}
    {(expanded || showAsList) && (
      showAsList
        ? <div>{children}</div>
        : (
          <InputContainer indent={showAsList}>
            {children}
          </InputContainer>
        )
    )}
  </div>
)

export const EditorInput = ({ name, value, inner, onChange }) => (
  <InputContainer inner={inner}>
    {name && <InputTitle>{name}</InputTitle>}
    <Input value={value} onChange={onChange} />
  </InputContainer>
)

export const Iframe = styled.iframe`
  display: inline-block;
  height: 100vh;
  width: calc(100% - 340px);
  vertical-align: top;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 340px;
  right: 0;
  overflow: scroll;
`
