import React from "react";
import styled from 'styled-components';
import Keyword from "./Keyword";
import { AiOutlineCloseCircle } from 'react-icons/ai';


function History({ setOnHistory, keywords, deleteKeyword, setText, inputRef }) {
  return (
    <HistoryContainer>
      <Header>
        <Title>검색 기록</Title>
        <AiOutlineCloseCircle onClick={() => setOnHistory(false)}/>
      </Header>
      <ListContainer>
        {
          keywords.map(keyword => <Keyword key={keyword.id} text={keyword.text} deleteKeyword={deleteKeyword} id={keyword.id} setText={setText} inputRef={inputRef}/>) 
        }
      </ListContainer>
    </HistoryContainer>
  )
}

export default History;

const HistoryContainer = styled.div`
  padding: 1rem;
  position: absolute;
  width: 100%;
  top: 4rem;
  z-index: 1;
  background-color: #ddd;
  border-radius: 10px;
  transition: .5s; 
`

const Header = styled.div`
  overflow: hidden;
  border-bottom: 1px dotted #000;
  padding-bottom: .5rem;
  display: flex;
  justify-content: space-between;

  & svg {
    color: #000;
    font-size: 1.2rem;
    cursor: pointer;
  }
`

const Title = styled.span`
  font-weight: bold;
`

const ListContainer = styled.ul`
  margin: 10px 0;
  
`
