import { useEffect, useState } from "react";
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
      <h1>HighScores</h1>
      <ScoresList>
        {highScores.map((score) => (
          <ScoreLI key={score.id}>
            {score.fields.name} - {score.fields.score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  );
}
