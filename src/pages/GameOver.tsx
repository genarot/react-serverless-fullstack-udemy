import { useScore } from "../contexts/ScoreContexts";
import { StyledLink } from "../styled/StyledNavbar";

const GameOver = ({ history }: any) => {
  const [score] = useScore();
  if (score === -1) {
    history.push("/");
  }
  return (
    <div>
      <h1>GameOver</h1>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play again?</StyledLink>
    </div>
  );
};

export default GameOver;
