import { useState, useEffect } from "react";

// ============================================================
// Section B: Parent-Child Render Order
// ============================================================
// Shows that parent renders BEFORE child, but effects run AFTER all children.
// Render phase (top-down): Parent body → Child A body → Child B body
// Effect phase (bottom-up): Child A effect → Child B effect → Parent effect
// Open the browser console to follow along!

function Child({ name, value }) {
  console.log(`PARENT-CHILD: 📦 ${name} function body runs (value = ${value})`);

  useEffect(() => {
    console.log(`PARENT-CHILD: ✅ ${name} effect runs (value = ${value})`);
    return () => {
      console.log(`PARENT-CHILD: 🧹 ${name} cleanup (value = ${value})`);
    };
  }, [name, value]);

  return (
    <div className="card" style={{ margin: "4px 0" }}>
      {console.log(`PARENT-CHILD: 📦 ${name} JSX rendering`)}
      <strong>{name}</strong>: value = {value}
    </div>
  );
}

export default function ParentChildLifecycle() {
  const [parentCount, setParentCount] = useState(0);

  console.log("PARENT-CHILD: 📦 Parent function body runs (parentCount =", parentCount, ")");

  useEffect(() => {
    console.log("PARENT-CHILD: ✅ Parent effect runs");
    return () => {
      console.log("PARENT-CHILD: 🧹 Parent cleanup");
    };
  }, [parentCount]);

  return (
    <div className="demo-subsection">
      <h3>B. Parent-Child Render Order</h3>
      <p className="demo-note">
        Click the button and watch the console. The render order is:
        Parent body → Child A body → Child B body → Child A effect → Child B effect → Parent effect.
        React renders top-down but runs effects bottom-up!
      </p>
      {console.log("PARENT-CHILD: 📦 Parent JSX rendering")}

      <Child name="Child A" value={parentCount} />
      <Child name="Child B" value={parentCount * 10} />

      <button
        className="btn btn-primary"
        onClick={() => setParentCount(prev => prev + 1)}
        style={{ marginTop: 8 }}
      >
        Update Parent (count: {parentCount})
      </button>

      <div className="demo-note" style={{ marginTop: 12 }}>
        <strong>Render phase (top-down):</strong> Parent body → Child A body → Child B body<br />
        <strong>Effect phase (bottom-up):</strong> Child A effect → Child B effect → Parent effect<br />
        <br />
        React finishes ALL rendering first, then runs effects from deepest child up to parent.
      </div>
    </div>
  );
}
