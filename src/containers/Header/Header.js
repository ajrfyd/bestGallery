import React from "react";
import Logo from "../../components/Header/Logo";
import LoginBtn from "../../components/Header/LoginBtn";
import styled from 'styled-components';

const Header = ({ userInfo, setUserInfo }) => {

  return (
    <HeaderContainer>
      <Logo />
      <LoginBtn userInfo={userInfo} setUserInfo={setUserInfo}/>
    </HeaderContainer>
  )
}

export default Header;

const HeaderContainer = styled.header`
  background-color: #000;
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1150px) {
    flex-direction: column;
  }

`