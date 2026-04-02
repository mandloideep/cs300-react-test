// ============================================================
// Section B: Checkbox, Radio, and Select
// ============================================================

import { useState } from "react";

export default function CheckboxRadioSelect() {
  const [agreed, setAgreed] = useState(false);
  const [color, setColor] = useState("blue");
  const [plan, setPlan] = useState("free");

  console.log(
    "📝 FORMS: render — agreed:",
    agreed,
    "| color:",
    color,
    "| plan:",
    plan,
  );

  return (
    <div className="demo-subsection">
      <h3>B. Checkbox, Radio &amp; Select</h3>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              console.log("📝 FORMS: checkbox toggled to", e.target.checked);
              setAgreed(e.target.checked);
            }}
          />{" "}
          I agree to the terms
        </label>
        <p>
          Agreed: <strong>{agreed ? "Yes" : "No"}</strong>
        </p>
      </div>

      <hr />

      <div className="form-group">
        <label>Favorite color:</label>
        <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
          {["red", "blue", "green"].map((c) => (
            <label key={c}>
              <input
                type="radio"
                name="color"
                value={c}
                checked={color === c}
                onChange={(e) => {
                  console.log("📝 FORMS: radio changed to", e.target.value);
                  setColor(e.target.value);
                }}
              />{" "}
              {c}
            </label>
          ))}
        </div>
        <p>
          Selected: <strong style={{ color }}>{color}</strong>
        </p>
      </div>

      <hr />

      <div className="form-group">
        <label htmlFor="plan">Plan:</label>
        <select
          id="plan"
          value={plan}
          onChange={(e) => {
            console.log("📝 FORMS: select changed to", e.target.value);
            setPlan(e.target.value);
          }}
        >
          <option value="free">Free</option>
          <option value="pro">Pro ($9/mo)</option>
          <option value="team">Team ($29/mo)</option>
        </select>
        <p>
          Current plan: <strong>{plan}</strong>
        </p>
      </div>

      <div className="demo-note">
        Checkboxes use <code>checked</code> + <code>e.target.checked</code>.
        Radios share a <code>name</code> and use <code>value</code> +{" "}
        <code>e.target.value</code>. Selects work like text inputs:{" "}
        <code>value</code> + <code>onChange</code>.
      </div>
    </div>
  );
}
