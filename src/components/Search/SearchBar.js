import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { BiSearchAlt2, BiHome } from 'react-icons/bi';
import { searchData } from '../../store/keyword';
import { useDispatch } from 'react-redux';
import History from "./History";
// 수정 필요
// 로컬스토리지 -> 기간 설정, 
// 스토리지 삭제

// TODO: use arrow functions
// TODO: use variable name starts with 'is' for boolean types
function SearchBar({ setSearchState }) {
  const [text, setText] = useState('');
  const [onHistory, setOnHistory] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [keywords, setKeywords] = useState(
    // TODO: use try / catch block
    JSON.parse(localStorage.getItem('keywords') || '[]'),
  )

  useEffect(() => {
    // TODO: use try / catch block
    localStorage.setItem('keywords', JSON.stringify(keywords))
  }, [keywords])


  const saveKeyword = (keyword) => {
    const newKeyword = {
      id: Date.now(),
      text: keyword,
    }
    setKeywords([newKeyword, ...keywords])
  }

  const deleteKeyword = (id, text) => {
    const removed = keywords.filter(keyword => keyword.id !== id);
    setKeywords(removed);
    // TODO: setItem 없이 removeItem 만 호출하는 이유 확인
    localStorage.removeItem(text)
  }

  const search = async (e) => {
    e.preventDefault();
    if(text === '') {
      alert('검색어를 입력하지 않았습니다.')
      return
    }
    setOnHistory(false);

    const hasKeyword = keywords.find(item => item.text === text);
    if(!hasKeyword) {
      saveKeyword(text)
    }
    dispatch(searchData(text))
    setSearchState(true);
  }

  const getText = (e) => {
    setText(e.target.value);
  }

  return (
    <SearchBarContainer>
      <FormContainer onSubmit={(e) => search(e)}>
        <HomeIcon>
          <BiHome className="home" size={45} onClick={() => {
            setText('');
            setOnHistory(false);
            setSearchState(false);
          }}/>
        </HomeIcon>
        <Input placeholder="Search" value={text} onChange={getText} onClick={() => setOnHistory(true)} ref={inputRef}/>
        {/* TODO: use button tag */}
        <SearchIcon>
          <BiSearchAlt2 size={50} onClick={search}/>
        </SearchIcon>
      </FormContainer>
      {
        onHistory && (
          <History 
            setOnHistory={setOnHistory} 
            keywords={keywords} 
            deleteKeyword={deleteKeyword} 
            setText={setText}
            inputRef={inputRef}
          />
        )
      }
    </SearchBarContainer>
  )
}

export default SearchBar;

const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  flex: 1;
  border-radius: 30px;
  outline: none;
  padding: .3rem 1rem 0 1rem;
  border: 2px solid transparent;
  background-color: #ddd;
  color: #000;
  font-size: 1.2rem;

  &:focus {
    border: 2px solid red;
  }

  &::placeholder {
    color: #000;
    font-family: var(--font-base);
    font-weight: bold;
    font-size: 1.4rem;
  }
`

const SearchIcon = styled.div`
  margin: .3rem 1rem 0 2rem;
  cursor: pointer;
`

const HomeIcon = styled.span`
  & .home {
    margin-right: .5rem;
    cursor: pointer;
  }
`
