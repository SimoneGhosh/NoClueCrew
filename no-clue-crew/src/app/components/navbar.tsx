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
<<<<<<< HEAD
        margin: "100px auto", // center horizontally
        padding: "20px 20px",
=======
        margin: "0 auto", // remove vertical margin because it's fixed
        padding: "12px 20px",
>>>>>>> d0c9629d1670cad441e851ab496094fee37b4874
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
        MoneyGrow
      </div>

       <div>
        <button
          ref={buttonRef}
          onClick={toggleStats}
          style={{
            background: "#FADADD", // pastel pink
            color: "#4A3F35",
            border: "none",
            borderRadius: 20,
            padding: "10px 18px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
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