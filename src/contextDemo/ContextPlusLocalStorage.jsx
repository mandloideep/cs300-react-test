import { createContext, useContext, useEffect, useState } from "react";
import ComponentTree from "./ComponentTree";

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

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ToggleButtonLive() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <button className="btn btn-primary" onClick={toggle}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}

function DeepChildLive() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={theme === "dark" ? "theme-dark" : "theme-light"}
      style={{ padding: 6 }}
    >
      I read theme directly from context: <strong>{theme}</strong>
    </div>
  );
}

const tree = {
  name: "ThemeProvider",
  role: "owner",
  hook: "useState + useEffect (hydrates & persists to localStorage)",
  note: "Owns the theme state and keeps it synced with localStorage.",
  children: [
    {
      name: "ThemeContext.Provider",
      role: "provider",
      propValue: "{ theme, toggle }",
      note: "Shares theme + toggle with any descendant.",
      children: [
        {
          name: "ToggleButton",
          role: "consumer",
          hook: "useContext(ThemeContext)",
          note: "Shallow consumer — reads theme & calls toggle.",
          display: <ToggleButtonLive />,
        },
        {
          name: "MiddleA",
          role: "unaware",
          note: "No theme prop. Doesn't know theme exists.",
          children: [
            {
              name: "MiddleB",
              role: "unaware",
              note: "Still no theme prop.",
              children: [
                {
                  name: "MiddleC",
                  role: "unaware",
                  note: "Still no theme prop.",
                  children: [
                    {
                      name: "DeepChild",
                      role: "consumer",
                      hook: "useContext(ThemeContext)",
                      note: "4 layers down — reaches up to the Provider directly.",
                      display: <DeepChildLive />,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default function ContextPlusLocalStorage() {
  return (
    <div className="demo-subsection">
      <h3>Context + localStorage = persisted shared state</h3>
      <p className="demo-note">
        The Provider hydrates state from <code>localStorage</code> on mount and
        writes back via <code>useEffect</code>. The result: theme is shared
        across the whole tree <em>and</em> survives page refresh.
      </p>

      <ThemeProvider>
        <ComponentTree root={tree} />
      </ThemeProvider>

      <div className="demo-practical">
        <h3>The pattern (memorize it)</h3>
        <pre
          style={{
            background: "#f0f0f0",
            padding: 12,
            borderRadius: 6,
            overflow: "auto",
          }}
        >
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
          <li>
            <strong>Lazy init</strong> (<code>useState(() =&gt; ...)</code>)
            reads localStorage <em>once</em> on mount.
          </li>
          <li>
            <strong>useEffect</strong> writes back whenever theme changes —
            including the first render.
          </li>
          <li>
            <strong>Provider</strong> shares both the value and the setter so
            any descendant can read or update.
          </li>
          <li>Refresh the page after toggling: theme survives.</li>
        </ul>
      </div>
    </div>
  );
}
