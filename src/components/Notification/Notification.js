import React from "react";
import { useSelector } from "react-redux";
import Toast from "./Toast";
import styled from 'styled-components';

const Notification = () => {
  const { notification } = useSelector(state => state.notifyReducer);


  return (
    <NotificationContainer>
      {
        notification.map(item => <Toast key={item.uuid} text={item.msg} disappearTime={item.disappearTime} />)
      }
    </NotificationContainer>
  )
}

export default Notification;

const NotificationContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 10px;
  /* width: 100%; */
  /* text-align: center; */
  z-index: 99999999;
`