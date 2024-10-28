import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Gallery from "../containers/Gallery/Gallery";
import Alert from "../components/Alert/Alert";
import ImgOverlay from "../components/Gallery/ImgOverlay";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const Home = ({ isLogin }) => {
  const [modal, setModal] = useState(false);

  const closeHandler = () => setModal(false);
  const { open } = useSelector((state) => state.globalReducer);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate('/page/1');
  // }, [])
  return (
    <Container>
      <Gallery setModal={setModal} />
      <Alert
        modal={modal}
        closeHandler={closeHandler}
        isLogin={isLogin}
        text="로그인이 필요한 기능입니다"
      />
      {open && <ImgOverlay />}
    </Container>
  );
};

export default Home;

const Container = styled.div``;
