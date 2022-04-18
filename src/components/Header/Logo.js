import React from "react";
import styled from 'styled-components';
import TypeIt from "typeit-react";

const Logo = () => {

  return (
    <TextLogo>
      <TypeIt
        getBeforeInit={(instance) => {
          instance.type("Best Gallaxy").pause(750).delete(3).pause(500).type("ery");

          // Remember to return it!
          return instance;
        }}
      />
      {/* Best Gallery */}
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
  letter-spacing: 3px;
`