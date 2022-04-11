import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reqUser } from "./store/user";
import styled from "styled-components";
import Header from "./containers/Header/Header";
import Search from "./containers/Search/Search";
import Gallery from "./containers/Gallery/Gallery";
import utils from './utils';
import Test from '../src/containers/Gallery/Test';
import Alert from "./components/Alert/Alert";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const [searchState, setSearchState] = useState(false);
  // searchState의 값에 따라 메인 화면과 검색결과 화면의 전환이 이루어짐.
  const { isLogin, user, loading, error } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const queryClient = new QueryClient();

  const [modal, setModal] = useState(false);

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

  const text = '권한이 없습니다. 로그인을 해 보세요!'

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Header user={user} loading={loading} isLogin={isLogin}/>
        <Search setSearchState={setSearchState} />
        <Gallery searchState={searchState} setModal={setModal}/>
        {/* <Test /> */}
        { modal && <Alert modal={modal} setModal={setModal} />}
      </Container>
    </QueryClientProvider>
  )
}

export default App;

const Container = styled.div`
  min-height: 100vh;
`

