import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

const IndividualImg = ({ setZoom, url, url2 }) => {
  const bgRef = useRef(null);

  const closeBgHandler = (e) => {
    if(e.target === bgRef.current) {
      setZoom(false);
    }
  }

  return (
    <BackDrop className="bg" ref={bgRef} onClick={closeBgHandler}>
      {/* <ImgContainer> */}
        {/* <ImgContainer > */}
          <Close onClick={() => setZoom(false)}>
            ❌
          </Close>
          <Img src={url2}/>
        {/* </ImgContainer> */}
      {/* </ImgContainer> */}
    </BackDrop>
  )
}

export default IndividualImg;

const BackDrop = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, .4);
  width: 30px;
  height: 30px;
  /* border-radius: 50%; */
  top: 50%;
  left: 50%;

  z-index: 999999;
  animation: zoom .3s linear both;
  display: flex;
  justify-content: center;
  align-items: center;
  
  
  
  @keyframes zoom {
    0% {
      box-shadow: 0 0 0 transparent;
    }
    100% {
      box-shadow: 0 0 0 15000vh #eee;
      border-radius: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`


const Close = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  z-index: 132;
  @media (max-width: 600px) {
    background-color: transparent;
    }
`

const Img = styled.img`
  border-radius: 5px;
  animation: zoom2 .5s .5s linear both;
  max-width: 50%;

  @keyframes zoom2 {
    0% {
      transform: scale(0);
    }
    70% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  @media (max-width: 600px) {
    max-width: 90vw;
  }
`