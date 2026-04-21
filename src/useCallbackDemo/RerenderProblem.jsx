import { useState, useRef } from "react";
import ComponentTree, { CompNode } from "../contextDemo/ComponentTree";

function SearchBar({ onSearch }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="card">
      <strong>SearchBar component</strong>
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

function ExpensiveList({ items }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="card">
      <strong>ExpensiveList component</strong>
      <span className="render-counter">
        Rendered {renderCount.current} times
      </span>
      <ul style={{ marginTop: 8 }}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function RerenderProblem() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const items = ["React", "Vue", "Angular", "Svelte", "Next.js"];

  return (
    <div className="demo-subsection">
      <h3>The Re-render Problem</h3>
      <p className="demo-note">
        Watch the render counters. Click the "Unrelated update" button — it only
        changes the counter, but{" "}
        <strong>both child components re-render</strong> even though their props
        haven't meaningfully changed.
      </p>

      <div style={{ marginBottom: 16 }}>
        <button
          className="btn btn-primary"
          onClick={() => setCount((c) => c + 1)}
        >
          Unrelated update (count: {count})
        </button>
      </div>

      <ComponentTree>
        <CompNode
          name="RerenderProblem"
          role="owner"
          hook="useState(count) + useState(searchTerm)"
          note="Re-renders on every count change — re-creates handleSearch and items each time."
        >
          <CompNode
            name="SearchBar"
            role="leaf"
            prop="onSearch"
            note="Re-renders because onSearch is a new function reference every parent render."
            display={<SearchBar onSearch={handleSearch} />}
          />
          <CompNode
            name="ExpensiveList"
            role="leaf"
            prop="items"
            note="Re-renders because items is a new array every parent render."
            display={<ExpensiveList items={items} />}
          />
        </CompNode>
      </ComponentTree>

      {searchTerm && (
        <p style={{ marginTop: 8, color: "#888" }}>
          Searching for: "{searchTerm}"
        </p>
      )}

      <div className="demo-practical">
        <h3>Why is this happening?</h3>
        <ul>
          <li>
            Every time the parent re-renders (when count changes),{" "}
            <code>handleSearch</code> is <strong>re-created</strong> as a brand
            new function.
          </li>
          <li>
            React sees a "new" <code>onSearch</code> prop and re-renders
            SearchBar.
          </li>
          <li>
            The <code>items</code> array is also re-created every render (even
            though the values are identical).
          </li>
          <li>
            For small apps this is fine. For large apps with expensive children,
            it causes noticeable slowdowns.
          </li>
        </ul>
      </div>
    </div>
  );
}
