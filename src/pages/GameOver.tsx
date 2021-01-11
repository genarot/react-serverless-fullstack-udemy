import { useEffect, useState } from "react";
import { useScore } from "../contexts/ScoreContexts";
import { StyledCharacter } from "../styled/Game";
import { StyledLink } from "../styled/StyledNavbar";

const GameOver = ({ history }: any) => {
  const [score] = useScore();
  const [scoreMessage, setscoreMessage] = useState("");
  if (score === -1) {
    history.push("/");
  }

  useEffect(() => {
    const saveHighScore = async () => {
      if (score > 0) {
        try {
          const options = {
            method: "POST",
            body: JSON.stringify({ name: "James", score }),
          };
          const res = await fetch(".netlify/functions/saveHighScore", options);
          const data = await res.json();
          if (data.id) {
            setscoreMessage("Congrats! you got a high score!");
          } else {
            setscoreMessage("Sorry, not a high score keep trying!!");
          }
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    saveHighScore();
  }, []);

  return (
    <div>
      <h1>GameOver</h1>
      <StyledCharacter>{score}</StyledCharacter>
      <p>{scoreMessage}</p>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play again?</StyledLink>
    </div>
  );
};

export default GameOver;
