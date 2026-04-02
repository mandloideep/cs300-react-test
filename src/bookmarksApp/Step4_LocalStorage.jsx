// ============================================================
// Step 4: localStorage Persistence
// ============================================================

import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "demo-bookmarks";
let nextId = 100;

export default function Step4_LocalStorage() {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    console.log(
      "📚 BOOKMARKS: loading from localStorage —",
      saved ? "found data" : "empty",
    );
    if (saved) {
      const parsed = JSON.parse(saved);
      nextId = Math.max(...parsed.map((b) => b.id), 0) + 1;
      return parsed;
    }
    return [
      {
        id: 1,
        title: "React Docs",
        url: "https://react.dev",
        category: "Docs",
      },
      {
        id: 2,
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        category: "Docs",
      },
      { id: 3, title: "GitHub", url: "https://github.com", category: "Tools" },
    ];
  });

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    category: "Docs",
  });
  const [search, setSearch] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    console.log(
      "💾 BOOKMARKS: saved",
      bookmarks.length,
      "bookmarks to localStorage",
    );
  }, [bookmarks]);

  const filtered = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.url.toLowerCase().includes(search.toLowerCase()),
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title.trim() || !formData.url.trim()) return;
    setBookmarks((prev) => [...prev, { id: nextId++, ...formData }]);
    console.log("📚 BOOKMARKS: added", formData.title);
    setFormData({ title: "", url: "", category: "Docs" });
    titleRef.current?.focus();
  }

  function handleDelete(id, title) {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    console.log("📚 BOOKMARKS: deleted", title);
  }

  return (
    <div className="demo-subsection">
      <h3>Step 4: localStorage Persistence</h3>

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

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search bookmarks..."
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          marginBottom: "16px",
        }}
      />

      <p>
        {filtered.length} of {bookmarks.length} bookmarks shown
      </p>

      <div className="bookmark-list">
        {filtered.map((b) => (
          <div key={b.id} className="bookmark-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <div>
                <h4>{b.title}</h4>
                <p className="bookmark-url">{b.url}</p>
                <span className="bookmark-category">{b.category}</span>
              </div>
              <button
                className="btn btn-danger"
                style={{ padding: "4px 10px", fontSize: "12px" }}
                onClick={() => handleDelete(b.id, b.title)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="demo-note">
        Now bookmarks persist! Switch to another tab and come back — your data
        is still here. The lazy initializer loads from localStorage on mount,
        and the useEffect saves on every change. This is exactly what Assignment
        4 requires for state persistence.
      </div>
    </div>
  );
}
