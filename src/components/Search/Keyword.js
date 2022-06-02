import React from "react";
import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
import { Dispatch } from "react";
import { delKeyword } from "../../store/keyword";
import { useDispatch } from "react-redux";


const Keyword = ({ text, id, setText, inputRef }) => {
  const dispatch = useDispatch();
  
  return (
    <KeywordContainer>
      <KeywordText onClick={(e) => {
        setText(text);
        inputRef.current.focus();
      }}>
        {text}
      </KeywordText>
      <CloseBtn>
        <AiOutlineDelete size={20} onClick={() => dispatch(delKeyword(id))}/>
      </CloseBtn>
    </KeywordContainer>
  )
}

export default Keyword;

const KeywordContainer = styled.li`
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`
const KeywordText = styled.h3`
  font-weight: bold;
  cursor: pointer;
`

const CloseBtn = styled.span`
  color: red;
  padding-top: .2rem;
  cursor: pointer;
` 