import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/test';

function App() {
  const test = useSelector(state => state.testReducer.count);
  const dispatch = useDispatch();
  

  
  return (
    <Container>
      <H1>{test}</H1>
      <div style={{ display: "flex", justifyContent: 'space-evenly', width: '100%', backgroundColor: 'transparent' }}>
        <Button onClick={() => dispatch(increment())}>+</Button>
        <Button onClick={() => dispatch(decrement())}>-</Button>
      </div>
    </Container>
  )
}

export default App;

// const col = 'black'
const h = '30vh'
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: ${h};
  background-color: #6200ee;
  flex-direction: column;
`
const H1 = styled.h1`
  background-color: transparent;
  color: #fff;
`

const Button = styled.button`
  width: 4rem;
  height: 2rem;
  border-radius: 5px;
  outline: none;
`