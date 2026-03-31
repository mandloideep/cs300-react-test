import { useState, useEffect } from "react";

// ============================================================
// Section A: Render vs Effect Timing
// ============================================================
// Shows that the component function body runs FIRST (during rendering),
// and useEffect runs AFTER the browser paints the screen.
// Open the browser console to follow along!

export default function RenderVsEffect() {
  const [count, setCount] = useState(0);

  // 1️⃣ This runs DURING rendering (the function body)
  console.log("A. RENDER: component function is running, count =", count);

  // 2️⃣ This runs AFTER the browser paints the screen
  useEffect(() => {
    console.log("A. EFFECT: this runs AFTER the screen updated, count =", count);
  });

  return (
    <div className="demo-subsection">
      <h3>A. Render vs Effect Timing</h3>
      <p className="demo-note">
        Click the button and watch the console. "RENDER" logs first, then "EFFECT" logs after.
        The component function runs → React updates the DOM → browser paints → useEffect runs.
      </p>
      {console.log("A. JSX: inside the return statement, count =", count)}
      <p>Count: <strong>{count}</strong></p>
      <button className="btn btn-primary" onClick={() => setCount(prev => prev + 1)}>
        Increment (watch console order)
      </button>
    </div>
  );
}
