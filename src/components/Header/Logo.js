import React from "react";
import styled from 'styled-components';

function Logo() {

  return (
    <TextLogo>
      Best Gallery
    </TextLogo>
  )
}

export default Logo;

const TextLogo = styled.h1`
  font-size: 4rem;
  font-family: var(--font-base);
  color: var(--color-golden);
  filter: drop-shadow(0 0 10px var(--color-golden)) drop-shadow(-20px -10px 40px var(--color-golden));
  padding: .5rem;
`