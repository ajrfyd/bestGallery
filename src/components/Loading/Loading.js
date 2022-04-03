import React from "react";
import styled, { css } from 'styled-components';

const Loading = () => {
  const deg = Array.from(new Array(20), (item, idx) => idx);


  return (
    <LoadingSpinner>
      <LoadingContainer>
        <Circle>
          {
            deg.map((item, idx) => <Span key={idx} num={item}/>)
          }
        </Circle>
        <Circle2>
          {
            deg.map((item, idx) => <Span2 key={idx} num={item}/>)
          }
        </Circle2>
      </LoadingContainer>
    </LoadingSpinner>
  )
}

export default Loading;

const LoadingSpinner = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background-color: #eee; */
  animation: aniColor 1s linear infinite;

  @keyframes aniColor {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
`

const LoadingContainer = styled.div`
  display: flex;
`

const Circle = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 -7.5px;
`

const Span = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(calc(18deg * ${({num}) => num}));
  
  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: calc(50% - 7.5px);
    width: 15px;
    height: 15px;
    background-color: #00ff0a;
    border-radius: 50%;
    box-shadow: 0 0 10px #00ff0a,
    0 0 20px #00ff0a,
    0 0 40px #00ff0a,
    0 0 60px #00ff0a,
    0 0 80px #00ff0a,
    0 0 100px #00ff0a;
    transform: scale(.1);
    animation: animate 1s linear infinite;
    animation-delay: calc(0.025s * ${({num}) => num});
  }
`

const Span2 = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(calc(18deg * ${({num}) => num}));

  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: calc(50% - 7.5px);
    width: 15px;
    height: 15px;
    background-color: #00ff0a;
    border-radius: 50%;
    box-shadow: 0 0 10px #00ff0a,
    0 0 20px #00ff0a,
    0 0 40px #00ff0a,
    0 0 60px #00ff0a,
    0 0 80px #00ff0a,
    0 0 100px #00ff0a;
    transform: scale(.1);
    animation: animate 1s linear infinite;
    animation-delay: calc(-0.025s * ${({num}) => num});
  }

  @keyframes animate {
    0% {
      transform: scale(1);
    }
    50%, 100% {
      transform: scale(.1);
    }
  }
  
`

const Circle2 = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 -7.5px;
  transform: rotate(-180deg);
  
  & span:before {
    animation-delay: calc(0.5s * ${({num}) => num});
  }
`


