import React from "react";
import styled from 'styled-components';
import Card from "./Card";

const CardContainer = ({ apiData, setLiked, setModal }) => {
  console.log(apiData);
  const { data } = apiData;
  console.log(data);

  // { url, likes, id, url2, setLiked, setModal, liked }
  return (
    <Container>
      {
        data.map(item => (
          <Card key={item.id} url={item.urls.small} likes={item.likes} id={item.id} setLiked={setLiked} setModal={setModal}/>
        ))
      }
    </Container>
  )
}

export default CardContainer;

const Container = styled.div`
  width: 100%;
  height: 100%;
  /* border: 5px solid #6200ee; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`