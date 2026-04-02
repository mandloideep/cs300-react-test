// ============================================================
// Section A: Fetch on Mount
// ============================================================

import { useState, useEffect } from "react";

export default function FetchOnMount() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🌐 FETCH: starting GET request...");

    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        console.log("🌐 FETCH: received", data.length, "users");
        setUsers(data.slice(0, 5));
      } catch (err) {
        console.log("🌐 FETCH: error —", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="demo-subsection">
        <h3>A. Fetch on Mount</h3>
        <p>Loading users...</p>
      </div>
    );
  if (error)
    return (
      <div className="demo-subsection">
        <h3>A. Fetch on Mount</h3>
        <p className="form-error">Error: {error}</p>
      </div>
    );

  return (
    <div className="demo-subsection">
      <h3>A. Fetch on Mount</h3>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>

      <div className="demo-note">
        The pattern: define an <code>async</code> function inside useEffect,
        then call it. You can't make the useEffect callback itself async. Track
        three states: <strong>loading</strong>, <strong>data</strong>, and{" "}
        <strong>error</strong>.
      </div>
    </div>
  );
}
