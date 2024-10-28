import React from "react";
import styled from "styled-components";

const BigSizeImg = ({ url }) => {
  return <Container src={url} />;
};

export default BigSizeImg;

const Container = styled.img`
  position: absolute;
  z-index: 1100;
  /* width: 100%; */
`;
