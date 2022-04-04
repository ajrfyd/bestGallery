import React from "react";
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { reqLogout } from "../../store/user";

const LoginBtn = ({ user, isLogin }) => {
  const URL = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_ACCESS_KEY}&redirect_uri=${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://best-gallery.vercel.app'}&response_type=code&scope=public+read_user+write_likes`;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem('access_token');
    dispatch(reqLogout());
  }
  console.log(user);
  return (
    <Btn >
      { !isLogin && <a href={URL} >LogIn</a> }
      { isLogin && <a onClick={() => logoutHandler()}>LogOut</a> }
    </Btn>
  )
}

export default LoginBtn;

const Btn = styled.div`
  width: max-content;
  height: 80%;
  font-size: 2rem;
  padding: .5rem;
  margin: .5rem;
  font-family: var(--font-base);
  color: #fff;
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid transparent;
  text-shadow: 10px 10px 10px rgba(255, 255, 255, .7); 
  transition: .1s ease;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;

  &:hover {
    color: var(--color-golden);
    /* border-bottom: 1px solid #fff; */

    &:after {
      width: 100%;
      left: 0;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 1px;
    background-color: #fff;
    transition: .2s;
  }
  
`