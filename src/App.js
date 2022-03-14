import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { getImg } from "./store/data";
import Header from "./containers/Header/Header";
import Search from "./containers/Search/Search";
import Gallery from "./containers/Gallery/Gallery";

function App() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state.dataReducer);
  
  useEffect(() => {
    dispatch(getImg());
  }, [dispatch])
  
  return (
    <Container>
      <Header />
      <Search />
      {
        loading ? <Loading>Loading....</Loading> : <Gallery apiData={data}/>
      }
      {
        error ? <Error>Error!</Error> : null
      }
    </Container>
  )
}

export default App;

const Container = styled.div`
  min-height: 100vh;
`

const Loading = styled.div`
  display: flex;
  font-size: 5rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const Error = styled.div`
  display: flex;
  font-size: 5rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`