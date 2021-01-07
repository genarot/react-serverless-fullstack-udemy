import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useScore } from "../contexts/ScoreContexts";
import {
  StyledCharacter,
  StyledGame,
  StyledScore,
  StyledTimer,
} from "../styled/Game";
import { Strong } from "../styled/Random";

export default function Game({ history }: RouteComponentProps<any>) {
  const [score, setScore] = useScore();
  const characters = "abcdefghijkmnopqrstuvwxyz0123859".split("");
  const [currentCharacter, setcurrentCharacter] = useState<string | null>(null);
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

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * characters.length);
    console.log("random", characters[randomInt]);
    setcurrentCharacter(characters[randomInt]);
  };

  const addLeadingZeros = (num: number, length: number) =>
    String(num).padStart(length, "0");

  useEffect(() => {
    setScore(0);
    setRandomCharacter();
    const currentTime = new Date();
    console.warn("use effect");
    const interval = setInterval(() => {
      updateTime(currentTime);
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const keyUpHandler = useCallback(
    (evt: KeyboardEvent) => {
      console.log("currentcharacter ", currentCharacter);
      if (evt.key === currentCharacter) {
        setScore((prevScore) => prevScore + 1);
      } else {
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
        }
      }
      setRandomCharacter();
    },
    [currentCharacter]
  );

  useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [keyUpHandler]);

  useEffect(() => {
    if (+seconds <= -1) {
      console.log("/gameOver");
      //TODO: save the score

      history.push("/gameOver");
    }
  }, [seconds, ms]);

  return (
    <StyledGame>
      <StyledScore>Score: {score}</StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>
        Time:{" "}
        <Strong>
          {seconds}: {ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
