"use client";

import React, { useEffect, useState } from "react";

type IntroProps = {
  onNext: () => void;
};

const Intro: React.FC<IntroProps> = ({ onNext }) => {
  const fullText = "Hewwo, I'm Monty! Manage my finances and watch me grow!";

  const [text, setText] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    const speed = 22;

    const id = setInterval(() => {
      i++;
      setText(fullText.slice(0, i));

      if (i >= fullText.length) {
        clearInterval(id);
        setDoneTyping(true);
      }
    }, speed);

    return () => clearInterval(id);
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 20,
          color: "black",
          position: "relative",
          fontFamily: "'Baloo 2', cursive",
        }}
      >
        {/* Character */}
        <img
          src="/images/happyguy.png"
          alt="Character"
          style={{ width: 240, marginLeft: "70px" }}
        />

        {/* Bubble */}
        <div
          onClick={onNext}
          className="speechBubble wiggle"
          style={{
            position: "absolute",
            top: "100px",
            left: "25px",
            backgroundColor: "#FADADD",
            padding: "14px 18px",
            borderRadius: "18px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            cursor: "pointer",
            maxWidth: 210,
          }}
        >
          {/* Typed text */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.25,
              textAlign: "left",
            }}
          >
            {text}
            {/* little cursor while typing */}
            {!doneTyping && <span className="cursor">|</span>}
          </div>

          {/* faint next appears after typing */}
          {doneTyping && (
            <div
              style={{
                fontSize: 10,
                color: "rgba(0,0,0,0.4)",
                marginTop: 6,
                textAlign: "left",
              }}
            >
              next →
            </div>
          )}

          {/* Tail */}
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              right: "20px",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid #FADADD",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
