import React from "react";
import styled from 'styled-components';
import CardList from "../../components/Gallery/CardList";

function Gallery({ apiData }) {

  return (
    <GalleryContainer>
      <CardList apiData={apiData}/>
    </GalleryContainer>
  )
}

export default Gallery;

const GalleryContainer = styled.div`
  padding: 1rem;
  max-height: 100vh;

`