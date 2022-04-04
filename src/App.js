import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Header from "./containers/Header/Header";
import Search from "./containers/Search/Search";
import Gallery from "./containers/Gallery/Gallery";
import utils from './utils';
import Test from '../src/containers/Gallery/Test';
import axios from "axios";


const App = () => {
  const [searchState, setSearchState] = useState(false);
  // searchState의 값에 따라 메인 화면과 검색결과 화면의 전환이 이루어짐.
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    accessToken: '',
    user: null
  });
  const [loading, setLoading] = useState(false);

  const getToken = async (authorizationCode) => {
    const { access_token } = await utils.getAccessToken(authorizationCode);
    if(!access_token) return
    const user = await utils.getUserInfo(access_token);
    setUserInfo({
      ...userInfo,
      isLogin: true,
      accessToken: access_token,
      user
    })
    localStorage.setItem('access_token', access_token);
    window.history.replaceState({}, null, window.location.pathname);
    setLoading(false);
  }

  

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    const token = localStorage.getItem('access_token');

    if(token) {
      setUserInfo({
        ...userInfo,
        isLogin: true,
        accessToken: token
      })
      setLoading(false);
      return;
    }
    if(!authorizationCode && !token) return
    if(authorizationCode) {
      setLoading(true);
      getToken(authorizationCode)
      return
    }
    
  }, [])

  
  return (
    <Container>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} loading={loading} setLoading={setLoading}/>
      <Search setSearchState={setSearchState} />
      {/* <Gallery searchState={searchState} /> */}
      <Test />
    </Container>
  )
}

export default App;

const Container = styled.div`
  min-height: 100vh;
`

