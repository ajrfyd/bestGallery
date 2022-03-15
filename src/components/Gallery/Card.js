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
          <Likes >: {likes}</Likes>
        </Utils>
      </ImgContainer>
    </CardContainer>
  )
}

export default Card;
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: .5rem;
  `

const ImgContainer = styled.div`
  position: relative;
  break-inside: avoid;
  /* overflow: hidden; */
`

const Image = styled.img`
  border-radius: 5px;
  box-shadow: 0 8px 20px -15px #000;
  line-height: 0;

  &:hover {
    opacity: .7;
    transform: scale(1.01)
  }
  
  &:hover ~ div {
    display: flex;
  }
  
`

const Utils = styled.div`
  /* display: flex; */
  display: none;
  align-items: center;
  position: absolute;
  bottom: 10%;
  right: 30px;

  & svg {
    cursor: pointer;
    color: #000;
    /* opacity: 0; */
    /* display: none; */
  }

  &:hover svg {
    color: red;
  }
`

const Likes = styled.span`
  padding-top: .2rem;
  color: #000;
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