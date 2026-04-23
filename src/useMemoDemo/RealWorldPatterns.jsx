import { useState, useMemo, createContext, useContext } from "react";

const PRODUCTS = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999 },
  { id: 2, name: "Headphones", category: "Electronics", price: 199 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 450 },
  { id: 4, name: "Monitor", category: "Electronics", price: 349 },
  { id: 5, name: "Bookshelf", category: "Furniture", price: 120 },
  { id: 6, name: "Keyboard", category: "Electronics", price: 89 },
  { id: 7, name: "Standing Desk", category: "Furniture", price: 650 },
  { id: 8, name: "Webcam", category: "Electronics", price: 79 },
  { id: 9, name: "Plant", category: "Decor", price: 35 },
  { id: 10, name: "Lamp", category: "Decor", price: 65 },
];

function DerivedStateDemo() {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  const { categories, totalValue, filtered } = useMemo(() => {
    console.log("🧮 MEMO: deriving category stats + filtered list");
    const cats = {};
    let total = 0;
    for (const p of PRODUCTS) {
      cats[p.category] = (cats[p.category] || 0) + 1;
      total += p.price;
    }
    const filteredItems = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
    return { categories: cats, totalValue: total, filtered: filteredItems };
  }, [search]);

  return (
    <div className="card">
      <h4>Pattern 1: Derived State</h4>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Derive <code>categoryCounts</code> and <code>totalValue</code> from the
        product list. Without useMemo, this re-derives on every unrelated
        re-render.
      </p>
      <div style={{ display: "flex", gap: 12, margin: "12px 0" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "6px", fontSize: "14px" }}
        />
        <button
          className="btn btn-secondary"
          onClick={() => setCount((c) => c + 1)}
        >
          Unrelated update ({count})
        </button>
      </div>
      <p>
        <strong>Total inventory value:</strong> ${totalValue}
      </p>
      <p>
        <strong>Categories:</strong>{" "}
        {Object.entries(categories)
          .map(([cat, n]) => `${cat} (${n})`)
          .join(", ")}
      </p>
      <p>
        <strong>Filtered:</strong>{" "}
        {filtered.map((p) => p.name).join(", ") || "no matches"}
      </p>
    </div>
  );
}

function TransformPipelineDemo() {
  const [sortBy, setSortBy] = useState("price");

  const processed = useMemo(() => {
    console.log("🧮 MEMO: running transform pipeline (sort by " + sortBy + ")");
    return [...PRODUCTS]
      .map((p) => ({ ...p, name: p.name.toUpperCase() }))
      .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
      .sort((a, b) =>
        sortBy === "price" ? b.price - a.price : a.name.localeCompare(b.name),
      );
  }, [sortBy]);

  return (
    <div className="card">
      <h4>Pattern 2: Expensive Transform Pipeline</h4>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Normalize, deduplicate, and sort data. Memoize the entire pipeline so it
        only re-runs when sort order changes.
      </p>
      <div style={{ margin: "12px 0" }}>
        <label>
          Sort by:{" "}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price">Price (high → low)</option>
            <option value="name">Name (A → Z)</option>
          </select>
        </label>
      </div>

      <div className="code-block" style={{ fontSize: "0.82rem" }}>
        <span className="keyword">const</span> processed ={" "}
        <span className="hook">useMemo</span>(() =&gt; {"{"}
        <br />
        {"  "}
        <span className="keyword">return</span> rawData
        <br />
        {"    "}.map(normalize)
        <br />
        {"    "}.filter(deduplicate)
        <br />
        {"    "}.sort(compareFn);
        <br />
        {"}"}, [sortBy]);
      </div>

      <ul style={{ marginTop: 8 }}>
        {processed.slice(0, 5).map((p) => (
          <li key={p.id}>
            {p.name} — ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

const ThemeContext = createContext(null);

function ThemedCard() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      style={{
        padding: 12,
        background: theme === "dark" ? "#333" : "#f0f0f0",
        color: theme === "dark" ? "#fff" : "#333",
        borderRadius: 6,
        marginTop: 8,
      }}
    >
      Current theme: <strong>{theme}</strong>
    </div>
  );
}

function StableContextDemo() {
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(0);

  // Stable context value — only changes when theme changes
  const contextValue = useMemo(() => ({ theme }), [theme]);

  return (
    <div className="card">
      <h4>Pattern 3: Stable Context Value</h4>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Without <code>useMemo</code>, a Context Provider creates a new value
        object every render, causing ALL consumers to re-render. This was one of
        the "Common Mistakes" from Week 13's Context lesson.
      </p>
      <div style={{ display: "flex", gap: 12, margin: "12px 0" }}>
        <button
          className="btn btn-secondary"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          Toggle theme
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setCount((c) => c + 1)}
        >
          Unrelated update ({count})
        </button>
      </div>

      <div className="code-block" style={{ fontSize: "0.82rem" }}>
        <span className="comment">{"// BAD — new object every render"}</span>
        <br />
        &lt;<span className="component">ThemeContext.Provider</span>{" "}
        <span className="keyword">value</span>={"{"}
        {"{ theme }"}
        {"}"}&gt;
        <br />
        <br />
        <span className="comment">{"// GOOD — stable reference"}</span>
        <br />
        <span className="keyword">const</span> val ={" "}
        <span className="hook">useMemo</span>(() =&gt; ({"{ theme }"}),
        [theme]);
        <br />
        &lt;<span className="component">ThemeContext.Provider</span>{" "}
        <span className="keyword">value</span>={"{val}"}&gt;
      </div>

      <ThemeContext.Provider value={contextValue}>
        <ThemedCard />
      </ThemeContext.Provider>
    </div>
  );
}

export default function RealWorldPatterns() {
  return (
    <div className="demo-subsection">
      <h3>E. Real-World useMemo Patterns</h3>
      <p className="demo-note">
        Three patterns you'll see in production React code. Each one shows a
        practical use case where <code>useMemo</code> solves a real problem.
      </p>

      <DerivedStateDemo />
      <TransformPipelineDemo />
      <StableContextDemo />

      <div className="demo-practical">
        <h3>When to reach for useMemo</h3>
        <ul>
          <li>
            <strong>Derived state</strong> — computing totals, counts, or
            filtered lists from a data array
          </li>
          <li>
            <strong>Transform pipelines</strong> — chaining map/filter/sort on
            large datasets
          </li>
          <li>
            <strong>Context values</strong> — stabilizing the Provider's value
            object to prevent consumer re-renders
          </li>
          <li>
            <strong>Expensive formatting</strong> — generating chart data,
            building tree structures, parsing markdown
          </li>
        </ul>
      </div>
    </div>
  );
}
