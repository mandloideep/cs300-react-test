import { useRef } from "react";

// ============================================================
// Section B: Accessing DOM Elements
// ============================================================
// useRef can hold a reference to an actual DOM element.
// ref.current points to the actual DOM node after mount.
// This is React's escape hatch to the real DOM.
// Open the browser console to follow along!

export default function DomAccess() {
  const inputRef = useRef(null);
  // inputRef.current will point to the <input> DOM node after mount

  function handleFocus() {
    // Directly calling a method on the DOM element
    inputRef.current.focus();
    console.log("DOM ACCESS: focused the input via inputRef.current.focus()");
  }

  function handleLogValue() {
    // Reading the raw DOM value — bypassing React's state
    console.log("DOM ACCESS: input's DOM value is:", JSON.stringify(inputRef.current.value));
  }

  return (
    <div className="demo-subsection">
      <h3>B. Accessing DOM Elements</h3>
      <p className="demo-note">
        ref.current points to the actual DOM node. This is React's escape hatch to the real DOM.
      </p>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something here..."
        style={{ padding: "8px 12px", fontSize: 16, marginBottom: 8, display: "block" }}
      />
      <button className="btn btn-primary" onClick={handleFocus} style={{ marginRight: 8 }}>
        Focus the Input
      </button>
      <button className="btn btn-secondary" onClick={handleLogValue}>
        Log Input Value (check console)
      </button>
    </div>
  );
}
