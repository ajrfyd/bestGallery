import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import Card from "./Card";
import Loading from "../Loading/Loading";
import { useQuery, useInfiniteQuery } from 'react-query'
import utils from "../../utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import LazyLoadCard from "./LazyLoadCard";
import Error from "../Notification/Error";

const SearchCard = () => {
  const targetRef = useRef(null);
  const { keyword } = useParams();
  
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
  }

  utils.useObserver({
    target: targetRef,
    onIntersect,
  })
  
  // !! 이런 식으로 로딩중에 덮어 버리면 무한 스크롤이 작동하지 않는다..
  // if(status === 'loading') return <Loading hasMargin/>

  return (
    <Container>
      {
        status === 'loading' && <Loading stlye={{ marginTop: '5rem' }}/>
      }
      <SearchContainer>
        {
          status === 'success' && data.pages.map((data, idx) => (
              <React.Fragment key={idx}>
                {
                  data.result.map((item, idx) => {
                    // console.log(item)
                    const { alt_description, urls } = item;
                    // console.log(alt_description)
                    return ( 
                      <React.Fragment key={urls.thumb}>
                        <LazyLoadCard url={item.urls.small} alt={alt_description} keyword={keyword}/>
                      </React.Fragment>
                    )
                  })
                }
              </React.Fragment>
          ))
        }
      </SearchContainer>
      {
        isFetchingNextPage && <Loading />
      }
      {
        status ==='error' && <Error />
      }
      <div ref={targetRef} />
    </Container>
  )
}

export default  SearchCard;

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  gap: 10px;

  /* & > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  } */
`