import React, { useRef, useEffect } from "react";
import styled from 'styled-components';
import Card from "./Card";
import Loading from "../Loading/Loading";

import useInfiniteScroll from "../../utils/useInfiniteScroll";



const CardList = ({ apiData, loading, error, setLiked, setModal }) => {

  if(loading) {
    return <Loading />
  }



  return (
    <>
      <CardListContainer>
        {
          apiData ? apiData.map(data => (
            <Card 
              key={data.id} 
              url={data.urls.thumb} 
              likes={data.likes} 
              id={data.id} 
              url2={data.urls.small_s3} 
              setLiked={setLiked}
              setModal={setModal}
            />
          )) : null
        }
      </CardListContainer>
    </>
  )
}

export default CardList;


const CardListContainer = styled.div`
  line-height: 0;
  /* animation-name: bounceInRight;
  animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both; */

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

  /* @keyframes bounceInRight {
  0%, 100%, 60%, 75%, 90% {
    -webkit-transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
    transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(3000px, 0, 0);
    -ms-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0)
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(-25px, 0, 0);
    -ms-transform: translate3d(-25px, 0, 0);
    transform: translate3d(-25px, 0, 0)
  }
  75% {
    -webkit-transform: translate3d(10px, 0, 0);
    -ms-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0)
  }
  90% {
    -webkit-transform: translate3d(-5px, 0, 0);
    -ms-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0)
  }
  100% {
    -webkit-transform: none;
    -ms-transform: none;
    transform: none
  } */
}
`

