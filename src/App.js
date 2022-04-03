import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Header from "./containers/Header/Header";
import Search from "./containers/Search/Search";
import Gallery from "./containers/Gallery/Gallery";
import utils from './utils';
import Loading from "./components/Loading/Loading";


const App = () => {
  const [searchState, setSearchState] = useState(false);
  // searchState의 값에 따라 메인 화면과 검색결과 화면의 전환이 이루어짐.
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    accessToken: ''
  });

  const getToken = async (authorizationCode) => {
    const { access_token } = await utils.getAccessToken(authorizationCode);
    if(!access_token) return
    setUserInfo({
      ...userInfo,
      isLogin: true,
      accessToken: access_token
    })
    localStorage.setItem('access_token', access_token);
    window.history.replaceState({}, null, window.location.pathname)
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
      return;
    }
    if(!authorizationCode && !token) return
    if(authorizationCode) {
      getToken(authorizationCode)
      return
    }
    
  }, [])

  return (
    <Container>
      <Header userInfo={userInfo} setUserInfo={setUserInfo}/>
      <Search setSearchState={setSearchState} />
      <Gallery searchState={searchState} />
      {/* <Loading /> */}
    </Container>
  )
}

export default App;

const Container = styled.div`
  min-height: 100vh;
`

