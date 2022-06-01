import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CardList from "../../components/Gallery/CardList";
import SearchCard from "../../components/Gallery/ SearchCard";
import { getImgs } from "../../store/data";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "react-query";
import axios from "axios";
import utils from "../../utils";
import InfiniteSearch from "../../components/Gallery/InfiniteSearch";

const Gallery = ({ apiData, searchState, setModal }) => {
  const [page, setPage] = useState(1);
  const [liked, setLiked] = useState(false);
  const [dir, setDir] = useState('right');
  
  const { data, isLoading, isError, error, isFetched } = useQuery(
    ['getMainImgs', page],
    () => utils.getMainImgs(page),
    {
      // keepPreviousData: true,
      cacheTime: 0,
      // enabled: !!liked
    }
    )

    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
      if(!isLoading && data) {
        setVisible(true)
      }
    }, [isLoading, data])

    // useEffect(() => {
    //   utils.getMainImgs();
    // }, [liked])
    // console.log(visible);
    // useEffect(() => {
    //   setVisible(true)

    //   return() => {
    //     console.log('%cGallary Unmount', 'color: blue');
    //   }
    // }, []);

    const prevHandler = () => {
      setPage(page => page - 1);
      setVisible(false);
      setDir('left');
    }

    const nextHandler = () => {
      setPage(page => page + 1);
      setVisible(false);
      setDir('right');
    }

    // console.log(visible)


  if(isLoading) return <Loading hasMargin/>;
  if(isError) return <Error>Error!!</Error>


  return (
      <GalleryContainer >
        {
          searchState ? <SearchCard /> 
          : <CardList apiData={data.data} setLiked={setLiked} setModal={setModal} dir={dir} page={page} isFetched={isFetched} isLoading={isLoading} visible={visible} setVisible={setVisible} liked={liked}/>
          
        }
        {/* {
          searchState ? <InfiniteSearch /> 
          : <CardList apiData={data.data} setLiked={setLiked} setModal={setModal} dir={dir} page={page} isFetched={isFetched}/>
        } */}
        {
          !searchState && (
            <PageHandler>
              <Btn 
                disabled={page <= 1}
                onClick={prevHandler}
              >
                Prev
              </Btn>
              <PageNum>{page}</PageNum>
              <Btn
                onClick={nextHandler}
              >
                Next
              </Btn>
            </PageHandler>
          )
        }
      </GalleryContainer>
  )
}

export default Gallery;

const GalleryContainer = styled.div`
  padding: 1rem;
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


const PageHandler = styled.div`
`
const PageNum = styled.span`
  display: inline-block;
  margin: 0 2rem;
  font-weight: bold;
  font-size: 1.5rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
  line-height: 1.5rem;
`

const Btn = styled.button`
  font-weight: bold;
  border: none;
  background-color: transparent;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, .5);
  padding: .5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    color: #6200ee;
  } 

  &:active {
    transform: scale(1.1);
  }

  @media (max-width: 240px) {
    & + & {
      margin-left: 2rem;
    }
  }
  ${props => props.disabled && `
    cursor: x;
    &: hover {
      color: darkgray;
    }
    &:active {
      transform: scale(1);
    }
  `}
`