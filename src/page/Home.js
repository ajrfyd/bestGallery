import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reqUser } from "../store/user"
import styled from "styled-components";
import Gallery from "../containers/Gallery/Gallery";


const Home = () => {

  return (
    <Container>
      <Gallery />
    </Container>
  )
}

export default Home;

const Container = styled.div`
  
`