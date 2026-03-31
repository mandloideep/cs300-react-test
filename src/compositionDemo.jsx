import { useState } from "react";

// ============================================================
// Composition Demo — Shells, Layouts, Props, and Lifting State
// ============================================================
// React is all about COMPOSING small pieces into bigger pieces.
// Components are like LEGO blocks — each one does one thing,
// and you snap them together to build complex UIs.
// Open the browser console to follow along!

// --- Shell Component ---
// A reusable "shell" that wraps any content with a colored border and title.
// Notice: it uses CSS custom properties (variables) for theming.
function Shell({ backgroundColor, textColor, title, children }) {
  console.log("SHELL: rendering", JSON.stringify(title), "with bg =", backgroundColor);

  return (
    <div
      className="shell"
      style={{
        "--shell-bg": backgroundColor || "#3498db",
        "--shell-text": textColor || "#fff",
      }}
    >
      <div className="shell-title">{title}</div>
      <div className="shell-content">
        {children}
        {/* children = whatever you put BETWEEN <Shell> and </Shell>.
            This is how composition works — the parent decides what goes inside. */}
      </div>
    </div>
  );
}

// --- Card Component ---
// A simple card that can go inside a Shell (or anywhere else).
function Card({ title, children }) {
  console.log("CARD: rendering", JSON.stringify(title));
  return (
    <div className="card">
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}

// --- Section A: The Shell Pattern ---
function ShellPatternDemo() {
  return (
    <div className="demo-subsection">
      <h3>A. The Shell Pattern</h3>
      <p className="demo-note">
        A Shell is a reusable wrapper. You pass it a title and background color,
        and put anything inside it using children. Look at how the blue shell
        wraps the content below.
      </p>

      <Shell backgroundColor="#3498db" title="My First Shell">
        <p>This content is INSIDE the shell.</p>
        <p>The shell provides the colored title bar and border.</p>
        <p>Whatever we put here becomes the shell's <code>children</code> prop.</p>
      </Shell>

      <Shell backgroundColor="#e74c3c" title="A Red Shell">
        <p>Same component, different color. The Shell doesn't care what's inside!</p>
      </Shell>
    </div>
  );
}

// --- Section B: Nesting Components (Composition) ---
function NestingDemo() {
  return (
    <div className="demo-subsection">
      <h3>B. Nesting Components (Composition)</h3>
      <p className="demo-note">
        Components inside components inside components.
        Each Shell has a different color so you can SEE the nesting.
        Check the console to see the rendering order.
      </p>

      <Shell backgroundColor="#3498db" title="Outer Shell (Blue)">
        <p>I'm in the outer (blue) shell.</p>

        <Shell backgroundColor="#2ecc71" title="Inner Shell (Green)">
          <p>I'm in the inner (green) shell, which is INSIDE the blue shell.</p>

          <Card title="A Card Inside the Green Shell">
            <p>This card is the deepest level of nesting.</p>
          </Card>
        </Shell>

        <Card title="Another Card (in the Blue Shell)">
          <p>This card is inside the blue shell but outside the green one.</p>
        </Card>
      </Shell>

      {/* This is composition:
          - Shell doesn't know about Card
          - Card doesn't know about Shell
          - They work together because they both accept children
          - YOU decide how to combine them */}
    </div>
  );
}

// --- Section C: Props Flow Down ---
function ThemedText({ theme, children }) {
  console.log("THEMED TEXT: received theme =", JSON.stringify(theme));
  return (
    <p style={{
      color: theme === "dark" ? "#ecf0f1" : "#2c3e50",
      fontWeight: "bold",
    }}>
      {children}
    </p>
  );
}

function ThemedCard({ theme, title, children }) {
  console.log("THEMED CARD: received theme =", JSON.stringify(theme));
  return (
    <div className="card" style={{
      backgroundColor: theme === "dark" ? "#34495e" : "#fff",
      borderColor: theme === "dark" ? "#2c3e50" : "#ddd",
    }}>
      <ThemedText theme={theme}>{title}</ThemedText>
      <div style={{ color: theme === "dark" ? "#bdc3c7" : "#333" }}>
        {children}
      </div>
    </div>
  );
}

function PropsFlowDemo() {
  const [theme, setTheme] = useState("light");

  console.log("PROPS FLOW: parent rendering with theme =", JSON.stringify(theme));

  return (
    <div className="demo-subsection">
      <h3>C. Props Flow Down (One-Way Data Flow)</h3>
      <p className="demo-note">
        The parent owns the theme state. It passes it down as a prop.
        Toggle the theme and watch the console — every level re-renders with the new value.
      </p>

      <button
        className="btn btn-primary"
        onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
        style={{ marginBottom: 12 }}
      >
        Toggle Theme (current: {theme})
      </button>

      <Shell
        backgroundColor={theme === "dark" ? "#2c3e50" : "#3498db"}
        textColor="#fff"
        title={`Shell — theme: ${theme}`}
      >
        <ThemedCard theme={theme} title="Themed Card">
          <p>This text color comes from the theme prop, which started at the TOP.</p>
          <p>Data flows DOWN: Parent → Shell → Card → Text</p>
        </ThemedCard>
      </Shell>

      <p className="demo-note">
        <strong>One-way data flow:</strong> Parent → Child → Grandchild.
        Children can NOT change the parent's state directly.
        If a child needs to communicate up, it uses a callback function (next section!).
      </p>
    </div>
  );
}

// --- Section D: Lifting State Up ---

// Two independent counters (each has its own state)
function IndependentCounter({ label }) {
  const [count, setCount] = useState(0);
  console.log("INDEPENDENT COUNTER:", label, "rendering with count =", count);
  return (
    <div className="card" style={{ display: "inline-block", marginRight: 12 }}>
      <strong>{label}:</strong> {count}
      <br />
      <button className="btn btn-primary" onClick={() => setCount(prev => prev + 1)} style={{ marginTop: 4 }}>
        +1
      </button>
    </div>
  );
}

// A counter that receives its value and setter from the parent (lifted state)
function SharedCounter({ label, count, onIncrement }) {
  console.log("SHARED COUNTER:", label, "rendering with count =", count);
  return (
    <div className="card" style={{ display: "inline-block", marginRight: 12 }}>
      <strong>{label}:</strong> {count}
      <br />
      <button className="btn btn-primary" onClick={onIncrement} style={{ marginTop: 4 }}>
        +1
      </button>
    </div>
  );
}

// Temperature converter — classic lifting state example
function TemperatureConverter() {
  // The shared state lives in the PARENT
  const [celsius, setCelsius] = useState(0);

  // Derived values — computed from state, not stored separately
  const fahrenheit = (celsius * 9) / 5 + 32;

  console.log("TEMPERATURE: celsius =", celsius, "fahrenheit =", fahrenheit.toFixed(1));

  return (
    <div style={{ marginTop: 16 }}>
      <strong>Temperature Converter (shared state):</strong>
      <div style={{ marginTop: 8 }}>
        <label>
          Celsius:{" "}
          <input
            type="number"
            value={celsius}
            onChange={(e) => setCelsius(Number(e.target.value))}
            style={{ padding: "4px 8px", width: 80 }}
          />
        </label>
        <span style={{ margin: "0 12px" }}>=</span>
        <label>
          Fahrenheit:{" "}
          <input
            type="number"
            value={fahrenheit.toFixed(1)}
            onChange={(e) => setCelsius(((Number(e.target.value) - 32) * 5) / 9)}
            style={{ padding: "4px 8px", width: 80 }}
          />
        </label>
      </div>
      <p className="demo-note">
        Both inputs share the same state (celsius). Changing either one updates the other.
        The parent owns the "source of truth."
      </p>
    </div>
  );
}

function LiftingStateDemo() {
  const [sharedCount, setSharedCount] = useState(0);

  console.log("LIFTING STATE: parent rendering, sharedCount =", sharedCount);

  return (
    <div className="demo-subsection">
      <h3>D. Lifting State Up</h3>

      <p className="demo-note">
        <strong>Before lifting:</strong> each counter has its own state (they don't sync).
      </p>
      <div style={{ marginBottom: 16 }}>
        <IndependentCounter label="Counter A" />
        <IndependentCounter label="Counter B" />
      </div>

      <p className="demo-note">
        <strong>After lifting:</strong> the parent owns the state and passes it down.
        Both counters show the same value!
      </p>
      <div style={{ marginBottom: 16 }}>
        <SharedCounter
          label="Counter A"
          count={sharedCount}
          onIncrement={() => setSharedCount(prev => prev + 1)}
        />
        <SharedCounter
          label="Counter B"
          count={sharedCount}
          onIncrement={() => setSharedCount(prev => prev + 1)}
        />
      </div>

      <TemperatureConverter />
    </div>
  );
}

// --- Main Demo Component ---
export default function CompositionDemo() {
  return (
    <div className="demo-section">
      <h2>Composition — Building UIs from Small Pieces</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the scenes.
      </p>

      <ShellPatternDemo />
      <NestingDemo />
      <PropsFlowDemo />
      <LiftingStateDemo />

      {/* Practical Use Cases */}
      <div className="demo-practical">
        <h3>When do you use composition in real apps?</h3>
        <ul>
          <li><strong>Dashboard layouts</strong> — a Shell for the sidebar, a Shell for the main content area</li>
          <li><strong>Theme providers</strong> — pass dark/light theme down through the component tree</li>
          <li><strong>Modal/dialog wrappers</strong> — a Shell that adds an overlay and a close button</li>
          <li><strong>Form field containers</strong> — a wrapper that adds a label, error message, and styling</li>
          <li><strong>Page layouts</strong> — header + sidebar + content + footer, all composed together</li>
          <li><strong>Lifting state</strong> — whenever two siblings need to share data, move the state to their parent</li>
        </ul>
        <p className="demo-note">
          Rule of thumb: if two components need to stay in sync, lift their shared state to
          the nearest common parent and pass it down as props.
        </p>
      </div>
    </div>
  );
}
