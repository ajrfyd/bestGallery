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
import { useParams } from "react-router-dom";

const SearchCard = () => {
  // const { loading, pageNum, keyword } = useSelector(state => state.keywordReducer);
  const targetRef = useRef(null);
  const { keyword } = useParams();
  console.log(keyword);
  
  // // !!Infinite practice 
  const reqData = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`https://api.unsplash.com/search/photos?page=${pageParam}&query=${keyword}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
    // console.log(keyword);
    // console.log(pageParam);
    return {
      result: data.results,
      next: pageParam + 1
    }
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery(
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
    console.log('asdadsasasd')
  }

  utils.useObserver({
    target: targetRef,
    onIntersect,
  })
  
  // console.log(data);
  // !!
  // if(status === 'loading') return <Loading hasMargin/>

  return (
    <SearchCardContainer>
      {
        status === 'success' && data.pages.map((data, idx) => (
            <React.Fragment key={idx}>
              {
                data.result.map((item, idx) => {
                  // console.log(item)
                  const { id, urls } = item;
                  // console.log(id, urls.thumb)
                  return ( 
                    <React.Fragment key={urls.thumb}>
                      <img src={item.urls.small} alt=""  style={{ width: '100%', height: '100%'}}/>
                    </React.Fragment>
                  )
                })
              }
            </React.Fragment>
        ))
      }
      {
        isFetchingNextPage && <Loading />
      }
      <div ref={targetRef} />
    </SearchCardContainer>
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
  /* border: 5px solid red; */
  padding: 1rem;
  
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  & + & {
    margin-top: 1rem;
  }  

`
