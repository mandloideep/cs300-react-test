import { useState } from "react";

// ============================================================
// Section B: The Working Counter
// ============================================================
// Same counter as Section A, but now using useState.
// React knows about changes and re-renders the component!
// Open the browser console to follow along!

export default function WorkingCounter() {
  // useState returns [currentValue, setterFunction]
  // React will re-call this entire function whenever setCount is called.
  const [count, setCount] = useState(0);

  // This log runs every time the component renders (function is called):
  console.log("WORKING COUNTER: rendering with count =", count);

  function handleClick() {
    // setCount tells React: "Hey, state changed! Re-render me."
    setCount(count + 1);
    console.log("WORKING COUNTER: called setCount. count is STILL", count, "(until next render)");
    // Notice: count doesn't change immediately! It's a snapshot of THIS render.
  }

  return (
    <div className="demo-subsection">
      <h3>B. The Working Counter (useState)</h3>
      <p className="demo-note">
        Now the UI updates! Check the console — notice the component re-renders each time.
      </p>
      <p>Count on screen: <strong>{count}</strong></p>
      <button className="btn btn-primary" onClick={handleClick}>
        Increment (works!)
      </button>
    </div>
  );
}
