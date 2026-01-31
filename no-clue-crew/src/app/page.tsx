"use client";

import { useState } from "react";
import Landing from "./components/landingpage";
import Intro from "./components/intro";
import Backstory from "./components/backstory";
import Main from "./components/start";
import Navbar from "./components/navbar";

type Stage = "landing" | "intro" | "backstory" | "game";

export default function Home() {
  const [stage, setStage] = useState<Stage>("landing");

  return (
    <>
      {/* Show navbar on everything except landing */}
      {stage !== "landing" && <Navbar />}

      {stage === "landing" && <Landing onStart={() => setStage("intro")} />}

      {stage === "intro" && <Intro onNext={() => setStage("backstory")} />}

      {stage === "backstory" && <Backstory onContinue={() => setStage("game")} />}

      {stage === "game" && <Main />}
    </>
  );
}
