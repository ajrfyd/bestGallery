import React, { useRef, useEffect, useState } from "react";
import styled, { css } from 'styled-components';
import Card from "./Card";
import Loading from "../Loading/Loading";

import useInfiniteScroll from "../../utils/useInfiniteScroll";



const CardList = ({ apiData, loading, error, setLiked, setModal, dir, page, isFetched }) => {

  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(isFetched);
  
  const animation = animate
  ? (dir === 'left' ? 'bounceOutLeft' : 'bounceOutRight')
  : (dir === 'left' ? 'bounceInLeft' : 'bounceInRight');
  
  
  useEffect(() => {
    if(localVisible && !isFetched) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500)
    }
    setLocalVisible(isFetched);
  }, [localVisible, isFetched])

  if(!animate && !localVisible && !isFetched) return null;
  if(loading) return <Loading />

  return (
    <>
      <CardListContainer 
        className={`animated ${animation}`}
        disapperar={!isFetched}
      >
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
  ${props => props.disapperar && css`
    animation-name: bounceOutRight;
  `}
`

