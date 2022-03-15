import React from "react";
import styled from 'styled-components';
import Card from "./Card";
import { useSelector } from 'react-redux';

function  SearchCard({ apiData }) {
  const { loading, data, error } = useSelector(state => state.keywordReducer);
  if(loading) return <Loading>Loading....</Loading>

  return (
    <SearchCardContainer>
      {
        data ? data.map(item => (
          <Card key={item.id} url={item.url} likes={item.likes}/>
        )) : null
      }
    </SearchCardContainer>
  )
}

export default  SearchCard;

const SearchCardContainer = styled.div`
  /* display: grid;
  grid-template-columns: repeat(5, 1fr); */

  @media (max-width: 2000px) {
    -webkit-column-count: 5;
    -webkit-column-gap: 0;
    -moz-column-count: 5;
    -moz-column-gap: 0;
    column-count: 5;
    column-gap: 0;
  }

  @media (max-width: 1150px) {
    -webkit-column-count: 4;
    -webkit-column-gap: 0;
    -moz-column-count: 4;
    -moz-column-gap: 0;
    column-count: 4;
    column-gap: 0;
  }

  @media (max-width: 900px) {
    -webkit-column-count: 3;
    -webkit-column-gap: 0;
    -moz-column-count: 3;
    -moz-column-gap: 0;
    column-count: 3;
    column-gap: 0;
  }

  @media (max-width: 650px) {
    -webkit-column-count: 2;
    -webkit-column-gap: 0;
    -moz-column-count: 2;
    -moz-column-gap: 0;
    column-count: 2;
    column-gap: 0;
  
  }

  @media (max-width: 440px) {
    -webkit-column-count: 1;
    -webkit-column-gap: 0;
    -moz-column-count: 1;
    -moz-column-gap: 0;
    column-count: 1;
    column-gap: 0;
  }
`

const Loading = styled.div`
  display: flex;
  font-size: 5rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`