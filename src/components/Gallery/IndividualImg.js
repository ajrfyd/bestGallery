import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

const IndividualImg = ({ top, left, setZoom, url }) => {

  return (
    <BackDrop style={{ top, left }}>
      <ImgContainer>
        <Close onClick={() => setZoom(false)}>
          ❌
        </Close>
        <div>
          <Img src={url}/>
        </div>
      </ImgContainer>
    </BackDrop>
  )
}

export default IndividualImg;

const BackDrop = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, .2);
  width: 30px;
  height: 30px;
  border-radius: 50%;


  z-index: 999999;
  animation: zoom .5s linear both;
  display: flex;
  justify-content: center;
  align-items: center;
  
  
  
  @keyframes zoom {
    0% {
      box-shadow: 0 0 0 transparent;
    }
    100% {
      box-shadow: 0 0 0 15000vh #ddd;
      border-radius: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`
const ImgContainer = styled.div`
  height: 70vh;
  position: relative;
  width: 70vw;
  background-color: #eee;
  border-radius: 5px;
  transition-delay: .5s;

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 600px) {
    width: 100vh;
    height: 100vh;
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
  transform: scale(1.5);
`