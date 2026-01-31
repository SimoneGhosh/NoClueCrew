import React from "react";

interface YearModalProps {
  open: boolean;
  age: number | null;
  onChoose: (choiceId: string) => void;
  onClose: () => void;
}

const YearModal: React.FC<YearModalProps> = ({ open, age, onChoose, onClose }) => {
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
          width: "360px",
          background: "#fff",
          borderRadius: 12,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
          color: "black", // modal text black
        }}
      >
        <h3 style={{ margin: 0, color: "black" }}>Choose what happens this year</h3>
        <p style={{ margin: 0, color: "black" }}>{age !== null ? `Age ${age}` : ""}</p>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onChoose("c1")} style={{ color: "black" }}>
            Choice 1
          </button>
          <button onClick={() => onChoose("c2")} style={{ color: "black" }}>
            Choice 2
          </button>
          <button onClick={() => onChoose("c3")} style={{ color: "black" }}>
            Neutral
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