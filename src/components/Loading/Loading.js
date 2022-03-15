import React from "react";
import styled from 'styled-components';

function Loading() {

  return (
    <LoadingContainer>
      loading....
    </LoadingContainer>
  )
}

export default Loading;

const LoadingContainer = styled.div`
  font-size: 10rem;
`