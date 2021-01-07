import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

const ScoreContext = createContext<any>(undefined);
ScoreContext.displayName = "ScoreContext";

export const useScore = () =>
  useContext<[score: number, dispatch: Dispatch<SetStateAction<number>>]>(
    ScoreContext
  );

export const ScoreProvider = ({ children }: PropsWithChildren<any>) => {
  const [score, setScore] = useState(-1);
  return (
    <ScoreContext.Provider value={[score, setScore]}>
      {children}
    </ScoreContext.Provider>
  );
};
