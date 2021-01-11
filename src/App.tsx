import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Game, GameOver, HighScores, Home } from "./pages";
import { NavBar } from "./components/NavBar";
import { Container } from "./styled/Container";
import { Main } from "./styled/Main";
import Global from "./styled/Global";
import { useAuth0 } from "@auth0/auth0-react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styled/Themes";
import UseTheme from "./hooks/UseTheme";
import Loader from "./styled/Loader";

function App() {
  const { isLoading } = useAuth0();
  const [theme, setTheme] = UseTheme();

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <Global />
        <Main>
          {isLoading ? (
            <Loader>
              <p>Loading....</p>
            </Loader>
          ) : (
            <Container>
              <NavBar toggleTheme={setTheme as any} />
              <Switch>
                <Route path="/game" component={Game} />
                <Route path="/highScores" component={HighScores} />
                <Route path="/gameOver" component={GameOver} />
                <Route path="/" component={Home} />
              </Switch>
            </Container>
          )}
        </Main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
