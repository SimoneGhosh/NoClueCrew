
"use client";

import { useState } from "react";
import Landing from "./components/landingpage";
import Intro from "./components/intro";
import Backstory from "./components/backstory";
import Main from "./components/start";
import Navbar from "./components/navbar";
import FinalPage from "./components/finalPage";
import { GameStatsProvider, useGameStats } from "./components/gameStatsContext";

type Stage = "landing" | "intro" | "backstory" | "game" | "gameover";

// Move all app logic into a child component
function AppStages() {
  const [stage, setStage] = useState<Stage>("landing");
  const { setWealth, setHappiness } = useGameStats();

  const handleReset = () => {
    setWealth(500);      // or your starting value
    setHappiness(50);    // or your starting value
    setStage("landing");
  };

  return (
    <>
      {stage !== "landing" && <Navbar />}
      {stage === "landing" && <Landing onStart={() => setStage("intro")} />}
      {stage === "intro" && <Intro onNext={() => setStage("backstory")} />}
      {stage === "backstory" && <Backstory onContinue={() => setStage("game")} />}
      {stage === "game" && <Main onGameOver={() => setStage("gameover")} />}
      {stage === "gameover" && <FinalPage onReset={handleReset} />}
    </>
  );
}

export default function Home() {
  return (
    <GameStatsProvider>
      <AppStages />
    </GameStatsProvider>
  );
}