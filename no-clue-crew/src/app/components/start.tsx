// components/start.tsx
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import React from "react";

const Header: React.FC = () => {
  return (
    <div style={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
      <div style={{
        width: "400px",
        height: "600px",
        backgroundColor: "#FFFDD0",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        position: "relative",
        overflow: "hidden"
        
      }}>
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
    pointerEvents: "none"
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
    pointerEvents: "none"
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
    pointerEvents: "none"
  }}
/>
<div style={{
  backgroundColor: "#eff1bf",
  padding: "30px 40px",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px"

}}
>
        <h1 style={{
          color: "black"
        }}>GAME TITLE</h1>
        <button className="startButton" style={{
          color: "black"
        }}>START</button>
        </div>
    </div>
    </div>
  );
};

export default Header;