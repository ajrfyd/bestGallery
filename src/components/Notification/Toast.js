import React,{ useState, useEffect } from "react";
import styled from 'styled-components';

const Toast = ({ disappearTime, text, }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    setTimeout(() => {
      if(mounted) {
        setIsFading(true);
      }
    }, disappearTime - 500)

    return () => {
      mounted = false;
    }
  }, [])

  return (
    <Container className={isFading ? 'fadeOut' : ''}>
      {text}
    </Container>
  )
}

export default Toast;

const Container = styled.div`
  color: #fff;
  background: #6200ee;
  opacity: .9;
  box-shadow: 0 0 8px rgba(255, 255, 255, .8);
  animation: fadeInLeft .6s;
  transition: .3s ease;

  padding: .5rem 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  
  &.fadeOut {
    opacity: 0;
    transform: opacity 3s;
  }

  @keyframes fadeInLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0)
    }
  }

`