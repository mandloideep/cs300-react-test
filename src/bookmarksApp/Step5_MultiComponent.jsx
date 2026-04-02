// ============================================================
// Step 5: Multi-Component Architecture
// ============================================================

import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "demo-bookmarks-v2";
let nextId = 100;

// ---- SearchBar Component ----
function SearchBar({ search, onSearchChange }) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search bookmarks..."
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "8px",
        fontSize: "16px",
        marginBottom: "16px",
      }}
    />
  );
}

// ---- BookmarkForm Component ----
function BookmarkForm({ onAdd }) {
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
    onAdd(formData);
    setFormData({ title: "", url: "", category: "Docs" });
    titleRef.current?.focus();
  }

  return (
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
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="Docs">Docs</option>
        <option value="Tools">Tools</option>
        <option value="Tutorial">Tutorial</option>
        <option value="Other">Other</option>
      </select>
      <button className="btn btn-primary" type="submit">
        Add
      </button>
    </form>
  );
}

// ---- BookmarkList Component ----
function BookmarkList({ bookmarks, onDelete }) {
  if (bookmarks.length === 0) {
    return <p>No bookmarks found.</p>;
  }

  return (
    <div className="bookmark-list">
      {bookmarks.map((b) => (
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
              onClick={() => onDelete(b.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Parent Component (owns all state) ----
export default function Step5_MultiComponent() {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
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

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    console.log("📚 BOOKMARKS: saved", bookmarks.length, "bookmarks");
  }, [bookmarks]);

  const filtered = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.url.toLowerCase().includes(search.toLowerCase()),
  );

  function handleAdd(data) {
    setBookmarks((prev) => [...prev, { id: nextId++, ...data }]);
    console.log("📚 BOOKMARKS: added", data.title);
  }

  function handleDelete(id) {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    console.log("📚 BOOKMARKS: deleted bookmark id", id);
  }

  return (
    <div className="demo-subsection">
      <h3>Step 5: Multi-Component Architecture</h3>

      <BookmarkForm onAdd={handleAdd} />
      <SearchBar search={search} onSearchChange={setSearch} />

      <p>
        {filtered.length} of {bookmarks.length} bookmarks shown
      </p>

      <BookmarkList bookmarks={filtered} onDelete={handleDelete} />

      <div className="demo-note">
        Same app, now split into <strong>3 components</strong>:
        <ul>
          <li>
            <strong>BookmarkForm</strong> — owns its own form state, calls{" "}
            <code>onAdd</code> prop
          </li>
          <li>
            <strong>SearchBar</strong> — controlled by parent via{" "}
            <code>search</code> + <code>onSearchChange</code>
          </li>
          <li>
            <strong>BookmarkList</strong> — receives <code>bookmarks</code> and{" "}
            <code>onDelete</code> as props
          </li>
        </ul>
        The parent owns bookmarks state, search state, and localStorage logic.
        This is exactly the architecture Assignment 4 requires: 3+ components
        communicating via props.
      </div>
    </div>
  );
}
