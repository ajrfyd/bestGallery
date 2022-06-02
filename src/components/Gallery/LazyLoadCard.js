import React from "react";
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const imgStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '5px',
}
const LazyLoadCard = ({ url, alt, keyword }) => {

  return (
    <Container>
      <LazyLoadImage src={url} style={imgStyle} alt={ alt ? alt : keyword }/>
    </Container>
  )
}

export default LazyLoadCard;

const Container = styled.div`
  /* width: 100%; */
  /* height: 100% */
  img {
    /* display: none; */
  }
`