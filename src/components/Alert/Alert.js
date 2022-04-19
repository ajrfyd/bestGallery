import React, { useRef, useEffect, useState } from "react";
import { FaFileExport } from "react-icons/fa";
import styled, { css, keyframes } from 'styled-components';

const Alert = ({ modal, closeHandler, text = '', isLogin }) => {
  const display = modal ? 'flex' : 'none';
  const bgRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [localVislble, setLocalVisible] = useState(modal);

  const closeModalHandler = (e) => {
    if(e.target === bgRef.current) {
      closeHandler()
    }
  }

  useEffect(() => {
    if(localVislble && !modal) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }
    setLocalVisible(modal);
  }, [localVislble, modal])

  if(!localVislble && !animate) return null;

  return (
    
    <BackGround onClick={closeModalHandler} ref={bgRef} >
      <Modal className={`animated`} disappear={!modal}>
        <ClearBtn onClick={closeHandler}>
          ❌
        </ClearBtn>
        <Title>Alert</Title>
        <P>
          {
            text || 'Coming Soon!!!'
          }
        </P>
      </Modal>
    </BackGround>
  )
}

export default Alert;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  animation-name: ${fadeIn};
  animation-duration: .5s;
  animation-fill-mode: forwards;
`

const bounceInDown = keyframes`
  0%, 100%, 60%, 75%, 90% {
    -webkit-transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
    transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    -ms-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0)
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    -ms-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0)
  }
  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    -ms-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0)
  }
  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    -ms-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0)
  }
  100% {
    -webkit-transform: none;
    -ms-transform: none;
    transform: none
  }
`

const bounceOutUp = keyframes`
  20% {
    -webkit-transform: translate3d(0, -10px, 0);
    -ms-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0)
  }
  40%,
  45% {
    opacity: 1;
    -webkit-transform: translate3d(0, 20px, 0);
    -ms-transform: translate3d(0, 20px, 0);
    transform: translate3d(0, 20px, 0)
  }
  100% {
    opacity: 0;
    -webkit-transform: translate3d(0, -2000px, 0);
    -ms-transform: translate3d(0, -2000px, 0);
    transform: translate3d(0, -2000px, 0)
  }
`


const Modal = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 
  0 10px 10px rgba(0, 0, 0, 0.5)
  0 10px 20px rgba(0, 0, 0, 0.5)
  ;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation-duration: .6s;
  animation-fill-mode: both;
  animation-name: ${bounceInDown};

  ${props => props.disappear && css`
    animation-name: ${bounceOutUp} 
  `}
`

const ClearBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  &:active {
    transform: scale(1.1);
  }
`

const Title = styled.h1`
  font-weight: bold;
  font-size: 3rem;
  margin-bottom: 2rem;
`

const P = styled.p`
  margin-top: 2rem;
`
