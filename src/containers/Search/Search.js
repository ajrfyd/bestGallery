import React from "react";
import styled from 'styled-components';
import SearchBar from "../../components/Search/SearchBar";

const Search = ({ setSearchState }) => {

  return (
    <SearchContainer>
      <SearchBar setSearchState={setSearchState} />
    </SearchContainer>
  )
}

export default Search;

const SearchContainer = styled.div`
  height: 4rem;
  display: flex;
  padding: .5rem 1rem;
  /* border-bottom: 1px solid #000; */
  box-shadow: 0 1px 5px rgba(0, 0, 0, .3);
`