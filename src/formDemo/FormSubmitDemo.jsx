import { useState } from "react";

// ============================================================
// Section D: Form Submission
// ============================================================
// In React, "submitting" a form is just reading state.
// No document.getElementById, no FormData, no DOM traversal.
// The state IS the form data.
// Open the browser console to follow along!

export default function FormSubmitDemo() {
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
