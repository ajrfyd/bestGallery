import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { getImg } from "./store/data";
import Header from "./containers/Header/Header";
import Search from "./containers/Search/Search";
import Gallery from "./containers/Gallery/Gallery";

function App() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state.dataReducer);
  const [searchState, setSearchState] = useState(false);
  
  useEffect(() => {
    dispatch(getImg());
  }, [dispatch])
  
  return (
    <Container>
      <Header />
      <Search setSearchState={setSearchState} />
      {/* {
        loading ? <Loading>Loading....</Loading> : <Gallery apiData={data} loading={loading} error={error}/>
      } */}
      <Gallery 
        apiData={data} 
        loading={loading} 
        error={error} 
        searchState={searchState}
      />
    </Container>
  )
}

export default App;

const Container = styled.div`
  min-height: 100vh;
`

