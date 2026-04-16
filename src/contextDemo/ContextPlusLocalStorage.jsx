import { createContext, useContext, useEffect, useState } from "react";

const THEME_KEY = "cs300:demo:theme";
const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "light";
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    console.log("THEME: persisted to localStorage:", theme);
  }, [theme]);

  const toggle = () => setTheme(t => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedCard({ children }) {
  const { theme } = useContext(ThemeContext);
  return <div className={theme === "dark" ? "theme-dark" : "theme-light"}>{children}</div>;
}

function ToggleButton() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <button className="btn btn-primary" onClick={toggle}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}

function DeepChild() {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemedCard>
      <div className="tree-layer-label">DeepChild (4 layers down)</div>
      <p>I read theme directly from context: <strong>{theme}</strong></p>
    </ThemedCard>
  );
}

function MiddleA() {
  return <div className="tree-layer"><div className="tree-layer-label">MiddleA</div><MiddleB /></div>;
}
function MiddleB() {
  return <div className="tree-layer"><div className="tree-layer-label">MiddleB</div><MiddleC /></div>;
}
function MiddleC() {
  return <div className="tree-layer"><div className="tree-layer-label">MiddleC</div><DeepChild /></div>;
}

export default function ContextPlusLocalStorage() {
  return (
    <div className="demo-subsection">
      <h3>Context + localStorage = persisted shared state</h3>
      <p className="demo-note">
        The Provider hydrates state from <code>localStorage</code> on mount and writes
        back via <code>useEffect</code>. The result: theme is shared across the whole
        tree <em>and</em> survives page refresh.
      </p>

      <ThemeProvider>
        <ThemedCard>
          <h4 style={{ marginTop: 0 }}>Theme Demo</h4>
          <ToggleButton />
        </ThemedCard>

        <p style={{ marginTop: 12 }}>Same context, 4 layers down:</p>
        <MiddleA />
      </ThemeProvider>

      <div className="demo-practical">
        <h3>The pattern (memorize it)</h3>
        <pre style={{ background: "#f0f0f0", padding: 12, borderRadius: 6, overflow: "auto" }}>
{`function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`}
        </pre>
        <ul>
          <li><strong>Lazy init</strong> (<code>useState(() =&gt; ...)</code>) reads localStorage <em>once</em> on mount.</li>
          <li><strong>useEffect</strong> writes back whenever theme changes — including the first render.</li>
          <li><strong>Provider</strong> shares both the value and the setter so any descendant can read or update.</li>
          <li>Refresh the page after toggling: theme survives.</li>
        </ul>
      </div>
    </div>
  );
}
