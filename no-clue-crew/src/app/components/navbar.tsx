"use client";

import React, { useRef, useState } from "react";
import StatsPopup from "./statsppup";
import { useGameStats } from "./GameStatsContext"; // <-- Import the context

const Navbar: React.FC = () => {
  const [showStats, setShowStats] = useState(false);
  const { wealth, happiness } = useGameStats();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonCoords, setButtonCoords] = useState<{ top: number; left: number; height: number; width: number } | null>(null);

  const toggleStats = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        height: rect.height,
        width: rect.width,
      });
    }
    setShowStats((prev) => !prev);
  };

  return (
    <nav
      style={{
        width: "400px",
        maxWidth: "96%",
        margin: "40px auto", // remove vertical margin because it's fixed
        padding: "12px 20px",
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
        overflow: "visible",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",

        // NEW: make navbar float above start.tsx and stay centered
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 18, color: "black" }}>
        MoneyGrow
      </div>

      <div>
        <button
          ref={buttonRef}
          onClick={toggleStats}
          style={{
            position: "relative",
            background: "#FADADD", // pastel pink
            color: "#4A3F35",
            fontWeight: 500,
            border: "none",
            borderRadius: 20,
            padding: "10px 18px",
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
        >
          Show Character Stats
        </button>

        {showStats && buttonCoords && (
          <StatsPopup
            wealth={wealth}
            happiness={happiness}
            coords={buttonCoords}
            onClose={() => setShowStats(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;