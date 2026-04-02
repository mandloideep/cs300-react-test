// ============================================================
// Section B: Array — Add Items
// ============================================================

import { useState } from "react";

let nextId = 4;

export default function ArrayAdd() {
  const [items, setItems] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a project" },
    { id: 3, text: "Deploy to Vercel" },
  ]);
  const [newItem, setNewItem] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (!newItem.trim()) return;

    const item = { id: nextId++, text: newItem.trim() };
    setItems((prev) => [...prev, item]);
    console.log(
      "🔧 STATE: added item —",
      item.text,
      "| total:",
      items.length + 1,
    );
    setNewItem("");
  }

  return (
    <div className="demo-subsection">
      <h3>B. Array — Add Items</h3>

      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
      >
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New item..."
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>

      <div className="demo-note">
        Spread to add: <code>{"[...prev, newItem]"}</code> creates a new array
        with the existing items plus the new one at the end.
      </div>
    </div>
  );
}
