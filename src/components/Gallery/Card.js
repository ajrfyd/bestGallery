import React, { useState, useRef, useCallback } from "react";
import styled from 'styled-components';
import { FaRegThumbsUp } from 'react-icons/fa';
import axios from "axios";
import { useSelector } from "react-redux";
import Alert from "../Alert/Alert";
import utils from "../../utils";
import IndividualImg from "./IndividualImg";

const Card = ({ url, likes, id }) => {
  const { isLogin } = useSelector(state => state.userReducer);
  const [modal, setModal] = useState(false);
  const text = '로그인을 해야 사용할 수 있는 기능입니다. '

  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    width: 0,
    height: 0,
    left: 0
  })
  const targetRef = useRef(null);

  const handleImgClick = useCallback(() => {
    setZoom(true)
    // console.log(targetRef.current.getBoundingClientRect());
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

  const reqLikes = async () => {
    if(!isLogin) {
      setModal(true);
      return;
    }

    const token = localStorage.getItem('access_token');

    if(token) {
      const { photo, user } = await utils.reqLike(token, id);
      console.log(photo, user);
    }
  }

  return (
    <>
      <CardContainer>
        <ImgContainer>
          <Image src={url} alt='Image' ref={targetRef} onClick={handleImgClick}/>
          <Utils>
            <FaRegThumbsUp onClick={() => reqLikes()}/>
            <Likes > &times; {likes}</Likes>
          </Utils>
        </ImgContainer>
      </CardContainer>
      {
        modal && isLogin ? 
          <Alert modal={modal} setModal={setModal}/> : 
          <Alert modal={modal} setModal={setModal} text={text}/>
      }
      {
        zoom && <IndividualImg top={position.top} left={position.left} setZoom={setZoom} url={url}/>
      }
    </>
  )
}

export default Card;
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: .5rem;
  cursor: pointer;
  `

const ImgContainer = styled.div`
  position: relative;
  break-inside: avoid;
  /* overflow: hidden; */
  
  &:hover div {
    display: block;
  }
`

const Image = styled.img`
  border-radius: 5px;
  box-shadow: 0 8px 20px -15px #000;
  line-height: 0;

  /* &:hover {
    opacity: .7;
    transform: scale(1.01)
  } */
  
  /* &:hover ~ div {
    display: flex;
  } */
  
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



// &:hover ~ div svg {
//   opacity: 1;
//   /* display: block; */
// }
// &:hover ~ div span {
//   opacity: 1;
//   display: block;
// }