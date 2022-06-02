import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from 'styled-components';
import Card from "./Card";

const CardContainer = ({ apiData, setLiked, setModal, visible, dir }) => {
  const { data } = apiData;
  const [localState, setLocalState] = useState(visible);
  const [animate, setAnimate] = useState(false);
  // const [dir, setDir] = useState('left');

  useEffect(() => {
    if(!visible && localState) {
      setAnimate(true);
      console.log('Animate!')
      setTimeout(() => setAnimate(false), 250);
    }

    setLocalState(visible);
  }, [visible, localState])

  return (
    <Container disappear={animate} dir={dir}>
      {
        data.map(item => (
          <Card key={item.id} url={item.urls.small} likes={item.likes} id={item.id} setLiked={setLiked} setModal={setModal} url2={item.urls.small_s3}/>
        ))
      }
    </Container>
  )
}

export default CardContainer;

const Container = styled.div`
  width: 100%;
  height: 100%;
  /* border: 5px solid #6200ee; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  animation-fill-mode: both;
  animation-duration: 1.2s;
  animation-name: bounceInRight;
  
  ${({ dir }) => dir && css`
    animation-name: ${dir === 'right' ? 'bounceInRight' : 'bounceInLeft'};
  `}

  ${({ disappear, dir }) => disappear && dir && css`
    animation-name: ${dir === 'right' ? 'bounceOutLeft' : 'bounceOutRight'};
  `}

`