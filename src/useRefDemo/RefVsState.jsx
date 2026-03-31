import { useState, useRef } from "react";

// ============================================================
// Section A: useRef vs useState
// ============================================================
// Changing a ref does NOT update the screen. Changing state DOES.
// This is the key difference between useRef and useState.
// Open the browser console to follow along!

export default function RefVsState() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  // This increments every render — it's a render counter!
  refCount.current += 1;

  console.log("REF VS STATE: rendering. stateCount =", stateCount, ", refCount.current =", refCount.current);

  function handleRefClick() {
    refCount.current += 100;
    // The ref changed, but React doesn't know or care — no re-render!
    console.log("REF VS STATE: ref is now", refCount.current, "(screen won't update)");
  }

  function handleStateClick() {
    // This triggers a re-render, which also increments refCount by 1
    setStateCount(prev => prev + 1);
    console.log("REF VS STATE: state changing (will re-render, and refCount will increment by 1)");
  }

  return (
    <div className="demo-subsection">
      <h3>A. useRef vs useState</h3>
      <p className="demo-note">
        Click "Change Ref" — the console updates but the screen does NOT.
        Click "Change State" — the screen updates AND the ref render count goes up.
      </p>
      <p>State count (on screen): <strong>{stateCount}</strong></p>
      <p>Ref count (on screen): <strong>{refCount.current}</strong></p>
      <p className="demo-note">
        The ref value on screen only updates when something ELSE causes a re-render.
      </p>
      <button className="btn btn-danger" onClick={handleRefClick} style={{ marginRight: 8 }}>
        Change Ref (+100, no re-render)
      </button>
      <button className="btn btn-primary" onClick={handleStateClick}>
        Change State (+1, causes re-render)
      </button>
    </div>
  );
}
