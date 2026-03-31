import { useState, useEffect } from "react";

// ============================================================
// Section C: Validation with useEffect
// ============================================================
// useEffect watches the email state.
// Whenever email changes, we run validation as a side effect.
// Open the browser console to follow along!
// NOTE: In development, React StrictMode runs effects twice. This is normal!

export default function ValidationDemo() {
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
