import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CardList from "../../components/Gallery/CardList";
import SearchCard from "../../components/Gallery/ SearchCard";
import { getImg } from "../../store/data";

function Gallery({ apiData, searchState }) {
  const { loading, data, error } = useSelector(state => state.dataReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImg());
  }, [dispatch])

  if(loading) return <Loading>Loading.....</Loading>;
  if(error) return <Error>Error!!</Error>



  return (
    <GalleryContainer>
      {
        searchState ? <SearchCard /> : <CardList apiData={data} loading={loading} error={error}/>
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