import React, { useState, useCallback, useRef } from "react";
import styled, { ThemeProvider } from 'styled-components';
import { FaRegThumbsUp } from 'react-icons/fa';
import axios from "axios";
import IndividualImg from "./IndividualImg";

const Test3 = ({ url, likes, id }) => {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    width: 0,
    height: 0,
    left: 0
  })
  const targetRef = useRef(null);
  // 테스트중 

  const reqLikes = async () => {
  }

  const handleImgClick = useCallback(() => {
    setZoom(true)
    console.log(targetRef.current.getBoundingClientRect());
    const { top, width, height, left } = targetRef.current.getBoundingClientRect();
    setPosition(position => {
      return {
        ...position,
        top,
        width,
        height,
        left
      }
    })
  }, [])

  return (
    <>
      <CardContainer >
        <ImgContainer >
          <Image src={url} alt='Image' ref={targetRef} onClick={handleImgClick}/>
          <Utils>
            <FaRegThumbsUp onClick={() => reqLikes()}/>
            <Likes > &times; {likes}</Likes>
          </Utils>
        </ImgContainer>
      </CardContainer>
      {
        zoom && <IndividualImg top={position.top} left={position.left} setZoom={setZoom} url={url}/>
      }      
    </>
  )
}

export default Test3;


const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: .5rem;
  /* border: 1px solid red; */
  /* height: fit-content; */
  `

const ImgContainer = styled.div`
  position: relative;
  
  &:hover div {
    display: block;
  }
`

const Image = styled.img`
  border-radius: 5px;
  box-shadow: 0 8px 20px -15px #000;
  line-height: 0;
  width: 200px;
  height: 300px;
`

const Utils = styled.div`
  /* display: flex; */
  display: none;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 30px;
  font-size: 1.5rem;

  & svg {
    cursor: pointer;
    color: blue;
    /* opacity: 0; */
    /* display: none; */
  }

  & svg:hover,
  & svg:hover ~ span
  {
    color: red;
  }

  & svg:active {
    transform: scale(1.1);
    color: #6200ee;
  }
`

const Likes = styled.span`
  padding-top: .2rem;
  color: #fff;
  /* opacity: 0; */
  /* display: none */
`






