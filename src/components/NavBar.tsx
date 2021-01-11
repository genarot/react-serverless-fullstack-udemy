import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import UseTheme from "../hooks/UseTheme";
import { Accent } from "../styled/Random";
import {
  StyledLink,
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
} from "../styled/StyledNavbar";
type Props = { toggleTheme: Function };

export const NavBar = (props: Props) => {
  // const [_, toggleTheme] = UseTheme();

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
        {!isAuthenticated && (
          <li>
            <button onClick={loginWithRedirect}>Login</button>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={() => logout()}>Logout</button>
          </li>
        )}
        <button
          onClick={function () {
            // @ts-ignore
            props.toggleTheme();
          }}
        >
          ToggleTheme
        </button>
      </StyledNavItems>
    </StyledNavbar>
  );
};
