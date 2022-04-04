import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reqUser } from "./store/user";
import styled from "styled-components";
import Header from "./containers/Header/Header";
import Search from "./containers/Search/Search";
import Gallery from "./containers/Gallery/Gallery";
import utils from './utils';
import Test from '../src/containers/Gallery/Test';


const App = () => {
  const [searchState, setSearchState] = useState(false);
  // searchState의 값에 따라 메인 화면과 검색결과 화면의 전환이 이루어짐.
  const { isLogin, user, loading, error } = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  const getToken = async (authorizationCode) => {
    const { access_token } = await utils.getAccessToken(authorizationCode);

    if(!access_token) return

    dispatch(reqUser(access_token));

    localStorage.setItem('access_token', access_token);
    window.history.replaceState({}, null, window.location.pathname);
  }

  

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    const token = localStorage.getItem('access_token');
    
    if(!authorizationCode && !token) return
    if(token) {
      dispatch(reqUser(token));
    }
    if(authorizationCode) {
      getToken(authorizationCode)
      return
    }
    
  }, [])
    
  return (
    <Container>
      <Header user={user} loading={loading} isLogin={isLogin}/>
      <Search setSearchState={setSearchState} />
      <Gallery searchState={searchState} />
      {/* <Test /> */}
    </Container>
  )
}

export default App;

const Container = styled.div`
  min-height: 100vh;
`

