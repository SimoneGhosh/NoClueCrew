// components/start.tsx
"use client";

import React, { useState } from "react";

const Header: React.FC = () => {
  const baseAge = 7; // starting age if age was never set
  const [showStory, setShowStory] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);

  const handleStart = () => {
    setShowStory(true);
  };

  // Increase age immediately by 1, then open modal for choices
  const handleIncreaseAge = () => {
    setAge((prev) => (prev ?? baseAge) + 1);
    setModalVisible(true);
  };

  // choiceId: "c1", "c2", or "c3"
  const handleChooseOutcome = (choiceId: string) => {
    let text = "";
    if (choiceId === "c1") {
      text = `At age ${age}, Lila focused on learning a new skill that year — she earned small rewards and gained confidence.`;
    } else if (choiceId === "c2") {
      text = `At age ${age}, Lila decided to spend some savings on a meaningful purchase — it changed her experiences that year.`;
    } else {
      text = `At age ${age}, it was a quieter year: she practiced patience and saved, preparing for future choices.`;
    }

    setOutcome(text);
    setModalVisible(false);
    setShowStory(false); // return to main screen
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!showStory ? (
        <div
          style={{
            width: "400px",
            height: "600px",
            backgroundColor: "#FFFDD0",
            marginTop: "-230px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            position: "relative",
            overflow: "hidden",
            padding: "20px",
            color: "black", // make all text inside black
          }}
        >
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
              color: "black", // ensure text black inside panel
            }}
          >
            <h1 style={{ color: "black" }}>GAME TITLE</h1>
            <button
              className="startButton"
              style={{ color: "black" }}
              onClick={handleStart}
            >
              START
            </button>

            {/* Show current age and last outcome if available */}
            {age !== null && (
              <p style={{ color: "black", marginTop: "10px" }}>
                Character age: {age}
              </p>
            )}
            {outcome && (
              <p style={{ color: "black", marginTop: "8px" }}>{outcome}</p>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "400px",
            height: "600px",
            marginTop: "-230px",
            backgroundColor: "#FFFDD0",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            textAlign: "center",
            gap: "16px",
            color: "black", // story screen text black
          }}
        >
          <h1 style={{ color: "black" }}>Lila Martinez</h1>
          <p style={{ color: "black" }}>
            Lila was born above a busy bakery in a cozy apartment. 
            Her parents both worked full-time — her mom as a nurse, 
            her dad in a delivery job — and money wasn’t unlimited, 
            but they always made sure the bills were paid and there 
            was enough for small treats. As a kid, Lila got small 
            allowances and did tiny errands, learning that saving a 
            little could go a long way. At age 7, she had her first 
            big choice: spend her money on a toy robot, or save up for 
            a shiny new bike? By age 10, Lila loved keeping track of her 
            coins, dreaming about the bigger rewards waiting if she planned 
            ahead.
          </p>
          <button
            onClick={handleIncreaseAge}
            style={{ padding: "8px 12px", color: "black" }}
          >
            Increase Age
          </button>
        </div>
      )}

      {/* Modal */}
      {modalVisible && (
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
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => handleChooseOutcome("c1")} style={{ color: "black" }}>
                Choice 1
              </button>
              <button onClick={() => handleChooseOutcome("c2")} style={{ color: "black" }}>
                Choice 2
              </button>
              <button onClick={() => handleChooseOutcome("c3")} style={{ color: "black" }}>
                Neutral
              </button>
            </div>
            <button
              onClick={() => setModalVisible(false)}
              style={{ marginTop: 8, color: "black" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
