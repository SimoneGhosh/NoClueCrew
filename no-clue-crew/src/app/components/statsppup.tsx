import ReactDOM from "react-dom";

interface StatsPopupProps {
  health: number;
  wealth: number;
  onClose: () => void;
  coords: { top: number; left: number; height: number; width: number };
}

const StatsPopup: React.FC<StatsPopupProps> = ({ health, wealth, onClose, coords }) => {
  if (!coords) return null;

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-label="Character stats"
      style={{
        position: "absolute",
        top: coords.top,       // align vertically with button
        left: coords.left + coords.width + 8, // right of button + spacing
        background: "#fff",
        color: "green",
        padding: 16,
        borderRadius: 8,
        minWidth: 220,
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
      onClick={(e) => e.stopPropagation()}
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
      <div style={{ textAlign: "right", marginTop: 12 }}>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
};

export default StatsPopup;
