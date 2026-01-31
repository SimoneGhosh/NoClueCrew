// components/start.tsx
"use client";

import React, { useState, useEffect } from "react";
import YearModal from "./modal";
import dataArray from "./gamestory";

const Main: React.FC = () => {
  const baseAge = 14; // starting age
  const [showStory, setShowStory] = useState(true); // start directly on background story
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);
  const [hasChosen, setHasChosen] = useState(false);

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
      
        
        <button onClick={handleIncreaseAge} style={{ padding: "8px 12px", color: "black" }}>
          Increase Age
        </button>

        {age !== null && <p style={{ color: "black" }}>Character age: {age}</p>}
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
