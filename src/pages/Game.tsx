import React from "react";
import {
  StyledCharacter,
  StyledGame,
  StyledScore,
  StyledTimer,
} from "../styled/Game";
import { Strong } from "../styled/Random";

export default function Game() {
  return (
    <StyledGame>
      <StyledScore>Score:0</StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time: <Strong>00: 000</Strong>
      </StyledTimer>
    </StyledGame>
  );
}
