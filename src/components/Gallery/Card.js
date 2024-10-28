import React, { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { FaRegThumbsUp } from "react-icons/fa";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../Alert/Alert";
import utils from "../../utils";
import IndividualImg from "./IndividualImg";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { openOverlay, closeOverlay, setUrl } from "../../store/global";
import BigSizeImg from "./BigSizeImg";

const Card = ({
  url,
  likes,
  id,
  url2,
  setLiked,
  setModal,
  liked,
  likeMe,
  alt_description,
}) => {
  const { isLogin } = useSelector((state) => state.userReducer);
  const { open } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  // const [modal, setModal] = useState(false);
  const [like, setLike] = useState(false);
  const [cardLike, setCardLike] = useState(likes);
  const text = "로그인을 해야 사용할 수 있는 기능입니다. ";
  const queryClient = useQueryClient();

  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    width: 0,
    height: 0,
    left: 0,
  });

  const likeMutation = useMutation(utils.reqLike, {
    onSuccess: (data) => {
      setCardLike(data.photo.likes);
      setLike(true);
      queryClient.invalidateQueries("getMainImgs");
    },
    onSettled: (a, b) => {
      // console.log(a);
      // console.log(b);
      queryClient.invalidateQueries("getMainImgs");
    },
  });

  const unLikeMutaion = useMutation(utils.reqUnLike, {
    onSuccess: (data) => {
      setCardLike(data.photo.likes);
      setLike(false);
      queryClient.invalidateQueries("getMainImgs");
    },
  });

  const targetRef = useRef(null);

  const handleImgClick = useCallback(() => {
    // setZoom(true);
    dispatch(openOverlay());
    dispatch(setUrl(url));
    // console.log(targetRef.current.getBoundingClientRect());
    const { top, width, height, left } =
      targetRef.current.getBoundingClientRect();
    // setPosition((position) => {
    //   return {
    //     ...position,
    //     top,
    //     width,
    //     height,
    //     left,
    //   };
    // });
  }, [open]);

  const reqLikes = async () => {
    if (!isLogin) {
      setModal(true);
      return;
    }

    const token = localStorage.getItem("access_token");

    if (token) {
      if (!like) {
        likeMutation.mutate({ token, id });
      } else {
        unLikeMutaion.mutate({ token, id });
      }
    }
  };

  return (
    <>
      <CardContainer>
        <ImgContainer>
          <Image
            src={url}
            alt="Image"
            ref={targetRef}
            onClick={handleImgClick}
          />
          {/* <Utils>
            <FaRegThumbsUp
              onClick={reqLikes}
              style={{ color: like || likeMe ? "red" : "blue" }}
            />
            <Likes> &times; {cardLike}</Likes>
          </Utils> */}
        </ImgContainer>

        <div className="card-info">
          <FaRegThumbsUp
            onClick={reqLikes}
            style={{ color: like || likeMe ? "red" : "blue" }}
          />
          <Likes> &times; {cardLike}</Likes>
          <h4>{alt_description}</h4>
        </div>
      </CardContainer>
      {/* {zoom && (
        <IndividualImg
          top={position.top}
          left={position.left}
          setZoom={setZoom}
          url={url}
          url2={url2}
        />
      )}
      {open && <BigSizeImg url={url} />} */}
    </>
  );
};

export default Card;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;

  .card-info {
    position: absolute;
    text-align: center;
    width: 100%;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 40px;
    padding: 20px;
    margin-bottom: -100%;
    transition: margin 300ms;

    svg {
      cursor: pointer;
      color: #fff;
    }

    h4 {
      font-weight: 700;
      background-image: linear-gradient(
        92deg,
        #5a0dff 0%,
        #ff29b8 20.6%,
        #ff581c 45%,
        #fff 55%
      );
      background-size: 220% 100%;
      background-position: 100% 50%;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      background-repeat: no-repeat;
      transition: all 300ms ease-out;
      /* cursor: pointer; */

      &:hover {
        background-position: 0% 50%;
      }
    }
  }

  &:hover .card-info {
    margin-bottom: 0;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  /* break-inside: avoid; */
  /* overflow: hidden; */

  &:hover div {
    display: block;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  /* box-shadow: 0 8px 20px -15px #000; */
  line-height: 0;
  cursor: pointer;

  /* &:hover { */
  /* transform: scale(1.01); */
  /* box-shadow: 0 8px 20px -15px #000; */
  /* } */

  /* &:hover {
    opacity: .7;
    transform: scale(1.01)
  } */

  /* &:hover ~ div {
    display: flex;
  } */
`;

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
  & svg:hover ~ span {
    color: red;
  }

  & svg:active {
    transform: scale(1.1);
    color: #6200ee;
  }
`;

const Likes = styled.span`
  padding-top: 0.2rem;
  color: #fff;
  /* opacity: 0; */
  /* display: none */
`;

// &:hover ~ div svg {
//   opacity: 1;
//   /* display: block; */
// }
// &:hover ~ div span {
//   opacity: 1;
//   display: block;
// }
