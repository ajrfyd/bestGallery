import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import CardList from "../../components/Gallery/CardList";
import CardContainer from "../../components/Gallery/CardContainer";
import SearchCard from "../../components/Gallery/ SearchCard";
import Loading from "../../components/Loading/Loading";
import { useQuery, useQueryClient } from "react-query";
import utils from "../../utils";
import Error from "../../components/Notification/Error";

const Gallery = ({ apiData, searchState, setModal }) => {
  const [page, setPage] = useState(1);
  const [liked, setLiked] = useState(false);
  const [dir, setDir] = useState('right');
  
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isFetched } = useQuery(
    ['getMainImgs', page],
    () => utils.getMainImgs(page),
    {
      // keepPreviousData: true,
      cacheTime: 0,
      // enabled: !!liked,
      refetchOnWindowFocus: false,
      // onSuccess: data => {
      //   queryClient.invalidateQueries('')
      // }
    }
    )

    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
      if(!isLoading && data) {
        setVisible(true)
      }
    }, [isLoading, data])

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


  // if(isLoading) return <Loading hasMargin/>;
  // if(isError) return <Error>Error!!</Error>


  return (
      <GalleryContainer >
        {
          isLoading && <Loading />
        }
        {
          isError && <Error />
        }
        {
          data && <CardContainer apiData={data} setLiked={setLiked} setModal={setModal} visible={visible} dir={dir}/>
        }
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
      </GalleryContainer>
  )
}

export default Gallery;

const GalleryContainer = styled.div`
  padding: 1rem;
  text-align: center;
  /* border: 5px dashed red; */
  /* height: 100vh; */
`

// const Error = styled.div`
//   display: flex;
//   font-size: 5rem;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
// `
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