import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CardList from "../../components/Gallery/CardList";
import SearchCard from "../../components/Gallery/ SearchCard";
import { getImgs } from "../../store/data";
import utils from "../../utils";

const Gallery = ({ apiData, searchState }) => {
  const { loading, data, error } = useSelector(state => state.dataReducer);
  const dispatch = useDispatch();
  
  const [hasNext, setHasNext] = useState(true);
  const getMoreImgEl = useRef(null);
  const intersecting = utils.useInfiniteScroll(getMoreImgEl);

  useEffect(() => {
    if(intersecting && hasNext) {
      dispatch(getImgs());
    }
  }, [dispatch, intersecting])

  // useEffect(() => {
  //   if(intersecting) {
  //     // TODO: Gallery에서 시도해 보자!
  //   }
  // }, []) 

  if(loading) return <Loading>Loading.....</Loading>;
  if(error) return <Error>Error!!</Error>



  return (
      <GalleryContainer>
        {
          searchState ? <SearchCard /> : <CardList apiData={data} loading={loading} error={error}/>
        }
        {
          !searchState && <div ref={getMoreImgEl}/>
        }
        {/* <div ref={getMoreImgEl}/> */}
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