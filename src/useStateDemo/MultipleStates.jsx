import { useState } from "react";

// ============================================================
// Section D: Multiple State Variables
// ============================================================
// Each useState call is independent. Changing one doesn't affect the other.
// React remembers them by the ORDER they are called.
// This is why hooks must not be called inside conditions or loops.
// Open the browser console to follow along!

export default function MultipleStates() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  console.log(
    "MULTIPLE STATES: rendering with name =",
    JSON.stringify(name),
    "age =",
    age,
  );

  return (
    <div className="demo-subsection">
      <h3>D. Multiple State Variables</h3>
      <p className="demo-note">
        Change one input. Watch the console — the component re-renders, but the
        OTHER state stays the same.
      </p>
      <div style={{ marginBottom: 8 }}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            console.log(
              "MULTIPLE STATES: name changing to",
              JSON.stringify(e.target.value),
            );
            setName(e.target.value);
          }}
          style={{ padding: "4px 8px", marginLeft: 8 }}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Age: </label>
        <button
          className="btn btn-secondary"
          onClick={() => {
            console.log("MULTIPLE STATES: age incrementing");
            setAge((prev) => prev + 1);
          }}
        >
          {age} (click to increment)
        </button>
      </div>
      <p>
        Current values — name: "<strong>{name}</strong>", age:{" "}
        <strong>{age}</strong>
      </p>
      {/* Each useState call tracks ONE piece of state.
          React remembers them by the ORDER they are called.
          This is why hooks must not be called inside conditions or loops. */}
    </div>
  );
}
