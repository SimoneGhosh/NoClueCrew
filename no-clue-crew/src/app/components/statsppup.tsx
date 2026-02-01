import ReactDOM from "react-dom";


interface StatsPopupProps {
  happiness: number;
  wealth: number;
  onClose: () => void;
  coords: { top: number; left: number; height: number; width: number };
}


const StatsPopup: React.FC<StatsPopupProps> = ({ happiness, wealth, onClose, coords }) => {
  if (!coords) return null;
  // Conditional styles or messages for happiness
  let happinessLabel = " "
  let happinessColor = "black";
  if (happiness >= 50) {
    happinessLabel = "❤️";
    happinessColor = "green";
  } else {
    happinessLabel = "💔 ";
    happinessColor = "red";
  }

  // Conditional styles or messages for wealth
  let wealthLabel = " ";
  let wealthColor = "black";
  if (wealth >= 500) {
    wealthLabel = "💵 ";
    wealthColor = "green";
  } else {
    wealthLabel = "❌ ";
    wealthColor = "red";
  }

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-label="Character stats"
      style={{
        position: "absolute",
        top: coords.top,       // align vertically with button
        left: coords.left + coords.width + 8, // right of button + spacing
        background: "#cbeecdf4",
        color: "black",
        border: "4px solid #84bf86",
        padding: 16,
        borderRadius: 8,
        minWidth: 220,
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ marginBottom: 8, fontWeight: 600 }}>Monty's Stats</div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{happinessLabel} Happiness</span>
        <span style={{ color: happinessColor }}>{happiness}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{wealthLabel} Wealth</span>
        <span style={{ color: wealthColor }}>{wealth}</span>
      </div>
      <div style={{ textAlign: "right", marginTop: 12 }}>
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#cbeecdf4",
            border: "2px solid #84bf86",
            borderRadius: 8,
            color: "black",
            width: "100%",
            height: 40,
            padding: 16,
            boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
          }}
          onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
};

export default StatsPopup;
