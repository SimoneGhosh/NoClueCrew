"use client";

import React from "react";
import { useGameStats } from "./GameStatsContext";

const FinalPage: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const { wealth, happiness } = useGameStats();

  return (
    <div
      style={{
        width: 400,
        margin: "80px auto",
        padding: 32,
        background: "#FFFDD0",
        borderRadius: 20,
        textAlign: "center",
        boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
        color: "#4A3F35",
      }}
    >
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
        We hope you learned something new about money and life choices!
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