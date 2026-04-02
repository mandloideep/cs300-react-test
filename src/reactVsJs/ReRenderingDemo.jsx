import { useState } from "react";

// ============================================================
// Section D: Re-Rendering is Okay!
// ============================================================
// Every time state changes, React re-calls the entire component function.
// This sounds expensive, but it's actually fast!
// React compares old and new output and only touches what changed in the real DOM.
// Open the browser console to follow along!

export default function ReRenderingDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // This runs every time the component renders
  console.log(
    "RE-RENDER: This entire function just ran. count =",
    count,
    ", text =",
    JSON.stringify(text),
  );

  return (
    <div className="demo-subsection">
      <h3>D. Re-Rendering is Okay!</h3>
      <p className="demo-note">
        Every click or keystroke re-runs this entire function. That sounds
        expensive, but it's actually fast! React compares old and new output and
        only touches what changed in the real DOM.
      </p>
      {console.log("RE-RENDER: computing JSX (this is cheap!)")}

      <div style={{ marginBottom: 8 }}>
        <button
          className="btn btn-primary"
          onClick={() => setCount((prev) => prev + 1)}
          style={{ marginRight: 8 }}
        >
          Count: {count}
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type to trigger re-renders..."
          style={{ padding: "4px 8px" }}
        />
      </div>

      <p className="demo-note" style={{ marginTop: 12 }}>
        <strong>How React works under the hood:</strong>
        <br />
        1. State changes (setCount/setText called)
        <br />
        2. React re-calls this function → gets new JSX
        <br />
        3. React compares new JSX with old JSX (this is called "diffing")
        <br />
        4. React only updates the DOM elements that actually changed
        <br />
        5. Browser re-paints only the changed pixels
        <br />
        <br />
        This is why React is fast even though the whole function re-runs!
      </p>
    </div>
  );
}
