// ============================================================
// Step 2: Add Form
// ============================================================

import { useState, useRef } from "react";

let nextId = 4;

export default function Step2_AddForm() {
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: "React Docs", url: "https://react.dev", category: "Docs" },
    {
      id: 2,
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      category: "Docs",
    },
    { id: 3, title: "GitHub", url: "https://github.com", category: "Tools" },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    category: "Docs",
  });
  const titleRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title.trim() || !formData.url.trim()) return;

    const newBookmark = { id: nextId++, ...formData };
    setBookmarks((prev) => [...prev, newBookmark]);
    console.log("📚 BOOKMARKS: added", newBookmark.title);
    setFormData({ title: "", url: "", category: "Docs" });
    titleRef.current?.focus();
  }

  return (
    <div className="demo-subsection">
      <h3>Step 2: Add Form</h3>

      <form onSubmit={handleSubmit} className="bookmark-form">
        <input
          ref={titleRef}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://..."
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Docs">Docs</option>
          <option value="Tools">Tools</option>
          <option value="Tutorial">Tutorial</option>
          <option value="Other">Other</option>
        </select>
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>

      <div className="bookmark-list">
        {bookmarks.map((b) => (
          <div key={b.id} className="bookmark-card">
            <h4>{b.title}</h4>
            <p className="bookmark-url">{b.url}</p>
            <span className="bookmark-category">{b.category}</span>
          </div>
        ))}
      </div>

      <div className="demo-note">
        Controlled form with object state + array spread to add. The useRef
        auto-focuses the title input after adding. Same patterns from the Forms
        and State Patterns tabs, combined.
      </div>
    </div>
  );
}
