import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getImgs } from "../../store/data";
import utils from "../../utils";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import Loading from "../../components/Loading/Loading";
import { FaRegThumbsUp } from 'react-icons/fa';
import Test2 from "../../components/Gallery/Test2";
import Test3 from "../../components/Gallery/Test3";
import { useQuery, useInfiniteQuery } from "react-query";
import axios from "axios";


const Test = () => {
  // const { loading, data, error } = useSelector(state => state.dataReducer);
  // const dispatch = useDispatch();
  // const getMoreImgEl = useRef(null);
  // const intersecting = useInfiniteScroll(getMoreImgEl);

  // const [page, setPage] = useState(1);
  const [imgData, setImgData] = useState([]);
  
  const [fetching, setFetching] = useState(false);

  const getImgData = async (page = 1) => {
    console.log(page)
    const API = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}&per_page=10`
    const { data } = await axios.get(API);
    const data2 = await axios.get(API);
    // console.log(data2)
    return data2;
  }

  // const { data, isLoading, isError, isPreviousData } = useQuery(['getImgs', page], getImgData, { keepPreviousData: true });
  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useInfiniteQuery(
    'getImgs', 
    ({ pageParam = 1 }) => getImgData(pageParam),
    // getImgData,
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage.headers['x-total']);
        console.log(allPages.length+1)
        const maxPages = lastPage.headers['x-total'] / 30;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      }
    }
    )
  // const a = useQuery(['getImgs', page], getImgData, { keepPreviousData: true });
  // console.log(a)
  useEffect(() => {
    // getImgData();
    // setPage(page => page + 1);
    // setFetching(false);
    let fetching = false;
    const onScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
      if(!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        // setFetching(true);
        fetching = true;
        console.log('This!')
        console.log(hasNextPage)
        // if(hasNextPage) await fetchNextPage()
        await fetchNextPage();
        fetching = false;
        // setFetching(false);
      }
    }
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    }
  }, [])

  // useEffect(()=> {
  // //   if(intersecting) {
  // //     // dispatch(getImgs(page));
  // //   }
  // if(intersecting) {
  //   getImgData()
  // }
  // }, [intersecting])
  
  // console.log('Render', page);
  // console.log(imgData)
  console.log(data, hasNextPage);
  // console.log(isPreviousData);

  if(isLoading) return <Loading hasMargin/>;
  if(isError) return <Error>Error!!</Error>



  return (
      <GalleryContainer>
        <Test2 apiData={data.pages[0].data} loading={isLoading} error={isError}/>         
      </GalleryContainer>
  )
}

export default Test;

const GalleryContainer = styled.div`
  padding: 1rem;
  /* min-height: 100vh; */
`

const Error = styled.div`
  display: flex;
  font-size: 5rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const Btn = styled.button`
  padding: 10px 1rem;
  margin: 0 1rem;
`