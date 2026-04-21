import { useState, useCallback, useRef, memo } from "react";

function SearchBarNormal({ onSearch, label }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="card">
      <strong>{label}</strong>
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

const SearchBarMemoized = memo(function SearchBarMemoized({ onSearch, label }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="card">
      <strong>{label}</strong>
      <span className="render-counter render-counter-good">
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
});

export default function ReactMemoDemo() {
  const [count, setCount] = useState(0);
  const [, setSearchTerm] = useState("");

  const handleSearchNormal = (term) => {
    setSearchTerm(term);
  };

  const handleSearchStable = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  return (
    <div className="demo-subsection">
      <h3>React.memo — The Other Half</h3>
      <p className="demo-note">
        <code>useCallback</code> alone does NOT prevent re-renders. The child
        must also be wrapped in <code>React.memo</code> so it checks whether
        props actually changed before re-rendering.
      </p>

      <div style={{ marginBottom: 16 }}>
        <button
          className="btn btn-primary"
          onClick={() => setCount((c) => c + 1)}
        >
          Unrelated update (count: {count})
        </button>
        <span style={{ marginLeft: 12, color: "#666" }}>
          Click and watch the render counters below
        </span>
      </div>

      <div className="side-by-side">
        <div>
          <h4 style={{ color: "#e74c3c" }}>Without memo or useCallback</h4>
          <SearchBarNormal
            onSearch={handleSearchNormal}
            label="SearchBar (normal)"
          />
          <p style={{ fontSize: "0.85rem", color: "#888" }}>
            New function + no memo = re-renders every time
          </p>
        </div>

        <div>
          <h4 style={{ color: "#2ecc71" }}>With memo + useCallback</h4>
          <SearchBarMemoized
            onSearch={handleSearchStable}
            label="SearchBar (memo + useCallback)"
          />
          <p style={{ fontSize: "0.85rem", color: "#888" }}>
            Stable function + memo = skips re-render
          </p>
        </div>
      </div>

      <div className="code-block" style={{ marginTop: 24 }}>
        <span className="comment">
          {"// Wrap the child component with memo"}
        </span>
        <br />
        <span className="keyword">import</span> {"{ memo }"}{" "}
        <span className="keyword">from</span>{" "}
        <span className="string">"react"</span>;
        <br />
        <br />
        <span className="keyword">const</span>{" "}
        <span className="component">SearchBar</span> ={" "}
        <span className="hook">memo</span>(
        <span className="keyword">function</span>{" "}
        <span className="component">SearchBar</span>({"{ onSearch }"}) {"{"}
        <br />
        {"  "}
        <span className="comment">
          {"// only re-renders if onSearch changes"}
        </span>
        <br />
        {"  "}
        <span className="keyword">return</span>{" "}
        {"<input onChange={onSearch} />"};
        <br />
        {"}"});
      </div>

      <div className="demo-practical">
        <h3>The combo you need</h3>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Parent uses</th>
              <th>Child uses</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Normal function</td>
              <td>No memo</td>
              <td>
                <span className="tag tag-bad">Re-renders every time</span>
              </td>
            </tr>
            <tr>
              <td>useCallback</td>
              <td>No memo</td>
              <td>
                <span className="tag tag-bad">Still re-renders</span>
              </td>
            </tr>
            <tr>
              <td>Normal function</td>
              <td>React.memo</td>
              <td>
                <span className="tag tag-bad">
                  Still re-renders (new fn ref)
                </span>
              </td>
            </tr>
            <tr>
              <td>useCallback</td>
              <td>React.memo</td>
              <td>
                <span className="tag tag-good">Skips re-render</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
