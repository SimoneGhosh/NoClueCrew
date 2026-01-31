// components/start.tsx
"use client";

import React, { useState, useEffect } from "react";
import YearModal from "./modal";
import dataArray from "./gamestory";

const Main: React.FC = () => {
  const baseAge = 14; // starting age
  const [showStory, setShowStory] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);
  const [hasChosen, setHasChosen] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [educationalContent, setEducationalContent] = useState<string>("");
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [lastChoice, setLastChoice] = useState<"A" | "B" | null>(null);

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
    // Reset learn more state when opening new modal
    setShowLearnMore(false);
    setEducationalContent("");
    setLastChoice(null);
    
    if (!currentStory) {
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
  
  const fetchEducationalContent = async (choice: "A" | "B", story: any) => {
    setIsLoadingContent(true);

    const choiceText = choice === "A" ? story.choiceA : story.choiceB;
    const resultText = choice === "A" ? story.resultA : story.resultB;

    try {
      const res = await fetch("/api/generateOutcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "learnMore",
          age: story.age,
          choiceText,
          resultText,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "API error");
      }

      const json = await res.json();
      // server should return { text: "..." }
      if (json?.text) {
        setEducationalContent(json.text);
      } else {
        setEducationalContent("Sorry, no generated content was returned.");
      }
    } catch (error) {
      console.error("Error fetching educational content:", error);
      setEducationalContent("Oops! Something went wrong. Please try the Learn More button again.");
    } finally {
      setIsLoadingContent(false);
    }
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
    setLastChoice(choice);
    setShowLearnMore(true);

    const effects = choice === "A" ? story.choiceAeffects : story.choiceBeffects;
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
    setShowStory(false);
  };

  const handleLearnMoreClick = () => {
    if (lastChoice && currentStory) {
      // Find the story that was just completed (before age advancement)
      const completedStory = dataArray.data.stories.find((s) => 
        s.age === (age! - (currentStory.increaseAge || 0))
      ) || currentStory;
      
      fetchEducationalContent(lastChoice, completedStory);
    }
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
          overflowY: "auto",
        }}
      >
        <button 
          onClick={handleIncreaseAge} 
          style={{ 
            background: "#FADADD",
            color: "#4A3F35",
            border: "none",
            borderRadius: 20,
            padding: "10px 18px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
        >
          Increase Age
        </button>

        {age !== null && <p style={{ color: "black", fontWeight: 600 }}>Character age: {age}</p>}
        
        {outcome && (
          <div style={{ 
            padding: "12px", 
            backgroundColor: "#f0f8ff", 
            borderRadius: "8px",
            maxWidth: "90%"
          }}>
            <p style={{ color: "black", margin: 0 }}>{outcome}</p>
          </div>
        )}

        {showLearnMore && !modalVisible && (
          <button 
            onClick={handleLearnMoreClick}
            disabled={isLoadingContent}
            style={{ 
              background: "#B8E6B8",
              color: "#2d5016",
              border: "none",
              borderRadius: 20,
              padding: "10px 18px",
              fontSize: 14,
              fontWeight: 500,
              cursor: isLoadingContent ? "wait" : "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              opacity: isLoadingContent ? 0.6 : 1,
            }}
          >
            {isLoadingContent ? "Loading..." : "💡 Learn More"}
          </button>
        )}

        {educationalContent && !modalVisible && (
          <div style={{ 
            padding: "16px", 
            backgroundColor: "#fff9e6", 
            borderRadius: "12px",
            maxWidth: "90%",
            border: "2px solid #ffd700",
            maxHeight: "300px",
            overflowY: "auto"
          }}>
            <h4 style={{ 
              color: "#2d5016", 
              marginTop: 0,
              marginBottom: "8px",
              fontSize: "16px"
            }}>
              💰 Financial Literacy Tip
            </h4>
            <p style={{ 
              color: "black", 
              margin: 0,
              textAlign: "left",
              fontSize: "13px",
              lineHeight: "1.5"
            }}>
              {educationalContent}
            </p>
          </div>
        )}
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