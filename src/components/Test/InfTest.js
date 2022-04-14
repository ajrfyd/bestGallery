import React, { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useQuery ,useInfiniteQuery } from "react-query";
import axios from "axios";
import styled from 'styled-components';
// import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading/Loading";


const InfTest = () => {
  // const [page, setPage] = useState(1);
  const pageRef = useRef(1);

  // const reqImgs = async (page) => {
  //   const url = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}&per_page=30`
  //   const { data } = await axios.get(url);
  //   return data
  // }

  const reqImages = async (page) => {
    const url = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}&per_page=30`
    const res = await axios.get(url);
    return res;
  }  


  const { data, hasNextPage, fetchNextPage, isError, isLoading, isFetching, error } = useInfiniteQuery(
    ['getImgs'],
    ({ pageParam = pageRef.current }) => reqImages(pageParam),
    {
      getNextPageParam: () => {
        pageRef.current = pageRef.current +1;
        return pageRef.current
      },
      keepPreviousData: true
    }
  )
    
  console.log('render')
  console.log(hasNextPage);

  if(isLoading) return <div>Loading....</div>
  if(isError) return <div>Error!!!! {error.toString()}</div>

  return (
    <InfiniteScroll
      hasMore={hasNextPage} 
      loadMore={fetchNextPage}
    >
      <Grid>
        {/* <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
          {
            data.pages[0].data.map(page => <img src={page.urls.thumb} key={page.id}/>)
          }
        </InfiniteScroll> */}
        {/* {
          data.map(item => <img src={item.urls.thumb} key={item.id} />)
        } */}
        {
          data.pages[0].data.map(page => <img src={page.urls.thumb} key={page.id}/>)
        }
      </Grid>
    </InfiniteScroll>
  )
}

export default InfTest;

const Grid = styled.section`
  display: grid;
  /* min-height: 100vh; */
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  border: 1px solid red;
  box-sizing: border-box;
`