// components/start.tsx
"use client";

import React, { useState, useEffect } from "react";
import YearModal from "./modal";
import dataArray from "./gamestory";
import { useGameStats } from "./GameStatsContext";

const Main: React.FC = () => {
  const baseAge = 14; // starting age
  const [showStory, setShowStory] = useState(true); // start directly on background story
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);
  const [hasChosen, setHasChosen] = useState(false);
  const {wealth, setWealth, happiness, setHappiness } = useGameStats();

  // ensure age is initialized when showing the story
  useEffect(() => {
    if (showStory && age == null) {
      setAge(baseAge);
    }
  }, [showStory, age]);

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


  // Function to apply effects
  const applyChoiceEffects = (effects: { wealth: number, happiness: number}) => {
    setWealth((prev) => prev + (effects.wealth || 0));
    setHappiness((prev) => prev + (effects.happiness || 0));
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

    const effects = choice === "A" ? story.choiceAEffects : story.choiceBEffects;
    if (effects) {
      applyChoiceEffects(effects);
    }

    // advance age by story.increaseAge
    setAge((prev) => {
      const prevAge = prev ?? story.age;
      return prevAge + (Number(story.increaseAge) || 0);
    });

    setModalVisible(false);
    setHasChosen(true);
    setShowStory(false); // return to main screen per previous behavior
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
      {/* Background story shown by default */}
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
          marginTop: "-180px",
        }}
      >


        <button onClick={handleIncreaseAge} style={{
          border: "none",
          borderRadius: 20,
          padding: "10px 18px",
          fontSize: 14,
          fontWeight: 500,
          background: "#FADADD", // pastel pink
          color: "#4A3F35",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}>
          Increase Age
        </button>

        {age !== null && <p style={{ fontWeight: 700, color: "black" }}>Character age: {age}</p>}
        {outcome && <p style={{ color: "black" }}>{outcome}</p>}


      </div>

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

export default Main;
