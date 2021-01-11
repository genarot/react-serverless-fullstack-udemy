import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useScore } from "../contexts/ScoreContexts";
import { StyledCharacter } from "../styled/Game";
import { StyledTitle } from "../styled/Random";
import { StyledLink } from "../styled/StyledNavbar";

const GameOver = ({ history }: any) => {
  const [score] = useScore();
  const [scoreMessage, setscoreMessage] = useState("");
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  if (score === -1) {
    history.push("/");
  }

  useEffect(() => {
    const saveHighScore = async () => {
      if (score > 0) {
        try {
          const token = await getAccessTokenSilently();
          const options = {
            method: "POST",
            body: JSON.stringify({
              name: "James" + Math.ceil(Math.random() * 56),
              score,
            }),
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const res = await fetch(".netlify/functions/saveHighScore", options);
          const data = await res.json();
          if (data.id) {
            setscoreMessage("Congrats! you got a high score!");
          } else {
            setscoreMessage("Sorry, not a high score. keep trying!!");
          }
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    if (isAuthenticated) {
      saveHighScore();
    }
  }, []);

  return (
    <div>
      <StyledTitle>GameOver</StyledTitle>
      <h2>{scoreMessage}</h2>
      {!isAuthenticated && (
        <h2>You should log in or sign up to compete for high scores!</h2>
      )}
      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to="/">Go Home</StyledLink>
      </div>
      <div>
        <StyledLink to="/game">Play again?</StyledLink>
      </div>
    </div>
  );
};

export default GameOver;
