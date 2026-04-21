import { useState, useCallback, useRef } from "react";

function SearchBar({ onSearch }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="card">
      <strong>SearchBar</strong>
      <span className="render-counter">
        Rendered {renderCount.current} times
      </span>
      <div style={{ marginTop: 8 }}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          style={{ padding: "8px", fontSize: "14px", width: "200px" }}
        />
      </div>
    </div>
  );
}

export default function UseCallbackSyntax() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [useHook, setUseHook] = useState(false);

  const handleSearchNormal = (term) => {
    setSearchTerm(term);
  };

  const handleSearchMemoized = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  return (
    <div className="demo-subsection">
      <h3>useCallback Syntax</h3>
      <p className="demo-note">
        <code>useCallback</code> wraps a function and returns the{" "}
        <strong>same reference</strong> between renders (unless dependencies
        change). The dependency array works exactly like <code>useEffect</code>
        's.
      </p>

      <div className="code-block">
        <span className="comment">
          {"// Before — new function every render"}
        </span>
        <br />
        <span className="keyword">const</span> handleSearch = (term){" "}
        <span className="keyword">=&gt;</span> {"{"}
        <br />
        {"  "}setSearchTerm(term);
        <br />
        {"}"};
        <br />
        <br />
        <span className="comment">
          {"// After — same function between renders"}
        </span>
        <br />
        <span className="keyword">const</span> handleSearch ={" "}
        <span className="hook">useCallback</span>((term){" "}
        <span className="keyword">=&gt;</span> {"{"}
        <br />
        {"  "}setSearchTerm(term);
        <br />
        {"}"}, []);{" "}
        <span className="comment">{"// empty deps = never changes"}</span>
      </div>

      <div style={{ margin: "16px 0" }}>
        <label style={{ cursor: "pointer", fontSize: "1rem" }}>
          <input
            type="checkbox"
            checked={useHook}
            onChange={() => setUseHook((u) => !u)}
            style={{ marginRight: 8 }}
          />
          <strong>Enable useCallback</strong> (toggle to compare)
        </label>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button
          className="btn btn-primary"
          onClick={() => setCount((c) => c + 1)}
        >
          Unrelated update (count: {count})
        </button>
        <span style={{ marginLeft: 12, color: "#888" }}>
          {useHook ? (
            <span className="tag tag-good">useCallback ON</span>
          ) : (
            <span className="tag tag-bad">useCallback OFF</span>
          )}
        </span>
      </div>

      <SearchBar
        onSearch={useHook ? handleSearchMemoized : handleSearchNormal}
      />

      {searchTerm && (
        <p style={{ color: "#888" }}>Searching for: "{searchTerm}"</p>
      )}

      <div className="demo-practical">
        <h3>Dependency array — same rules as useEffect</h3>
        <ul>
          <li>
            <code>useCallback(fn, [])</code> — function never changes (uses no
            external values)
          </li>
          <li>
            <code>useCallback(fn, [query])</code> — function updates when{" "}
            <code>query</code> changes
          </li>
          <li>
            If you use a state variable or prop inside the function, it must be
            in the dependency array
          </li>
          <li>
            <strong>Note:</strong> setter functions from useState (like{" "}
            <code>setSearchTerm</code>) are stable — they don't need to be in
            deps
          </li>
        </ul>
      </div>
    </div>
  );
}
