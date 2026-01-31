"use client";

import React, { useRef, useState } from "react";
import StatsPopup from "./statsppup";

const Navbar: React.FC = () => {
  const [showStats, setShowStats] = useState(false);
  const [health] = useState(100); // default health
  const [wealth] = useState(25); // default wealth

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
        margin: "0 auto", // remove vertical margin because it's fixed
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
        overflow: "hidden",
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
        No Clue Crew
      </div>

       <div>
        <button
          ref={buttonRef}
          onClick={toggleStats}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "5px solid rgba(9,121,54,0.89)",
            background: "#fff",
            color: "green",
            cursor: "pointer",
          }}
        >
          Show Character Stats
        </button>

         {showStats && buttonCoords && (
          <StatsPopup
            health={health}
            wealth={wealth}
            coords={buttonCoords}
            onClose={() => setShowStats(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;