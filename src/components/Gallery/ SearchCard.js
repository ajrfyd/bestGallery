import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import Card from "./Card";
import { useSelector, useDispatch } from 'react-redux';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { searchData, getPage } from '../../store/keyword';
import Pagination from "./Pagination";
import Loading from "../Loading/Loading";
import { useQuery, useInfiniteQuery } from 'react-query'
import utils from "../../utils";
import axios from "axios";

const SearchCard = () => {
  const { loading, error, pageNum, keyword } = useSelector(state => state.keywordReducer);
  const targetRef = useRef(null);
  
  // // !!Infinite practice 
  const reqData = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`https://api.unsplash.com/search/photos?page=${pageParam}&query=${keyword}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
    // console.log(data);
    console.log(pageParam);
    return {
      result: data.results,
      next: pageParam + 1
    }
  };

  const { data, error: error2, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery(
    [keyword],
    reqData,
    {
      getNextPageParam: (lastPage) => {
        if(lastPage && lastPage.next) {
          return lastPage.next;
        }
      }
    }
  )

  const onIntersect = (entries, observer) => {
    if(!entries[0].isIntersecting) return;
    entries[0].isIntersecting && fetchNextPage();
  }

  utils.useObserver({
    target: targetRef,
    onIntersect
  })
  
  // console.log(data);
  // !!
  if(loading) return <Loading hasMargin/>

  return (
    <>
      {
        status === 'success' && data.pages.map((data, idx) => (
          <SearchCardContainer key={idx}>
            {
              data.result.map(item => (
                <img src={item.urls.small} alt="" key={item.id}/>
              ))
            }
          </SearchCardContainer>
        ))
      }
      <div ref={targetRef}/>
      {
        isFetchingNextPage && <Loading />
      }
      {
        status === 'error' && <div>ErroR!!!!</div>
      }
    </>
  )
}

export default  SearchCard;

const SearchCardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  /* grid-template-columns: repeat(5, 1fr); */
  gap: 10px;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  & + & {
    margin-top: 1rem;
  }
`

