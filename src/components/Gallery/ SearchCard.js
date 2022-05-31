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
  const { loading, data, error, pageNum, keyword } = useSelector(state => state.keywordReducer);
  const targetRef = useRef(null);
  
  const dispatch = useDispatch();
  
  const requestPage = (page) => {
    dispatch(searchData(keyword, page))
  }
  
  
  // // !!Infinite practice 
  // const [page, setPage] = useState(1);

  // const pageHandler = () => {
  //   setPage(page => page + 1);

  // }

  // const url = `https://api.unsplash.com/search/photos?page=${pageNum}&query=${keyword}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}`
  // const reqData = ({ pageParam = page }) => axios.get(`https://api.unsplash.com/search/photos?page=${pageParam}&query=${keyword}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}`).then(res => res?.data);
  // const { data: data2, error: error2, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery(
  //   [keyword, pageNum],
  //   reqData,
  //   {
  //     getNextPageParam: (lastPage, page) => {
  //       console.log(lastPage)
  //       return page;
  //     }
  //   }
  // )

  // const onIntersect = (entries, observer) => {
  //   if(!entries[0].isIntersecting) return;
  //   entries[0].isIntersecting && pageHandler();
  //   fetchNextPage();
  // }
  // console.log(page);

  // utils.useObserver({
  //   target: targetRef,
  //   onIntersect
  // })
  
  // console.log(data2);
  // !!
  if(loading) return <Loading hasMargin/>
  if(error) {
    console.log(error.response.status)
  }



  return (
    <>
      <SearchCardContainer>
        {
          data ? data.imgData.map(item => (
            <Card key={item.id} url={item.url} likes={item.likes} url2={item.url}/>
          )) : null
        }
        {/* {
          status === 'success' && data2.pages[0].results.map((info, idx) => (
            <div key={idx} >
              {info.id}
            </div>
          ))
        } */}
      </SearchCardContainer>
      <div ref={targetRef}/>
      {/* <Pagination page={pageNum} requestPage={requestPage}/> */}
    </>
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

