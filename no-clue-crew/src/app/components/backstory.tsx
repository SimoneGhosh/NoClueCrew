"use client";

import React, { useEffect, useState } from "react";

type BackstoryProps = {
  onContinue: () => void;
};

const Backstory: React.FC<BackstoryProps> = ({ onContinue }) => {
  const fullText = `Lila was born above a busy bakery in a cozy apartment. Her parents both worked full-time — her mom as a nurse, her dad in a delivery job — and money wasn’t unlimited, but they always made sure the bills were paid and there was enough for small treats. As a kid, Lila got small allowances and did tiny errands, learning that saving a little could go a long way.`;

  const [displayedText, setDisplayedText] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    const speed = 25;

    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i));
      i++;

      if (i > fullText.length) {
        clearInterval(interval);
        setDoneTyping(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 400,
          height: 600,
          backgroundColor: "#FFFDD0",
          borderRadius: 20,
          padding: 20,
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 16,
        }}
      >
        <h1 style={{fontWeight: 700}}>Background Story</h1>

        <p style={{ maxWidth: 320 }}>{displayedText}</p>

        {doneTyping && (
          <button onClick={onContinue} 
          style={{ background: "#FADADD", // pastel pink
            color: "#4A3F35", 
            marginTop: 20,
            border: "none",
            borderRadius: 20,
            padding: "10px 18px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",}}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Backstory;
