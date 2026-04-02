// ============================================================
// Section D: Real-Time Validation
// ============================================================

import { useState } from "react";

export default function Validation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailValid = email.includes("@") && email.includes(".");
  const passwordValid = password.length >= 6;
  const formValid = emailValid && passwordValid;

  console.log(
    "📝 FORMS: validation — email:",
    emailValid,
    "| password:",
    passwordValid,
  );

  return (
    <div className="demo-subsection">
      <h3>D. Real-Time Validation</h3>

      <div className="form-group">
        <label htmlFor="v-email">Email:</label>
        <input
          id="v-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ borderColor: email && !emailValid ? "#e74c3c" : undefined }}
        />
        {email && !emailValid && (
          <p className="form-error">Must contain @ and a dot</p>
        )}
        {emailValid && (
          <p style={{ color: "#2ecc71", fontSize: "14px" }}>Valid email</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="v-pass">Password (min 6 characters):</label>
        <input
          id="v-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{
            borderColor: password && !passwordValid ? "#e74c3c" : undefined,
          }}
        />
        {password && !passwordValid && (
          <p className="form-error">
            Need {6 - password.length} more character
            {6 - password.length !== 1 ? "s" : ""}
          </p>
        )}
        {passwordValid && (
          <p style={{ color: "#2ecc71", fontSize: "14px" }}>Strong enough</p>
        )}
      </div>

      <button className="btn btn-primary" disabled={!formValid}>
        {formValid ? "Submit" : "Fill out the form"}
      </button>

      <div className="demo-note">
        Validation is <strong>derived state</strong> — computed during render,
        not stored in useState or useEffect. The button disables itself when the
        form is invalid.
      </div>
    </div>
  );
}
