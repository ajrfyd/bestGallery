import React, { useEffect } from "react";
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';



function Pagination({ page, setPage, requestPage }) {
  useEffect(() => {
    setPage(1);
  }, [])

  const pageHandler = async (num) => {
    if(num === 1) {
      setPage(page + 1);
    } else if(num === -1 && page !== 1) {
      setPage(page - 1);
    }
  }


  return (
    <ArrowBox>
      <IoIosArrowBack onClick={() => pageHandler(-1)}/>
      <IoIosArrowForward onClick={() => pageHandler(1)}/>
    </ArrowBox>
  )
}

export default Pagination;

const ArrowBox = styled.div`
  /* width: 80%;
  border: 1px solid red;
  margin: 0 auto;
  padding-top: .4rem;
  & svg {
    color: red;
    font-size: 2rem;
  } */
  /* border: 1px solid red; */
  width: 100%;
  /* padding: 0 .5rem; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;

  & svg {
    color: #000;
    cursor: pointer;
    font-size: 2rem;
  }
`
