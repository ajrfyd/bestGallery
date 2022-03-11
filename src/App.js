import React from "react";
import styled from "styled-components";

function App() {
  
  return (
    <Container>
      Hello Gallery??
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
  background-color: #6200ee
`