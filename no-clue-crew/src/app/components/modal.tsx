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
 
  const [liftedA, setLiftedA] = React.useState(false);
  const [liftedB, setLiftedB] = React.useState(false);  
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
          background: "#FFFDD0",
          border: "2px solid #dfd95f",
          borderRadius: 12,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
          color: "black",
        }}
      >
        <h3 style={{ margin: 0 }}>Choose What Monty Does Next!</h3>
        <p style={{ margin: 0, fontWeight: 600 }}>{age !== null ? `Monty's Age: ${age}` : ""}</p>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onChoose("A")} onMouseEnter={() => setLiftedA(true)}
      onMouseLeave={() => setLiftedA(false)} style={{ 
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
                                                        transform: liftedA ? "translateY(-2px)" : "none",
                                                        }}>
            {choiceA ?? "Choice 1"}
          </button>
          <button onClick={() => onChoose("B")} onMouseEnter={() => setLiftedB(true)}
      onMouseLeave={() => setLiftedB(false)}style={{ background: "#FADADD", // pastel pink
                                                        color: "#4A3F35",
                                                        border: "none",
                                                        borderRadius: 20,
                                                        padding: "10px 18px",
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        cursor: "pointer",
                                                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                                                        transition: "transform 0.15s ease, box-shadow 0.15s ease",
                                                        transform: liftedB ? "translateY(-2px)" : "none",}}>
            {choiceB ?? "Choice 2"}
          </button>
        </div>

        <p style={{ fontSize: 13, color: "gray", textAlign: "center", marginTop:1 }}>
           💡You can only make one choice per year, 
          Look at the stats and choose wisely!
        </p>

        <button onClick={onClose} style={{ marginTop: 8, color: "black", fontSize: 14 }} className="startButton">
          ❌ CANCEL
        </button>
      </div>
    </div>
  );
};

export default YearModal;