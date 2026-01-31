import React, { createContext, useContext, useState } from "react";

type Stats = {
  wealth: number;
  setWealth: React.Dispatch<React.SetStateAction<number>>;
  happiness: number;
  setHappiness: React.Dispatch<React.SetStateAction<number>>;
};

const GameStatsContext = createContext<Stats | undefined>(undefined);

export const GameStatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wealth, setWealth] = useState(500);
  const [happiness, setHappiness] = useState(50);

  return (
    <GameStatsContext.Provider value={{wealth, setWealth, happiness, setHappiness }}>
      {children}
    </GameStatsContext.Provider>
  );
};

export const useGameStats = () => {
  const context = useContext(GameStatsContext);
  if (!context) throw new Error("useGameStats must be used within a GameStatsProvider");
  return context;
};