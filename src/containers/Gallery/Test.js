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

const Test = () => {
  const { loading, data, error } = useSelector(state => state.dataReducer);
  const dispatch = useDispatch();
  const getMoreImgEl = useRef(null);
  const intersecting = useInfiniteScroll(getMoreImgEl);
  const [page, setPage] = useState(1);
  console.log('re')
  console.log('reloading!')

  useEffect(()=> {
    if(intersecting) {
      dispatch(getImgs(page));
      setPage(page => page + 1);
      console.log('a')
      console.log(page);
    }
  }, [dispatch, intersecting])
  


  if(loading) return <Loading hasMargin/>;
  if(error) return <Error>Error!!</Error>



  return (
      <GalleryContainer>
        <Test2 apiData={data} loading={loading} error={error}/> 
        <div ref={getMoreImgEl}/>
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



