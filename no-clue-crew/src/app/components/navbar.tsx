"use client";

import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [showStats, setShowStats] = useState(false);
  const [health] = useState(100); // default health
  const [wealth] = useState(25); // default wealth

  return (
    <nav
      style={{
        width: "400px",
        maxWidth: "96%",
        margin: "100px auto", // center horizontally
        padding: "20px 20px",
        background: "#FFFDD0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        color: "black",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 16, // rounded edges
        maxHeight: 200, // maximum height 200px
        height: "auto",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 18, color: "black" }}>
        No Clue Crew
      </div>

      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowStats((s) => !s)}
          aria-expanded={showStats}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#fff",
            color: "black",
            cursor: "pointer",
          }}
        >
          Show Character Stats
        </button>

        {showStats && (
          <div
            role="dialog"
            aria-label="Character stats"
            style={{
              position: "absolute",
              zIndex: 100,
              right: 0,
              marginTop: 8,
              background: "#fff",
              color: "black",
              padding: 12,
              borderRadius: 8,
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              minWidth: 180,
            }}
          >
            <div style={{ marginBottom: 8, fontWeight: 600 }}>Character</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Health</span>
              <span>{health}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Wealth</span>
              <span>{wealth}</span>
            </div>
            <div style={{ textAlign: "right", marginTop: 8 }}>
              <button
                onClick={() => setShowStats(false)}
                style={{
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "#eff1bf",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;