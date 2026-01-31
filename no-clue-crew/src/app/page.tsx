"use client";

import { useState } from "react";
import Landing from "./components/landingpage";
import Backstory from "./components/backstory";
import Main from "./components/start";
import Navbar from "./components/navbar";
import { GameStatsProvider } from "./components/GameStatsContext"; // <-- import the provider

type Stage = "landing" | "backstory" | "game";

export default function Home() {
  const [stage, setStage] = useState<Stage>("landing");

  return (
    <GameStatsProvider>
      {stage === "landing" && <Landing onStart={() => setStage("backstory")} />}
      {stage === "backstory" && <Backstory onContinue={() => setStage("game")} />}
      {stage === "game" && (
        <>
          <Navbar />
          <Main />
        </>
      )}
    </GameStatsProvider>
  );
}
