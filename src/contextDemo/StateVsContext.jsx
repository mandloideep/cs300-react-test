import { createContext, useContext, useState } from "react";

const CountContext = createContext(null);

function LocalCounter() {
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <h4>
        <span className="tag tag-state">state</span> Local Counter
      </h4>
      <p>
        Each instance has its own count: <strong>{count}</strong>
      </p>
      <button
        className="btn btn-primary"
        onClick={() => setCount((c) => c + 1)}
      >
        +1
      </button>
    </div>
  );
}

function SharedDisplay() {
  const { count } = useContext(CountContext);
  return (
    <p>
      Display A reads context: <strong>{count}</strong>
    </p>
  );
}

function SharedButtons() {
  const { setCount } = useContext(CountContext);
  return (
    <button className="btn btn-primary" onClick={() => setCount((c) => c + 1)}>
      Display B button: +1 (updates everywhere)
    </button>
  );
}

function SharedCounter() {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      <div className="card">
        <h4>
          <span className="tag tag-context">context</span> Shared Counter
        </h4>
        <SharedDisplay />
        <SharedButtons />
      </div>
    </CountContext.Provider>
  );
}

export default function StateVsContext() {
  return (
    <div className="demo-subsection">
      <h3>State vs Context — when to choose each</h3>
      <p className="demo-note">
        Both use <code>useState</code> under the hood. The difference is the{" "}
        <strong>scope of who can read &amp; update it</strong>. State = one
        component's memory. Context = a distribution channel for state shared by
        many components.
      </p>

      <div className="side-by-side">
        <div>
          <LocalCounter />
          <LocalCounter />
          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            Two independent counters. Clicking one does <em>not</em> affect the
            other.
          </p>
        </div>
        <div>
          <SharedCounter />
          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            One counter, two consumers (Display + Button) that share state via
            the Provider.
          </p>
        </div>
      </div>

      <table className="compare-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>useState</th>
            <th>Context</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Where does the value live?</td>
            <td>Inside one component</td>
            <td>At the Provider; consumed by descendants</td>
          </tr>
          <tr>
            <td>Survives component unmount?</td>
            <td>No — gone when component unmounts</td>
            <td>Lives as long as the Provider is mounted</td>
          </tr>
          <tr>
            <td>Survives page refresh?</td>
            <td>No</td>
            <td>No — Context is in-memory too</td>
          </tr>
          <tr>
            <td>Reactive?</td>
            <td>Yes — re-renders on change</td>
            <td>Yes — consumers re-render on change</td>
          </tr>
          <tr>
            <td>Use when…</td>
            <td>Only one component cares about the value</td>
            <td>Many components across the tree need it (theme, user, cart)</td>
          </tr>
        </tbody>
      </table>

      <div className="demo-practical">
        <h3>Rule of thumb</h3>
        <ul>
          <li>
            Start with <code>useState</code> in the smallest component that owns
            the data.
          </li>
          <li>
            If you find yourself prop-drilling more than 2 layers, lift to a{" "}
            <strong>parent</strong>.
          </li>
          <li>
            If many siblings/cousins all need it, lift to a{" "}
            <strong>Context Provider</strong>.
          </li>
          <li>
            Context is for <em>shared state</em>, not for <em>everything</em>.
            Don't reach for it on instinct.
          </li>
        </ul>
      </div>
    </div>
  );
}
