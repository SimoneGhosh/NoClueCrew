"use client";

import React from "react";
import { useGameStats } from "./gameStatsContext";

const FinalPage: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const { wealth, happiness } = useGameStats();

  // ending image
  const endingImage = wealth < 500 ? "/images/sad.gif" : "/images/winner.gif";

  return (
    <div
      style={{
        width: 400,
        height: 600,
        margin: "95px auto",
        padding: "20px",
        background: "#FFFDD0",
        borderRadius: 20,
        textAlign: "center",
        boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
        color: "#4A3F35",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ending Character */}
      <img
        src={endingImage}
        alt="Ending Character"
        style={{
          display: "flex",
          top: "20px",
          left: "50%",
          width: 100
        }}
      />
      <img
        src={endingImage}
        alt="Ending Character"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          width: 100
        }}
      />

      <h1 style={{ marginBottom: 16 }}>Thank You for Playing!</h1>

      <p style={{ marginBottom: 24 }}>
        You’ve reached the end of your journey.<br />
        Here’s how you finished:
      </p>

      <div style={{ fontSize: 18, marginBottom: 24 }}>
        <div>Wealth: <b>{wealth}</b></div>
        <div>Happiness: <b>{happiness}</b></div>
      </div>

      <p style={{ marginBottom: 32 }}>
        {wealth < 500
          ? "Things didn’t go as planned… but every choice is a lesson!"
          : "Amazing job! You made smart choices and built a strong future!"}
      </p>

      <button
        style={{
          background: "#FADADD",
          color: "#4A3F35",
          border: "none",
          borderRadius: 20,
          padding: "10px 24px",
          fontSize: 16,
          fontWeight: 500,
          cursor: "pointer",
        }}
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};

export default FinalPage;
