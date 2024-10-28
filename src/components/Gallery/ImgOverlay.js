import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import BigSizeImg from "./BigSizeImg";
import { closeOverlay } from "../../store/global";

const ImgOverlay = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.globalReducer);

  const clickHandler = (e) => {
    const { target, currentTarget } = e;
    if (target !== currentTarget) return;
    dispatch(closeOverlay());
  };

  useEffect(() => {
    const eventHandler = (e) => {
      if (e.key !== "Escape") return;
      dispatch(closeOverlay());
    };
    window.addEventListener("keydown", eventHandler);

    return () => {
      window.removeEventListener("keydown", eventHandler);
    };
  }, []);

  return (
    <Container id="overlay" onClick={clickHandler}>
      <BigSizeImg url={url} />
    </Container>
  );
};

export default ImgOverlay;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* width: 100%;
  height: 100%; */
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
