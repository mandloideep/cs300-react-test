import { useState } from "react";

// ============================================================
// Section B: Checkbox and Select
// ============================================================
// Same pattern as text inputs: state drives the value, onChange updates state.
// For checkboxes, it's `checked` instead of `value`.
// Open the browser console to follow along!

export default function CheckboxAndSelect() {
  const [agreed, setAgreed] = useState(false);
  const [color, setColor] = useState("red");

  console.log("CHECKBOX/SELECT: rendering, agreed =", agreed, ", color =", JSON.stringify(color));

  return (
    <div className="demo-subsection">
      <h3>B. Checkbox and Select</h3>
      <p className="demo-note">
        Same pattern as text inputs: state drives the value, onChange updates state.
        For checkboxes, it's <code>checked</code> instead of <code>value</code>.
      </p>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              console.log("CHECKBOX: changed to", e.target.checked);
              setAgreed(e.target.checked);
            }}
          />
          {" "}I agree to the terms
        </label>
        <p>Agreed: <strong>{agreed ? "Yes ✓" : "No ✗"}</strong></p>
      </div>

      <div className="form-group">
        <label>Favorite color:</label>
        <select
          value={color}
          onChange={(e) => {
            console.log("SELECT: changed to", JSON.stringify(e.target.value));
            setColor(e.target.value);
          }}
        >
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
        </select>
        <p>
          Selected:{" "}
          <strong style={{ color: color }}>{color}</strong>
        </p>
      </div>
    </div>
  );
}
