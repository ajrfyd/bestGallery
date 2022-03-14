import React from "react";
import styled from 'styled-components';
import { BiSearchAlt2 } from 'react-icons/bi';

function SearchBar() {

  return (
    <>
      <Input placeholder="Search"/>
      <SearchIcon>
        <BiSearchAlt2 size={50} onClick={() => alert('hi?')}/>
      </SearchIcon>
    </>
  )
}

export default SearchBar;

const Input = styled.input`
  width: 100%;
  flex: 1;
  border-radius: 30px;
  outline: none;
  padding: .3rem 1rem 0 1rem;
  border: none;
  background-color: #ddd;

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