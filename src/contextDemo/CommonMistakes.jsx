import {
  Component,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const DemoContext = createContext(null);

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
          Caught: {this.state.error.message}{" "}
          <button className="btn btn-secondary" onClick={this.reset}>
            reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function NeedsContext() {
  const ctx = useContext(DemoContext);
  return <p>Got value: {String(ctx)}</p>;
}

function Mistake1() {
  const [showBad, setShowBad] = useState(false);
  return (
    <div className="card">
      <h4>
        <span className="tag tag-bad">bad</span> Forgetting the Provider
      </h4>
      <p>
        Calling <code>useContext</code> when no Provider wraps the tree returns
        the default value (<code>null</code> here), which usually crashes the
        consumer.
      </p>
      <button className="btn btn-danger" onClick={() => setShowBad((s) => !s)}>
        {showBad ? "Hide" : "Render NeedsContext WITHOUT a Provider"}
      </button>
      {showBad && (
        <ErrorBoundary key={Math.random()}>
          <NeedsContext />
        </ErrorBoundary>
      )}
      <p className="demo-note">
        <span className="tag tag-good">fix</span> Always wrap the tree in a
        Provider — and use a custom hook (Section G) that throws a clear error.
      </p>
    </div>
  );
}

function CountConsumer({ label }) {
  const ctx = useContext(DemoContext);
  const renders = useRef(0);
  renders.current += 1;
  return (
    <div className="card">
      <strong>{label}:</strong> count = {ctx?.count ?? 0}, renders ={" "}
      <strong>{renders.current}</strong>
    </div>
  );
}

function Mistake2() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);
  return (
    <DemoContext.Provider value={{ count, other }}>
      <div className="card">
        <h4>
          <span className="tag tag-bad">bad</span> One mega-context for
          everything
        </h4>
        <p>
          Both consumers below only care about <code>count</code>. But because{" "}
          <code>other</code> is in the same context, updating <code>other</code>{" "}
          re-renders <em>both</em> consumers.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => setCount((c) => c + 1)}
        >
          +1 to count
        </button>{" "}
        <button
          className="btn btn-secondary"
          onClick={() => setOther((o) => o + 1)}
        >
          +1 to other (notice both re-render)
        </button>
        <CountConsumer label="Consumer A" />
        <CountConsumer label="Consumer B" />
        <p className="demo-note">
          <span className="tag tag-good">fix</span> Split into{" "}
          <code>CountContext</code> and <code>OtherContext</code>. Consumers
          only re-render when the context they read changes.
        </p>
      </div>
    </DemoContext.Provider>
  );
}

function InlineConsumer({ label }) {
  const ctx = useContext(DemoContext);
  const renders = useRef(0);
  renders.current += 1;
  return (
    <div className="card">
      <strong>{label}:</strong> renders = <strong>{renders.current}</strong>
    </div>
  );
}

function Mistake3() {
  const [tick, setTick] = useState(0);

  return (
    <div className="card">
      <h4>
        <span className="tag tag-bad">bad</span> New value object every render
      </h4>
      <p>
        The Provider value <code>&#123;{`{ count: 0 }`}&#125;</code> is a
        brand-new object on every render of this component. Consumers re-render
        even though nothing they care about changed.
      </p>
      <button className="btn btn-primary" onClick={() => setTick((t) => t + 1)}>
        Force parent re-render (tick={tick})
      </button>
      <DemoContext.Provider value={{ count: 0 }}>
        <InlineConsumer label="Consumer (re-renders every tick — bad)" />
      </DemoContext.Provider>
      <p className="demo-note">
        <span className="tag tag-good">fix</span> Memoize the value with{" "}
        <code>useMemo</code>, or store it in <code>useState</code>:
      </p>
      <pre
        style={{
          background: "#f0f0f0",
          padding: 8,
          borderRadius: 6,
          overflow: "auto",
          fontSize: "0.85rem",
        }}
      >
        {`const value = useMemo(() => ({ count }), [count]);
return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;`}
      </pre>
    </div>
  );
}

function Mistake4() {
  return (
    <div className="card">
      <h4>
        <span className="tag tag-bad">bad</span> Using context for everything
      </h4>
      <p>
        Don't put <em>local</em> state in context just because you can. If only
        one component reads it, <code>useState</code> is correct.
      </p>
      <p className="demo-note">
        <span className="tag tag-good">fix</span> Default to{" "}
        <code>useState</code>. Promote to Context only when many components
        actually share the value (theme, user, cart, locale).
      </p>
    </div>
  );
}

function Mistake5() {
  return (
    <div className="card">
      <h4>
        <span className="tag tag-bad">bad</span> Mutating the context value
      </h4>
      <p>
        <code>{`ctx.items.push(newItem)`}</code> mutates in place. React doesn't
        see a new value, so consumers don't re-render.
      </p>
      <pre
        style={{
          background: "#f0f0f0",
          padding: 8,
          borderRadius: 6,
          overflow: "auto",
          fontSize: "0.85rem",
        }}
      >
        {`ctx.items.push(newItem);   // BAD — same array reference
setItems([...items, newItem]); // GOOD — new array, triggers re-render`}
      </pre>
      <p className="demo-note">
        <span className="tag tag-good">fix</span> Always replace state with a
        new value, never mutate the existing one — same rule as plain useState.
      </p>
    </div>
  );
}

export default function CommonMistakes() {
  return (
    <div className="demo-subsection">
      <h3>Common Context Mistakes</h3>
      <p className="demo-note">
        Five patterns that look fine but hurt correctness or performance. Each
        one has a one-line fix.
      </p>

      <Mistake1 />
      <Mistake2 />
      <Mistake3 />
      <Mistake4 />
      <Mistake5 />

      <div className="demo-practical">
        <h3>Quick reference</h3>
        <ul>
          <li>Always wrap the tree in a Provider.</li>
          <li>Split contexts by what changes together.</li>
          <li>
            Memoize the Provider's <code>value</code>.
          </li>
          <li>
            Don't reach for context when <code>useState</code> works.
          </li>
          <li>Treat context state as immutable — replace, don't mutate.</li>
        </ul>
      </div>
    </div>
  );
}
