// ============================================================
// Section B: POST Example
// ============================================================

import { useState } from "react";

export default function PostExample() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    console.log("🌐 FETCH: sending POST request...");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, body, userId: 1 }),
        },
      );

      if (!response.ok) throw new Error("POST failed");
      const data = await response.json();
      console.log("🌐 FETCH: POST success — id:", data.id);
      setResult(data);
      setTitle("");
      setBody("");
    } catch (err) {
      console.log("🌐 FETCH: POST error —", err.message);
      setResult({ error: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="demo-subsection">
      <h3>B. POST Example</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title">Title:</label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body">Body:</label>
          <textarea
            id="post-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Post content"
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

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Create Post"}
        </button>
      </form>

      {result && !result.error && (
        <div className="card" style={{ marginTop: "16px" }}>
          <h4>Server Response:</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {result?.error && (
        <p className="form-error" style={{ marginTop: "16px" }}>
          Error: {result.error}
        </p>
      )}

      <div className="demo-note">
        POST sends data to the server. Set <code>method: "POST"</code>, add{" "}
        <code>Content-Type</code> header, and <code>JSON.stringify</code> the
        body. Disable the submit button while sending to prevent double-clicks.
      </div>

      <div className="demo-practical">
        <h3>When do you use fetch?</h3>
        <ul>
          <li>Loading data when a page/component mounts</li>
          <li>Submitting form data to a server</li>
          <li>Deleting or updating records via API</li>
          <li>We'll go much deeper in Week 13!</li>
        </ul>
      </div>
    </div>
  );
}
