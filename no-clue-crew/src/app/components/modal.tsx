"use client";

import React from "react";

interface YearModalProps {
  open: boolean;
  age: number | null;
  choiceA?: string;
  choiceB?: string;
  onChoose: (choice: "A" | "B") => void;
  onClose: () => void;
}

const YearModal: React.FC<YearModalProps> = ({ open, age, choiceA, choiceB, onChoose, onClose }) => {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 360,
          background: "#fff",
          borderRadius: 12,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
          color: "black",
        }}
      >
        <h3 style={{ margin: 0 }}>Choose what happens this year</h3>
        <p style={{ margin: 0 }}>{age !== null ? `Age ${age}` : ""}</p>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onChoose("A")} style={{ color: "black" }}>
            {choiceA ?? "Choice 1"}
          </button>
          <button onClick={() => onChoose("B")} style={{ color: "black" }}>
            {choiceB ?? "Choice 2"}
          </button>
        </div>

        <button onClick={onClose} style={{ marginTop: 8, color: "black" }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default YearModal;