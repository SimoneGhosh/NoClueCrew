"use client";

import { useState } from "react";
import Landing from "./components/landingpage";
import Backstory from "./components/backstory";
import Main from "./components/start";
import Navbar from "./components/navbar";

type Stage = "landing" | "backstory" | "game";

export default function Home() {
  const [stage, setStage] = useState<Stage>("landing");

  if (stage === "landing") {
    return <Landing onStart={() => setStage("backstory")} />;
  }

  if (stage === "backstory") {
    return <Backstory onContinue={() => setStage("game")} />;
  }

  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}
