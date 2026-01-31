// components/start.tsx
"use client";

import React from "react";

type LandingProps = {
  onStart?: () => void;
};

const Header: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "600px",
          backgroundColor: "#FFFDD0",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          position: "relative",
          overflow: "hidden",
          zIndex: 3,
        }}
      >
        <img
          src="/images/money.png"
          className="MoneyLeft"
          style={{
            position: "absolute",
            opacity: 1,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <img
          src="/images/money.png"
          className="MoneyRight"
          style={{
            position: "absolute",
            opacity: 1,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        {/* Bush Left */}
        <img
          src="/images/bush.png"
          className="bush"
          style={{
            position: "absolute",
            bottom: "-35px",
            left: "-15px",
            width: "200px",
            opacity: 1,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
        {/* Bush Center */}
        <img
          src="/images/bush.png"
          className="bush"
          style={{
            position: "absolute",
            bottom: "-35px",
            left: "20%",
            transform: "translateX(-50%)",
            width: "200px",
            opacity: 1,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
        {/* Bush Right */}
        <img
          src="/images/bush.png"
          className="bush"
          style={{
            position: "absolute",
            bottom: "-35px",
            right: "-20px",
            width: "200px",
            opacity: 1,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
        <div
          style={{
            backgroundColor: "#eff1bf",
            padding: "30px 40px",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            zIndex: 3,
            opacity: 0.9
          }}
        >
          <h1
  style={{
    fontSize: "50px",
    fontWeight: "900",
    color: "#4CAF50",
    textShadow: `
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000,
      0 3px 3px rgba(0,0,0,0)
    `,
    fontFamily: "Comic Sans MS, Arial Black, sans-serif",
    letterSpacing: "2px",
    margin: 0,
    zIndex: 3,
    opacity: 1
  }}
>
  MoneyGrow
</h1>

          <button
            className="startButton"
            style={{ color: "black" }}
            onClick={() => {
              if (onStart) onStart();
            }}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;