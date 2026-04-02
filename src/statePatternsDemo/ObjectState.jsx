// ============================================================
// Section A: Object State
// ============================================================

import { useState } from "react";

export default function ObjectState() {
  const [user, setUser] = useState({
    name: "Alice",
    email: "alice@example.com",
    role: "Student",
  });

  function updateField(e) {
    const { name, value } = e.target;
    console.log("🔧 STATE: updating", name, "to", value);
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function brokenUpdate() {
    user.name = "MUTATED!";
    setUser(user);
    console.log(
      "🔧 STATE: ❌ mutated directly — React sees same reference, no re-render!",
    );
  }

  function correctUpdate() {
    setUser((prev) => ({ ...prev, name: "Updated!" }));
    console.log("🔧 STATE: ✅ spread created new object — React re-renders");
  }

  return (
    <div className="demo-subsection">
      <h3>A. Object State Updates</h3>

      <div className="side-by-side">
        <div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={updateField}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={updateField}
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={user.role}
              onChange={updateField}
            />
          </div>
        </div>

        <div className="card">
          <h4>Current State:</h4>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
        <button className="btn btn-danger" onClick={brokenUpdate}>
          Mutate Directly (Broken)
        </button>
        <button className="btn btn-primary" onClick={correctUpdate}>
          Spread Update (Correct)
        </button>
      </div>

      <div className="demo-note">
        Never mutate state directly. React compares by reference — if the object
        is the same reference, it skips re-rendering. Always spread:{" "}
        <code>{"{ ...prev, key: newValue }"}</code>
      </div>
    </div>
  );
}
