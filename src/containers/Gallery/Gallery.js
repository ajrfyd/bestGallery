import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CardList from "../../components/Gallery/CardList";
import SearchCard from "../../components/Gallery/ SearchCard";
import { getImgs } from "../../store/data";
import utils from "../../utils";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import Loading from "../../components/Loading/Loading";

const Gallery = ({ apiData, searchState }) => {
  const { loading, data, error } = useSelector(state => state.dataReducer);
  const dispatch = useDispatch();
  // const [hasNext, setHasNext] = useState(true);
  // const getMoreImgEl = useRef(null);
  // const intersecting = useInfiniteScroll(getMoreImgEl);
  const [page, setPage] = useState(1);
  // console.log(page)
  // const localData = localStorage.getItem('data');
  // const [isFetching, setIsFetching] = useState(false);
  //!

  // const getMoreImgEl = useRef(null); 	//observer Element

  // const preventRef = useRef(true); //옵저버 중복 실행 방지
  // const endRef = useRef(false); //모든 글 로드 확인


  // useEffect(()=> { //옵저버 생성
  //     const observer = new IntersectionObserver(obsHandler, { threshold : 0.5 });
  //     if(getMoreImgEl.current) observer.observe(getMoreImgEl.current);
  //     return () => { observer.disconnect(); }
  // }, [])


  // useEffect(() => {
  //   setIsFetching(true);
  //   if(intersecting && hasNext && isFetching) {
  //     dispatch(getImgs());
  //   }
  //   setIsFetching(false)
  // }, [dispatch, intersecting, hasNext])

  useEffect(()=> {
    dispatch(getImgs(page));
    console.log('a')

    setPage(page => page + 1);
  }, [dispatch])
  // useEffect(() => {
  //   if(localData) return;
  // }, [])


  // const obsHandler = ((entries) => { //옵저버 콜백함수
  //     const target = entries[0];
  //     if(!endRef.current && target.isIntersecting && preventRef.current){ //옵저버 중복 실행 방지
  //       preventRef.current = false; //옵저버 중복 실행 방지
  //     }
  // })



  if(loading) return <Loading hasMargin/>;
  if(error) return <Error>Error!!</Error>



  return (
      <GalleryContainer>
        {
          searchState ? <SearchCard /> : <CardList apiData={data} loading={loading} error={error}/>
        }
        {/* {
          !searchState && <div ref={getMoreImgEl}/>
        } */}
        {/* <div ref={getMoreImgEl}/> */}
      </GalleryContainer>
  )
}

export default Gallery;

const GalleryContainer = styled.div`
  padding: 1rem;
  /* min-height: 100vh; */
  /* border: 1px solid red; */
`

const Error = styled.div`
  display: flex;
  font-size: 5rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`