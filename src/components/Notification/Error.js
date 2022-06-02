import React from "react";
import styled, { keyframes} from 'styled-components';

const Error = ({ }) => {

  return (
    <Container>
        <h1>
          API 요청 횟수를 초과 하였습니다.
        </h1>
    </Container>
  )
}

export default Error;

const star = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`

const Container = styled.div`
  /* background-color: red; */
  width: 100%;
  display: flex;
  justify-content: center;  
  align-items: center;
  padding: 5rem;

  h1 {
    color: red;
    filter: drop-shadow(0 0 30px red);
    animation-name: ${star};
    animation-duration: .5s;
    animation-timing-function: steps(1);
    animation-iteration-count: infinite;
  }
`