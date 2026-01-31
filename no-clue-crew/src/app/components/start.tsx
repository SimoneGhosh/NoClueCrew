// components/start.tsx
"use client";

import React, { useState } from "react";
import YearModal from "./modal";
import dataArray from "./gamestory";

const Header: React.FC = () => {
  const baseAge = 14; // starting age
  const [showStory, setShowStory] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);
  const [hasChosen, setHasChosen] = useState(false);

  const handleStart = () => {
    setAge(baseAge);
    setShowStory(true);
    setOutcome(null);
    setHasChosen(false);
  };

  const currentStory = (() => {
    if (age == null) return undefined;
    return dataArray.data.stories.find((s) => s.age === age);
  })();

  const handleIncreaseAge = () => {
    // open modal for current age story choices
    if (!currentStory) {
      // no story for this age — try to find first story matching >= age
      const fallback = dataArray.data.stories.find((s) => s.age >= (age ?? baseAge));
      if (fallback) {
        setAge(fallback.age);
      }
    }
    setModalVisible(true);
  };

  const handleChooseOutcome = (choice: "A" | "B") => {
    const story = currentStory ?? dataArray.data.stories.find((s) => s.age === (age ?? baseAge));
    if (!story) {
      setOutcome("No story available for this age.");
      setModalVisible(false);
      setHasChosen(true);
      return;
    }

    const resultText = choice === "A" ? story.resultA : story.resultB;
    setOutcome(resultText);

    // advance age by story.increaseAge
    setAge((prev) => {
      const prevAge = prev ?? story.age;
      return prevAge + (Number(story.increaseAge) || 0);
    });

    setModalVisible(false);
    setHasChosen(true);
    setShowStory(false); // return to main screen per prompt
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "240px",
        boxSizing: "border-box",
      }}
    >
      {!showStory ? (
        <div
          style={{
            width: 400,
            height: 600,
            backgroundColor: "#FFFDD0",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            position: "relative",
            overflow: "hidden",
            padding: 20,
            color: "black",
          }}
        >
          <div
            style={{
              backgroundColor: "#eff1bf",
              padding: "30px 40px",
              borderRadius: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              color: "black",
            }}
          >
            <h1 style={{ color: "black" }}>{hasChosen ? "CONTINUE" : "GAME TITLE"}</h1>

            {!hasChosen ? (
              <button onClick={handleStart} style={{ color: "black" }}>
                START
              </button>
            ) : (
              <button
                onClick={() => {
                  // Continue could re-open story view
                  setShowStory(true);
                }}
                style={{ color: "black" }}
              >
                CONTINUE
              </button>
            )}

            {age !== null && <p style={{ color: "black" }}>Character age: {age}</p>}
            {outcome && <p style={{ color: "black" }}>{outcome}</p>}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: 400,
            height: 600,
            backgroundColor: "#FFFDD0",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            textAlign: "center",
            gap: 16,
            color: "black",
          }}
        >
          <h1 style={{ color: "black" }}>Background Story</h1>
          <p style={{ color: "black" }}>
            Lila was born above a busy bakery in a cozy apartment. Her parents both worked full-time — her mom as a nurse,
            her dad in a delivery job — and money wasn’t unlimited, but they always made sure the bills were paid and there
            was enough for small treats. As a kid, Lila got small allowances and did tiny errands, learning that saving a
            little could go a long way.
          </p>

          <button onClick={handleIncreaseAge} style={{ padding: "8px 12px", color: "black" }}>
            Increase Age
          </button>
        </div>
      )}

      <YearModal
        open={modalVisible}
        age={currentStory ? currentStory.age : age}
        choiceA={currentStory ? currentStory.choiceA : undefined}
        choiceB={currentStory ? currentStory.choiceB : undefined}
        onChoose={handleChooseOutcome}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};

export default Header;
