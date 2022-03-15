import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Header from "./containers/Header/Header";
import Search from "./containers/Search/Search";
import Gallery from "./containers/Gallery/Gallery";

function App() {
  const [searchState, setSearchState] = useState(false);
  // searchState의 값에 따라 메인 화면과 검색결과 화면의 전환이 이루어짐.

  return (
    <Container>
      <Header />
      <Search setSearchState={setSearchState} />
      <Gallery searchState={searchState} />
    </Container>
  )
}

export default App;

const Container = styled.div`
  min-height: 100vh;
`

