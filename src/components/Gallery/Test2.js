import React, { useRef, useEffect, useState } from "react";
import styled from 'styled-components';
import Card from "./Card";
import Loading from "../Loading/Loading";
import Test3 from "./Test3";
import { useDispatch } from "react-redux";
import { getImgs } from "../../store/data";

import useInfiniteScroll from "../../utils/useInfiniteScroll";

const Test2 = ({ apiData, loading, error }) => {
  // const getMoreImgEl = useRef(null);
  // const intersecting = useInfiniteScroll(getMoreImgEl);
  // const dispatch = useDispatch();
  // const [page, setPage] = useState(1);

  
  


  // useEffect(() => {
  //   if(intersecting) {
  //     console.log('hi')
  //     dispatch(getImgs(page))
  //     setPage(page => page + 1);
  //     console.log(page)
  //   }
  // }, [intersecting])

  if(loading) {
    return <Loading />
  }



  return (
    <>
      <CardListContainer>
        {
          apiData ? apiData.map(data => (
            <Test3 key={data.id} url={data.urls.thumb} likes={data.likes} id={data.id}/>
          )) : null
        }
        {/* <div ref={getMoreImgEl}/> */}
      </CardListContainer>
    </>
  )
}
export default Test2;

const CardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  /* grid-template-rows: repeat(auto-fill, minmax(200px, auto)); */
  /* grid-auto-rows: minmax(200px, auto); */
  column-gap: 10px;
  /* grid-auto-flow: row; */
  /* border: 1px solid green; */
`