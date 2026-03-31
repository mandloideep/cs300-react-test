import { useState } from "react";

// ============================================================
// Section A: Controlled Text Input
// ============================================================
// React owns the value. The input shows whatever state says.
// onChange updates state → re-render → input shows new value.
// Open the browser console to follow along!

export default function ControlledTextInput() {
  const [name, setName] = useState("");

  console.log("CONTROLLED INPUT: rendering, name =", JSON.stringify(name));

  return (
    <div className="demo-subsection">
      <h3>A. Controlled Text Input</h3>
      <p className="demo-note">
        React owns the value. The input shows whatever state says.
        onChange updates state → re-render → input shows new value.
        Watch the console on every keystroke!
      </p>

      <div className="form-group">
        <label>Your name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            console.log("CONTROLLED INPUT: onChange fired, new value =", JSON.stringify(e.target.value));
            setName(e.target.value);
          }}
          placeholder="Type your name..."
        />
      </div>

      <p>Hello, <strong>{name || "..."}</strong>!</p>

      {/* The cycle:
          1. User types "A"
          2. onChange fires → setName("A")
          3. React re-renders → name is now "A"
          4. Input's value={name} shows "A"

          This is a "controlled" input — React controls what's displayed.
          If you remove onChange, the input becomes READ-ONLY (try it!). */}
    </div>
  );
}
