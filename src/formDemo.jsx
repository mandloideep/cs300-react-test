import { useState, useEffect } from "react";

// ============================================================
// Form Demo — Controlled Inputs and Form Handling in React
// ============================================================
// In React, form inputs are "controlled" — React state is the
// single source of truth for the input's value.
// The pattern: value={state} + onChange={update state}
// Open the browser console to follow along!
// NOTE: In development, React StrictMode runs effects twice. This is normal!

// --- Section A: Controlled Text Input ---
function ControlledTextInput() {
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

// --- Section B: Checkbox and Select ---
function CheckboxAndSelect() {
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

// --- Section C: Validation with useEffect ---
function ValidationDemo() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // useEffect watches the email state.
  // Whenever email changes, we run validation as a side effect.
  useEffect(() => {
    if (email === "") {
      setEmailError("");
      console.log("VALIDATION EFFECT: email is empty, no error");
    } else if (!email.includes("@")) {
      setEmailError("Email must contain @");
      console.log("VALIDATION EFFECT: email =", JSON.stringify(email), "→ INVALID (no @)");
    } else if (!email.includes(".")) {
      setEmailError("Email must contain a domain (e.g., .com)");
      console.log("VALIDATION EFFECT: email =", JSON.stringify(email), "→ INVALID (no domain)");
    } else {
      setEmailError("");
      console.log("VALIDATION EFFECT: email =", JSON.stringify(email), "→ VALID ✓");
    }
  }, [email]); // Only re-run when email changes

  return (
    <div className="demo-subsection">
      <h3>C. Validation with useEffect</h3>
      <p className="demo-note">
        useEffect watches the email state. When it changes, validation runs as a side effect.
        Watch the console to see "VALIDATION EFFECT" fire on each change.
      </p>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          style={{
            borderColor: emailError ? "#e74c3c" : email ? "#2ecc71" : "#ccc",
          }}
        />
        {emailError && <p className="form-error">{emailError}</p>}
        {!emailError && email && (
          <p style={{ color: "#2ecc71", fontSize: 14, marginTop: 4 }}>Looks good!</p>
        )}
      </div>

      {/* Why useEffect for validation?
          - Validation is a "side effect" of the email changing
          - We could also validate in the onChange handler, but useEffect
            makes it explicit: "whenever email changes, run this"
          - This pattern scales well: you can add more validation effects
            without cluttering the onChange handler */}
    </div>
  );
}

// --- Section D: Form Submission ---
function FormSubmitDemo() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "student",
    subscribe: false,
  });

  const [submitted, setSubmitted] = useState(false);

  console.log("FORM SUBMIT: rendering, formData =", JSON.stringify(formData));

  // A helper to update one field at a time
  function updateField(field, value) {
    console.log("FORM SUBMIT: updating", field, "to", JSON.stringify(value));
    setFormData(prev => ({ ...prev, [field]: value }));
    setSubmitted(false);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Don't reload the page!
    // In React, "submitting" a form is just reading state:
    console.log("FORM SUBMIT: ============================");
    console.log("FORM SUBMIT: Form submitted with data:", formData);
    console.log("FORM SUBMIT: ============================");
    // No document.getElementById, no FormData, no DOM traversal.
    // The state IS the form data.
    setSubmitted(true);
  }

  return (
    <div className="demo-subsection">
      <h3>D. Form Submission</h3>
      <p className="demo-note">
        In React, form submission = reading state. No need for getElementById or FormData.
        Fill out the form and submit — check the console for the collected data.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => updateField("username", e.target.value)}
            placeholder="Your username"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select
            value={formData.role}
            onChange={(e) => updateField("role", e.target.value)}
          >
            <option value="student">Student</option>
            <option value="ta">Teaching Assistant</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.subscribe}
              onChange={(e) => updateField("subscribe", e.target.checked)}
            />
            {" "}Subscribe to newsletter
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit (check console)
        </button>
      </form>

      {submitted && (
        <div className="card" style={{ marginTop: 16, backgroundColor: "#eef6ff" }}>
          <strong>Submitted data (also in console):</strong>
          <pre style={{ fontSize: 14, margin: "8px 0 0" }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// --- Main Demo Component ---
export default function FormDemo() {
  return (
    <div className="demo-section">
      <h2>Forms — Controlled Inputs in React</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the scenes.
      </p>

      <ControlledTextInput />
      <CheckboxAndSelect />
      <ValidationDemo />
      <FormSubmitDemo />

      {/* Practical Use Cases */}
      <div className="demo-practical">
        <h3>When do you use controlled forms in real apps?</h3>
        <ul>
          <li><strong>Login/signup forms</strong> — collect username, password, validate as they type</li>
          <li><strong>Search bars</strong> — filter results as the user types (debounce with useEffect)</li>
          <li><strong>Settings pages</strong> — toggle preferences, choose themes, update profiles</li>
          <li><strong>Multi-step wizards</strong> — collect data across steps, submit at the end</li>
          <li><strong>Any user input</strong> — React needs to "own" the value to keep UI and state in sync</li>
        </ul>
        <p className="demo-note">
          Rule of thumb: if React needs to know about or react to an input's value, make it controlled
          (value + onChange). The state is always the "source of truth."
        </p>
      </div>
    </div>
  );
}
