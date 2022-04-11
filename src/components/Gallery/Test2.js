import React, { useRef, useEffect, useState } from "react";
import styled from 'styled-components';
import Card from "./Card";
import Loading from "../Loading/Loading";
import Test3 from "./Test3";
import { useDispatch } from "react-redux";
import { getImgs } from "../../store/data";

import useInfiniteScroll from "../../utils/useInfiniteScroll";

const Test2 = ({ apiData, loading, error }) => {
  console.log(apiData)
  if(loading) {
    return <Loading />
  }



  return (
    <>
      <CardListContainer>
        {
          apiData ? apiData.map(data => (
            <Test3 key={data.id} url={data.urls.thumb} likes={data.likes} id={data.id}/>
            // <div key={data.id} style={{ fontSize: '3rem', height: '5rem', margin: '2rem 0' }}>{data.id}</div>
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
