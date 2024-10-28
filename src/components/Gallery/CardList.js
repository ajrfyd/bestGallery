import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Card from "./Card";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const CardList = ({
  apiData,
  isLoading,
  error,
  setLiked,
  setModal,
  dir,
  page,
  isFetched,
  visible,
  liked,
}) => {
  //! Prev
  // const [animate, setAnimate] = useState(false);
  // const [localVisible, setLocalVisible] = useState(isFetched);

  // const animation = animate
  // ? (dir === 'right' ? 'bounceOutLeft' : 'bounceOutRight')
  // : (dir === 'left' ? 'bounceInLeft' : 'bounceInRight');

  // useEffect(() => {
  //   if(localVisible && !isFetched) {
  //     setAnimate(true);
  //     setTimeout(() => setAnimate(false), 500)
  //   }
  //   setLocalVisible(isFetched);
  // }, [localVisible, isFetched])

  // if(!animate && !localVisible && !isFetched) return null;
  // if(loading) return <Loading />
  // const { pageNum } = useSelector(state => state.keywordReducer);
  // console.log(pageNum);

  //! 2nd
  // const [appear, setAppear] = useState(false);
  // const [localState, setLocalState] = useState(appear);
  // const [animate, setAnimate] = useState(false);

  // console.log(visible);
  // useEffect(() => {
  //   setAppear(true);
  // }, [page]);

  // useEffect(() => {
  //   if(!appear && localState) {
  //     setAnimate(true);
  //     setTimeout(() => {
  //       console.log('asdasdas')
  //       setAnimate(false)
  //     }, 1000)
  //   }
  //   setLocalState(appear);
  // }, [localState, appear])

  // if(!animate && !appear) return null;

  //!!!!!!!

  const [localState, setLocalState] = useState(visible);
  const [animate, setAnimate] = useState(false);
  // console.log('%cLocalState', 'color: red', localState);

  useEffect(() => {
    if (localState && !visible) {
      setAnimate(true);
      console.log("%cAnimation start", "color: red");
      setTimeout(() => {
        console.log("asdasd");
        setAnimate(false);
      }, 1000);
    }
    setLocalState(visible);
  }, [visible, localState]);

  useEffect(() => {
    return () => {
      if (!visible) {
        // setVisible(prev => !prev);
        // setAnimate(true);
        // console.log('%cunmount!', '#fff')
        // setTimeout(() => setAnimate(false), 250);
      }
    };
  }, []);

  if (!animate && !localState) return null;

  return (
    <>
      <CardListContainer
        // className={`animated ${animation}`}
        // disapperar={!isFetched}
        disappear={!visible}
        dir={dir}
      >
        {apiData
          ? apiData.map((data) => (
              <Card
                key={data.id}
                url={data.urls.thumb}
                likes={data.likes}
                id={data.id}
                url2={data.urls.small_s3}
                setLiked={setLiked}
                setModal={setModal}
              />
            ))
          : null}
      </CardListContainer>
    </>
  );
};

export default CardList;

const CardListContainer = styled.div`
  /* line-height: 0; */
  animation-duration: 1.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  ${({ dir }) =>
    dir &&
    css`
      animation-name: ${dir === "right" ? "bounceInRight" : "bounceInLeft"};
    `}

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

  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto)); */

  /* ${(props) =>
    props.disapperar &&
    css`
      animation-name: bounceOutRight;
    `} */

  ${({ disappear, dir }) =>
    disappear &&
    dir &&
    css`
      animation-name: ${dir === "right" ? "bounceOutLeft" : "bounceOutRight"};
    `}
`;
