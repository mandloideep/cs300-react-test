import { useState } from "react";

// ============================================================
// Section C: State Drives UI — Traffic Light
// ============================================================
// The core React idea: you change STATE, and React updates the UI.
// You never say "turn off the red light, turn on the green light."
// You say "the light is green" and React figures out the DOM changes.
// Open the browser console to follow along!

export default function TrafficLight() {
  const [light, setLight] = useState("red");

  console.log(
    "TRAFFIC LIGHT: state is",
    JSON.stringify(light),
    "→ React re-renders → UI updates automatically",
  );

  // We never say "turn off the red, turn on the green."
  // We say "the light is green" and React updates everything.
  return (
    <div className="demo-subsection">
      <h3>C. State Drives UI — Traffic Light</h3>
      <p className="demo-note">
        Click a button. The state changes to a color name. The JSX says "if
        state is red, show red at full opacity." React handles the rest.
      </p>

      <div className="traffic-light">
        <div
          className="light-circle"
          style={{
            backgroundColor: "#e74c3c",
            opacity: light === "red" ? 1 : 0.2,
          }}
        />
        <div
          className="light-circle"
          style={{
            backgroundColor: "#f1c40f",
            opacity: light === "yellow" ? 1 : 0.2,
          }}
        />
        <div
          className="light-circle"
          style={{
            backgroundColor: "#2ecc71",
            opacity: light === "green" ? 1 : 0.2,
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="btn btn-danger" onClick={() => setLight("red")}>
          Red
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setLight("yellow")}
          style={{ backgroundColor: "#f1c40f", color: "#333" }}
        >
          Yellow
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setLight("green")}
          style={{ backgroundColor: "#2ecc71" }}
        >
          Green
        </button>
      </div>

      <p>
        Current state: <strong>{light}</strong>
      </p>
      <p className="demo-note">
        The JSX is like a template: "given this state, here's what the UI looks
        like." You change state → React re-renders → UI updates. You never
        manually toggle DOM elements on/off.
      </p>
    </div>
  );
}
