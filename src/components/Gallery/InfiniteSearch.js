import React, { useState, useEffect, useRef, useMemo, useCallback, forwardRef } from "react";
import styled from 'styled-components';
import Card from "./Card";
import Loading from "../Loading/Loading";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from 'react-query';
import { useSelector } from "react-redux";
import axios from "axios";
import useInfiniteScroll from './infiniteScroll';

const InfiniteSearch = () => {
  const [page, setPage] = useState(1);
  const { pageNum, keyword } = useSelector(state => state.keywordReducer);
  const url = 'https://koreanjson.com/comments'
  
  // const initialUrl = `https://api.unsplash.com/search/photos&query=${keyword}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}?page=1`;
  const initialUrl = `https://api.unsplash.com/search/photos`;
  
  // const nextRef = useRef(null);
  // const inter = useInfiniteScroll(nextRef);
  // console.log(inter);

  const { data, isLoading, isError, hasNextPage, fetchNextPage, error } = useInfiniteQuery(
    [keyword],
    ({ pageParam = 1 }) => {
      console.log(pageParam);
      return axios.get(url, {params: {
        // page: pageParam,
        // query: keyword,
        // per_page: 30,
        // client_id: process.env.REACT_APP_ACCESS_KEY,
        userId: pageParam
      }})
    },
    {
      getNextPageParam: (lastPage) => {
        // const next = increasePage;
        // console.log(next);
        // if(!lastPage.next) {
        //   lastPage.next = `https://api.unsplash.com/search/photos?page=2&query=${keyword}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}`;
        // } else {
        //   // lastPage.next = lastPage.next + 1;
        // }
        // const url = `https://api.unsplash.com/search/photos?page=${lastPage.next}&query=${keyword}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}`;
        // // console.log(lastPage);
        // console.log(lastPage.data);
        // !!
        // if(lastPage.data.next === undefined) {
        //   lastPage.data.next = 2;          
        // } else {
        //   lastPage.data.next+=1;
        // }

        if(lastPage.next === undefined) {
          lastPage.next = 2
        } else {
          lastPage.next+= 1;
        }
        console.log(lastPage)
        // if(lastPage.data.total_pages - (lastPage.data.total_pages - 1) === 1) {
        //   lastPage.data.next = 2
        // }
        // if(lastPage.data.next !== undefined && lastPage.data.next >= 2) {
        // } else {
        //   lastPage.data.next = lastPage.data.next + 1;
        // }
        // console.log(lastPage.data.next);
        return lastPage.next || undefined
      }
    }
  )
  console.log(data)

  if(isLoading) return <Loading hasMargin/>
  if(error) {
    console.log(error.response.status)
  }

  

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
      {/* <SearchCardContainer> */}
        {/* {
          data ? data.pages[0].data.results.map(item => (
            <Card key={item.id} url={item.urls.thumb} likes={item.likes} url2={item.url}/>
          )) : null
        } */}
        {/* {
          data ? data.pages[0].data.results.map((item, idx) => (
            <TestCom key={item.id} name={item.id} />
          )) : null
        } */}
        {/* !!! */}
        {
          data ? data.pages[0].data.map((item, idx) => (
            <TestCom key={item.id} name={item.content} />
          )) : null
        }
      {/* </SearchCardContainer> */}
      {/* <div ref={nextRef}/> */}
    </InfiniteScroll>
  )
}

export default  InfiniteSearch;

const TestCom = ({ name }) => {
  return (
    <Test>
      {name}
    </Test>
  )
}



const Test = styled.div`
  font-size: 50px;
`

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



