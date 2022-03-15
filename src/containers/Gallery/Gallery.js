import React from "react";
import styled from 'styled-components';
import CardList from "../../components/Gallery/CardList";
import SearchCard from "../../components/Gallery/ SearchCard";

function Gallery({ apiData, searchState, loading, error }) {
  if(loading) return <Loading>Loading.....</Loading>;
  if(error) return <Error>Error!!</Error>

  return (
    <GalleryContainer>
      {
        searchState ? <SearchCard apiData={apiData}/> : <CardList apiData={apiData}/>
      }
      {/* <CardList apiData={apiData}/> */}
    </GalleryContainer>
  )
}

export default Gallery;

const GalleryContainer = styled.div`
  padding: 1rem;
  /* min-height: 100vh; */
`

const Loading = styled.div`
  display: flex;
  font-size: 5rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const Error = styled.div`
  display: flex;
  font-size: 5rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`