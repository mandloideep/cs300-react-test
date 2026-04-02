// ============================================================
// Section C: Array — Remove Items
// ============================================================

import { useState } from "react";

export default function ArrayRemove() {
  const [fruits, setFruits] = useState([
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
    { id: 4, name: "Dragonfruit" },
    { id: 5, name: "Elderberry" },
  ]);

  function handleRemove(id, name) {
    setFruits((prev) => prev.filter((f) => f.id !== id));
    console.log("🔧 STATE: removed", name, "| remaining:", fruits.length - 1);
  }

  return (
    <div className="demo-subsection">
      <h3>C. Array — Remove Items</h3>

      {fruits.length === 0 && <p>All fruits removed! Refresh to start over.</p>}

      <ul>
        {fruits.map((fruit) => (
          <li
            key={fruit.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            {fruit.name}
            <button
              className="btn btn-danger"
              style={{ padding: "2px 8px", fontSize: "12px" }}
              onClick={() => handleRemove(fruit.id, fruit.name)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="demo-note">
        Filter to remove:{" "}
        <code>{"prev.filter(item => item.id !== targetId)"}</code> returns a new
        array with everything except the item you want to delete.
      </div>
    </div>
  );
}
