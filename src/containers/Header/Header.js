import React from "react";
import Logo from "../../components/Header/Logo";
import LoginBtn from "../../components/Header/LoginBtn";
import styled from 'styled-components';
import Loading from "../../components/Loading/Loading";

const Header = ({ user, loading, isLogin }) => {
  return (
    <HeaderContainer>
      <Logo />
      { isLogin && <User>welcome!! {user.username} ❤️</User> }
      {
        loading ? <Loading /> : <LoginBtn user={user} isLogin={isLogin}/>
      }
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

const User = styled.h3`
  font-family: var(--font-base);
  color: #fff;
  border: none;
  transition: .5s;

  &:hover {
    text-shadow: 0 0 10px #00ff0a,
    0 0 20px #00ff0a,
    0 0 40px #00ff0a,
    0 0 60px #00ff0a,
    0 0 80px #00ff0a,
    0 0 100px #00ff0a;
    filter: hue-rotate(360deg);
    transform: scale(1.1);
  }
`