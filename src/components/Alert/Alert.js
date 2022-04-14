import React, { useRef } from "react";
import { FaFileExport } from "react-icons/fa";
import styled, { css } from 'styled-components';

const Alert = ({ modal, setModal, text = '' }) => {
  const display = modal ? 'flex' : 'none';
  const bgRef = useRef(null);

  const closeModalHandler = (e) => {
    if(e.target === bgRef.current) {
      setModal(false)
    }
  }

  return (
    
    <BackGround style={{ display: display }} onClick={closeModalHandler} ref={bgRef} >
      <Modal >
        <ClearBtn onClick={() => setModal(false)}>
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


const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  justify-content: center;
  align-items: center;
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
  /* transition: .5s;  */
  /* animation: modal .5s ease; */
  animation-name: bounceInDown;
  -webkit-animation-duration: .5s;
  animation-duration: .5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;

  
  @keyframes bounceInDown {
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

    /* @keyframes modal {
      0% {
        transform: scale(0);
      }
      100% {
        transfrom: scale(1);
      }
    } */

}
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