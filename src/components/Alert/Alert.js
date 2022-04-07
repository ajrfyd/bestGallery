import React, { useRef } from "react";
import { FaFileExport } from "react-icons/fa";
import styled, { css } from 'styled-components';

const Alert = ({ modal, setModal, text = '' }) => {
  const display = modal ? 'flex' : 'none';

  return (
    
    <BackGround style={{ display: display }} onClick={() => setModal(false)}>
      <Modal>
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
  0 10px 20px rgba(0, 0, 0, 0.5);
  ;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: .5s;
  /* transform: scale(1); */
  animation: modal .5s ease;

  @keyframes modal {
    0% {
      transform: scale(0);
    }
    100% {
      transfrom: scale(1);
    }
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
  margin-bottom: 2rem;
`

const P = styled.p`
  margin-top: 2rem;
`