import React, { useEffect, useState } from "react";
import {
  StyledCharacter,
  StyledGame,
  StyledScore,
  StyledTimer,
} from "../styled/Game";
import { Strong } from "../styled/Random";

export default function Game() {
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    console.warn("use effect");
    const interval = setInterval(() => {
      setScore((prevScore) => prevScore + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <StyledGame>
      <StyledScore>Score: {score}</StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time: <Strong>00: 000</Strong>
      </StyledTimer>
    </StyledGame>
  );
}
