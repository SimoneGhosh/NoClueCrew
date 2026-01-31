"use client";

import React, { useState } from "react";
import Main from "./components/start";
import Navbar from "./components/navbar";
import Landing from "./components/landingpage";

export default function Home() {
  const [started, setStarted] = useState(false);

  const goToMain = () => {
    setStarted(true);
  };

  return (
    <>
      {started ? (
        <>
          <Navbar />
          <Main />
        </>
      ) : (
        <Landing onStart={goToMain} />
      )}
    </>
  );
}

