import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CardList from "../../components/Gallery/CardList";
import SearchCard from "../../components/Gallery/ SearchCard";
import { getImgs } from "../../store/data";
import utils from "../../utils";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Alert from "../../components/Alert/Alert";

const Gallery = ({ apiData, searchState, setModal }) => {
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
    setPage(page => page + 1);

  }, [dispatch])
  // console.log(data)

  // useEffect(() => {
  //   if(localData) return;
  // }, [])

  // useEffect(() => {
  //   if(page === 1) return;
  //   // dispatch(getImgs(page));
  //   // setPage(page => page + 1);
  // }, [page])

  // const obsHandler = ((entries) => { //옵저버 콜백함수
  //     const target = entries[0];
  //     if(!endRef.current && target.isIntersecting && preventRef.current){ //옵저버 중복 실행 방지
  //       preventRef.current = false; //옵저버 중복 실행 방지
  //     }
  // })
  const getMoreImgHandler = () => {
    // dispatch(getImgs(page));
    setModal(true);
  }

  if(loading) return <Loading hasMargin/>;
  if(error) return <Error>Error!!</Error>


  console.log(page)
  return (
      <GalleryContainer>
        {
          searchState ? <SearchCard /> 
          : <CardList apiData={data} loading={loading} error={error}/>
          
        }
        {/* {
          !searchState && <div ref={getMoreImgEl}/>
        } */}
        {/* <div ref={getMoreImgEl}/> */}
        {
          !searchState && <ReqMore onClick={getMoreImgHandler}>Get More Imgs</ReqMore>
        }
      </GalleryContainer>
  )
}

export default Gallery;

const GalleryContainer = styled.div`
  padding: 1rem;
  /* min-height: 100vh; */
  /* border: 1px solid red; */
  text-align: center;
`

const Error = styled.div`
  display: flex;
  font-size: 5rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
const ReqMore = styled.button`
  font-weight: bold;
  border: none;
  background-color: transparent;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, .5);
  padding: .5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;

  &:active {
    transform: scale(1.1);
  }
`

const Btn = styled.button`
  padding: 10px 1rem;
  margin: 0 1rem;
`