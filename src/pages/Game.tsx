import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  StyledCharacter,
  StyledGame,
  StyledScore,
  StyledTimer,
} from "../styled/Game";
import { Strong } from "../styled/Random";

export default function Game({ history }: RouteComponentProps<any>) {
  const [score, setScore] = useState<number>(0);
  const MAX_SECONDS = 5;
  const [ms, setMs] = useState("0");
  const [seconds, setSeconds] = useState(MAX_SECONDS.toString());

  const updateTime = (startTime: Date) => {
    const endDate = new Date();
    const msPassedStr = (endDate.getTime() - startTime.getTime()).toString();
    const formattedMSString = String(msPassedStr).padStart(5, "0");
    // 00000 - first 2 are the seconds, last 3 are the ms that have passed
    // console.log(formattedMSString);
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2));
    const updatedMs =
      1000 -
      parseInt(formattedMSString.substring(formattedMSString.length - 3));

    setSeconds(addLeadingZeros(updatedSeconds, 2));

    setMs(addLeadingZeros(updatedMs, 3));
  };

  const addLeadingZeros = (num: number, length: number) =>
    String(num).padStart(length, "0");

  useEffect(() => {
    const currentTime = new Date();
    console.warn("use effect");
    const interval = setInterval(() => {
      updateTime(currentTime);
    }, 1);

    document.addEventListener("keyup", keyUpHandler);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  const keyUpHandler = (evt: KeyboardEvent) => {
    console.log(evt.key);
  };

  useEffect(() => {
    if (+seconds <= -1) {
      console.log("/gameOver");

      history.push("/gameOver");
    }
  }, [seconds, ms]);

  return (
    <StyledGame>
      <StyledScore>Score: {score}</StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time:{" "}
        <Strong>
          {seconds}: {ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
