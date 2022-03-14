import React from "react";
import styled from 'styled-components';
import { FaRegThumbsUp } from 'react-icons/fa';



function Card({ url, likes }) {

  return (
    <CardContainer>
      <ImgContainer>
        <Image src={url} alt='Image'/>
        <Utils>
          <FaRegThumbsUp />
          <span style={{ paddingTop: '.2rem'}}>: {likes}</span>
        </Utils>
      </ImgContainer>
    </CardContainer>
  )
}

export default Card;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  margin-bottom: .5rem;
`
const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 440px) {
    width: 100%;
  }
`

const Image = styled.img`
  border-radius: 5px;
  object-fit: cover;
  margin-bottom: .5rem;
/* 
  @media (max-width: 440px){
    width: 150%;
  } */

  &:hover {
    opacity: .7;
    transform: scale(1.01)
  }
`

const Utils = styled.div`
  display: flex;
  align-items: center;

  & svg {
    cursor: pointer;
  }
`