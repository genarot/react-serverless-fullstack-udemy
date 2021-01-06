import React from "react";
import { Link } from "react-router-dom";
import { Accent } from "../styled/Random";
import {
  StyledLink,
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
} from "../styled/StyledNavbar";
type Props = {};

export const NavBar = (props: Props) => {
  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to="/">
          Learn.Build.<Accent>Type.</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to="/home">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/highScores">HighScores</StyledLink>
        </li>
      </StyledNavItems>
    </StyledNavbar>
  );
};
