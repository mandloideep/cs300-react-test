// ============================================================
// Section E: Form Submission
// ============================================================

import { useState } from "react";

export default function FormSubmission() {
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [submitted, setSubmitted] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("📝 FORMS: submitted!", formData);
    setSubmitted({ ...formData });
    setFormData({ title: "", body: "" });
  }

  return (
    <div className="demo-subsection">
      <h3>E. Form Submission</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fs-title">Title:</label>
          <input
            id="fs-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Post title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fs-body">Body:</label>
          <textarea
            id="fs-body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Write something..."
            rows={3}
            style={{
              width: "100%",
              maxWidth: "300px",
              padding: "8px",
              fontSize: "16px",
            }}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Submit Post
        </button>
      </form>

      {submitted && (
        <div className="card" style={{ marginTop: "16px" }}>
          <h4>Submitted Data:</h4>
          <p>
            <strong>Title:</strong> {submitted.title}
          </p>
          <p>
            <strong>Body:</strong> {submitted.body}
          </p>
        </div>
      )}

      <div className="demo-note">
        Use <code>&lt;form onSubmit&gt;</code> instead of a button onClick. Call{" "}
        <code>e.preventDefault()</code> to stop the page from reloading. After
        submit: save the data, then reset state to clear the form.
      </div>
    </div>
  );
}
