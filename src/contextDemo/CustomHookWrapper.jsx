import { Component, createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return ctx;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggle = () => setTheme(t => t === "light" ? "dark" : "light");
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedLabel() {
  const { theme, toggle } = useTheme();
  return (
    <div className={theme === "dark" ? "theme-dark" : "theme-light"}>
      <p>Current theme: <strong>{theme}</strong></p>
      <button className="btn btn-primary" onClick={toggle}>toggle</button>
    </div>
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  reset = () => this.setState({ error: null });
  render() {
    if (this.state.error) {
      return (
        <div className="error-box">
          Caught error: {this.state.error.message}
          <br />
          <button className="btn btn-secondary" style={{ marginTop: 8 }} onClick={this.reset}>
            reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function CustomHookWrapper() {
  const [showOutside, setShowOutside] = useState(false);

  return (
    <div className="demo-subsection">
      <h3>Wrap useContext in a custom hook</h3>
      <p className="demo-note">
        Instead of consumers writing <code>useContext(ThemeContext)</code> directly, give
        them <code>useTheme()</code>. It hides the import, gives a friendly name, and{" "}
        <strong>throws a helpful error</strong> if used outside the Provider.
      </p>

      <pre style={{ background: "#f0f0f0", padding: 12, borderRadius: 6, overflow: "auto" }}>
{`function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return ctx;
}`}
      </pre>

      <h4>Inside the provider (works):</h4>
      <ThemeProvider>
        <ThemedLabel />
      </ThemeProvider>

      <h4 style={{ marginTop: 24 }}>Outside the provider (throws):</h4>
      <button className="btn btn-danger" onClick={() => setShowOutside(s => !s)}>
        {showOutside ? "Hide" : "Render outside provider"}
      </button>

      {showOutside && (
        <ErrorBoundary key={Math.random()}>
          <ThemedLabel />
        </ErrorBoundary>
      )}

      <div className="demo-practical">
        <h3>Why bother with the wrapper?</h3>
        <ul>
          <li><strong>Better DX</strong> — <code>useTheme()</code> reads better than <code>useContext(ThemeContext)</code>.</li>
          <li><strong>Catches bugs early</strong> — if a teammate forgets the Provider, they get a clear error instead of <code>Cannot read property 'theme' of null</code>.</li>
          <li><strong>Encapsulation</strong> — consumers don't need to import the context object at all.</li>
          <li><strong>Easier to refactor</strong> — change the context internals without touching consumers.</li>
        </ul>
      </div>
    </div>
  );
}
