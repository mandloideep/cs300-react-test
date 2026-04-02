// ============================================================
// Section D: Array — Toggle Property
// ============================================================

import { useState } from "react";

export default function ArrayToggle() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Read the React docs", done: true },
    { id: 2, text: "Build a counter app", done: false },
    { id: 3, text: "Learn useEffect", done: false },
    { id: 4, text: "Deploy to Vercel", done: false },
  ]);

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
    const task = tasks.find((t) => t.id === id);
    console.log(
      "🔧 STATE: toggled",
      JSON.stringify(task.text),
      "to done =",
      !task.done,
    );
  }

  const completed = tasks.filter((t) => t.done).length;

  return (
    <div className="demo-subsection">
      <h3>D. Array — Toggle Property</h3>

      <p>
        Completed: {completed} / {tasks.length}
      </p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "8px" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />{" "}
              <span
                style={{
                  textDecoration: task.done ? "line-through" : "none",
                  opacity: task.done ? 0.6 : 1,
                }}
              >
                {task.text}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="demo-note">
        Map to toggle:{" "}
        <code>
          {"prev.map(t => t.id === id ? { ...t, done: !t.done } : t)"}
        </code>
        . Map returns a new array. Only the matching item gets a new object
        (spread + change). All others pass through unchanged.
      </div>

      <div className="demo-practical">
        <h3>State update cheat sheet</h3>
        <ul>
          <li>
            <strong>Object field:</strong>{" "}
            <code>{"{ ...prev, key: value }"}</code>
          </li>
          <li>
            <strong>Array add:</strong> <code>{"[...prev, newItem]"}</code>
          </li>
          <li>
            <strong>Array remove:</strong>{" "}
            <code>{"prev.filter(i => i.id !== id)"}</code>
          </li>
          <li>
            <strong>Array toggle:</strong>{" "}
            <code>
              {"prev.map(i => i.id === id ? { ...i, prop: !i.prop } : i)"}
            </code>
          </li>
        </ul>
      </div>
    </div>
  );
}
