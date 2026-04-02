// ============================================================
// Section A: Controlled Text Input
// ============================================================

import { useState } from "react";

export default function ControlledText() {
  const [name, setName] = useState("");

  console.log("📝 FORMS: render — name is:", JSON.stringify(name));

  return (
    <div className="demo-subsection">
      <h3>A. Controlled Text Input</h3>

      <div className="form-group">
        <label htmlFor="name">Your Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            console.log(
              "📝 FORMS: onChange fired — new value:",
              e.target.value,
            );
            setName(e.target.value);
          }}
          placeholder="Type your name..."
        />
      </div>

      <p>
        Hello, <strong>{name || "stranger"}</strong>!
      </p>

      <div className="demo-note">
        React controls the input: <code>value</code> locks it to state,{" "}
        <code>onChange</code> updates state on every keystroke. Remove the
        onChange to see the input become read-only.
      </div>

      <div className="demo-practical">
        <h3>When do you use controlled inputs?</h3>
        <ul>
          <li>Login / signup forms</li>
          <li>Search bars</li>
          <li>Any input where you need the value in state</li>
          <li>Real-time validation as the user types</li>
        </ul>
      </div>
    </div>
  );
}
