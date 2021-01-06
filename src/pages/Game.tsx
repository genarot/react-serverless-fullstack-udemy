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
  const MAX_SECONDS = 5;
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  const updateTime = (startTime: Date) => {
    const endDate = new Date();
    const msPassedStr = (endDate.getTime() - startTime.getTime()).toString();
    const formattedMSString = ("0000" + msPassedStr).slice(-5);
    // 00000 - first 2 are the seconds, last 3 are the ms that have passed
    // console.log(formattedMSString);
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2));
    console.log(updatedSeconds);
  };

  useEffect(() => {
    const currentTime = new Date();
    console.warn("use effect");
    const interval = setInterval(() => {
      updateTime(currentTime);
      //   setScore((prevScore) => prevScore + 1);
    }, 1);
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
