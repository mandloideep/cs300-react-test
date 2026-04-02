// ============================================================
// Section C: Missing Dependencies
// ============================================================

import { useState, useEffect } from "react";

const USERS = {
  1: { name: "Alice", role: "Engineer" },
  2: { name: "Bob", role: "Designer" },
  3: { name: "Carol", role: "Manager" },
};

function fakeApiFetch(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(USERS[userId] || null), 500);
  });
}

export default function MissingDeps() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("broken");

  useEffect(
    () => {
      console.log("🔴 MISTAKES:", mode, "— fetching user", userId);
      fakeApiFetch(userId).then((data) => {
        setUser(data);
        console.log("🔴 MISTAKES: got data for user", userId, "—", data?.name);
      });
    },
    mode === "broken" ? [] : [userId],
  );

  return (
    <div className="demo-subsection">
      <h3>C. Missing Dependencies</h3>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            className={`btn ${userId === id ? "btn-primary" : "btn-secondary"}`}
            onClick={() => {
              setUserId(id);
              console.log("🔴 MISTAKES: selected user", id);
            }}
          >
            User {id}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          className={`btn ${mode === "broken" ? "btn-danger" : "btn-secondary"}`}
          onClick={() => setMode("broken")}
        >
          Broken: empty []
        </button>
        <button
          className={`btn ${mode === "fixed" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setMode("fixed")}
        >
          Fixed: [userId]
        </button>
      </div>

      {user && (
        <div className="card">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      )}

      <div className="demo-note">
        With <code>[]</code> as deps, the effect only runs once — switching
        users does nothing. Adding <code>[userId]</code> tells React to re-run
        the effect whenever userId changes. If a value from the component is
        used inside the effect, it belongs in the dependency array.
      </div>
    </div>
  );
}
