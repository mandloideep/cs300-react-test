// ============================================================
// Section A: The Broken Counter
// ============================================================
// This component uses a plain variable instead of useState.
// Watch the console vs the screen — the variable changes, but the UI does not!
// This is the "aha" moment: React only re-renders when STATE changes.
// Open the browser console to follow along!

export default function BrokenCounter() {
  let count = 0; // This resets to 0 every time React calls this function!

  function handleClick() {
    count = count + 1;
    // The variable DID change — check the console:
    console.log("BROKEN COUNTER: variable is now", count);
    // But React doesn't know about it. No re-render happens.
    // The screen stays frozen at 0.
  }

  return (
    <div className="demo-subsection">
      <h3>A. The Broken Counter (plain variable)</h3>
      <p className="demo-note">
        Click the button and watch the console vs the screen. The variable
        changes, but the UI does not!
      </p>
      <p>
        Count on screen: <strong>{count}</strong>
      </p>
      <button className="btn btn-secondary" onClick={handleClick}>
        Increment (broken)
      </button>
      {/* WHY is it broken?
          React only re-renders when STATE changes.
          A plain variable changing is invisible to React.
          Even if the variable changes, React never re-calls this function. */}
    </div>
  );
}
