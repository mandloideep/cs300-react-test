// ============================================================
// Section C: Multi-Field Form with Object State
// ============================================================

import { useState } from "react";

export default function MultiFieldForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    console.log("📝 FORMS: updating", name, "to", value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="demo-subsection">
      <h3>C. Multi-Field Form (Object State)</h3>

      <div className="form-group">
        <label htmlFor="mf-name">Name:</label>
        <input
          id="mf-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="mf-email">Email:</label>
        <input
          id="mf-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="mf-role">Role:</label>
        <select
          id="mf-role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="ta">Teaching Assistant</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>

      <div className="card">
        <h4>Current State:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>

      <div className="demo-note">
        One handler for all fields! The <code>name</code> attribute on each
        input matches the state key. <code>[name]: value</code> is a computed
        property name. The spread <code>...prev</code> keeps the other fields
        unchanged.
      </div>
    </div>
  );
}
