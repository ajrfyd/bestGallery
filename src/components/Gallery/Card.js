import React, { useState, useRef, useCallback, useEffect } from "react";
import styled from 'styled-components';
import { FaRegThumbsUp } from 'react-icons/fa';
import axios from "axios";
import { useSelector } from "react-redux";
import Alert from "../Alert/Alert";
import utils from "../../utils";
import IndividualImg from "./IndividualImg";
import { useQuery, useQueryClient, useMutation } from "react-query";

const Card = ({ url, likes, id, url2, setLiked, setModal, liked }) => {
  const { isLogin } = useSelector(state => state.userReducer);
  // const [modal, setModal] = useState(false);
  const [like, setLike] = useState(false);
  const [cardLike, setCardLike] = useState(likes);
  const text = '로그인을 해야 사용할 수 있는 기능입니다. '
  const queryClient = useQueryClient();

  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    width: 0,
    height: 0,
    left: 0
  })

  const likeMutation = useMutation(utils.reqLike,
    {
      onSuccess: (data) => {
        setCardLike(data.photo.likes);
        queryClient.invalidateQueries('getMainImgs');
      }
    }
  )

  // const token = localStorage.getItem('access_token');

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
      if(!like) {
        // try{
        //   const { photo: { liked_by_user }, user } = await utils.reqLike(token, id);
        //   console.log(liked_by_user);
        //   if(liked_by_user) {
        //     console.log('like!')
        //     setLiked(true);
        //     setLike(true);
        //   }        
  
        // } catch(e) {
        //   throw new Error('Not Found!')
        // }
        // console.log(typeof id)
        likeMutation.mutate({token, id});
      } else {
        try {
          const { photo: { liked_by_user }, user } = await utils.reqUnLike(token, id);
          if(!liked_by_user) {
            console.log('cancel!!')
            setLike(false);
          }
        } catch(e) {
          throw new Error('Not found!')
        }
      }
    }
  }
  // const { data, status } = useQuery('like',
  //   () => utils.reqLike(token, id),
  //   {
  //     enabled: !!like,
  //     onSuccess: () => {
  //       console.log('hi')
  //       queryClient.invalidateQueries('getMainImgs')
  //     }
  //   })
  

    // console.log(data);

  return (
    <>
      <CardContainer>
        <ImgContainer>
          <Image src={url} alt='Image' ref={targetRef} onClick={handleImgClick} />
          <Utils>
            <FaRegThumbsUp onClick={reqLikes} style={{ color: like ? 'red' : 'blue' }}/>
            <Likes > &times; {cardLike}</Likes>
          </Utils>
        </ImgContainer>
      </CardContainer>
      {
        zoom && <IndividualImg top={position.top} left={position.left} setZoom={setZoom} url={url} url2={url2}/>
      }
    </>
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
  /* break-inside: avoid; */
  /* overflow: hidden; */
  
  &:hover div {
    display: block;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 8px 20px -15px #000;
  line-height: 0;
  cursor: pointer;  

  &:hover {
    transform: scale(1.01);
  }

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