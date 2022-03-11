import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/test';

function App() {
  const test = useSelector(state => state.testReducer.count);
  const dispatch = useDispatch();
  

  
  return (
    <Container>
      <h1>{test}</h1>
      <div style={{ display: "flex", justifyContent: 'space-evenly', width: '100%'}}>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
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