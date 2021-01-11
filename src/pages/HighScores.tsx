import { useEffect, useState } from "react";
import { StyledTitle } from "../styled/Random";
import { ScoreLI, ScoresList } from "../styled/ScoresList";

interface IScore {
  id: string;
  fields: {
    name: string;
    score: number;
  };
}

export default function HighScores() {
  const [highScores, setHighScores] = useState<IScore[]>([]);
  useEffect(() => {
    fetchHighScores();
  }, []);

  const fetchHighScores = async () => {
    try {
      const response = await fetch("/.netlify/functions/getHighScores");
      const scores = await response.json();
      console.log("getting ", scores);
      setHighScores(scores);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <StyledTitle>HighScores</StyledTitle>
      <ScoresList>
        {highScores.map((score, index) => (
          <ScoreLI key={score.id}>
            <span>{index + 1}.</span>
            {score.fields.name} - {score.fields.score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  );
}
