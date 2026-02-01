"use client";

import React, { useEffect, useState } from "react";

type BackstoryProps = {
  onContinue: () => void;
};

const Backstory: React.FC<BackstoryProps> = ({ onContinue }) => {
  const fullText = "Monty moved from a quiet farmland to a bustling little town, where every street corner holds a new surprise and she must decide how to spend, save, and share her pocket money. As she explores, Monty discovers that money, like the seeds she once planted, grows slowly with care, and that thoughtful choices can turn small coins into bigger opportunities and fun lessons for the future.";

  const [displayedText, setDisplayedText] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);
  const [lifted, setLifted] = useState(false);

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
          width: "400px",
          height: "600px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          position: "relative",
          overflow: "hidden",
          zIndex: 3,
          backgroundColor: "#FFFDD0",
          textAlign: "center",
        }}
      >
        <h1 style={{fontWeight: 700, fontSize: 20, color: "black"}}>Monty's Story...</h1>
        <p style={{ maxWidth: 320, color: "black" }}>{displayedText}</p>
        {doneTyping && (
          <button onClick={onContinue}
              onMouseEnter={() => setLifted(true)}
          onMouseLeave={() => setLifted(false)}
            style={{
              background: "#FADADD", // pastel pink
              color: "#4A3F35",
              marginTop: 5,
              border: "none",
              borderRadius: 20,
              padding: "10px 18px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              transform: lifted ? "translateY(-2px)" : "none",
              zIndex: 4,
              position: "relative"
            }}>
            Continue
          </button>
        )}
        {/* Bushes below the button */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 80, pointerEvents: "none", zIndex: 2 }}>
          {/* Bush Left */}
          <img
            src="/images/bush.png"
            className="bush"
            style={{
              position: "absolute",
              bottom: "-50px",
              left: "-15px",
              width: "250px",
              opacity: 1,
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Bush Right */}
          <img
            src="/images/bush.png"
            className="bush"
            style={{
              position: "absolute",
              bottom: "-50px",
              right: "-20px",
              width: "250px",
              opacity: 1,
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Backstory;
