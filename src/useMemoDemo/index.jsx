import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
import ExpensiveComputation from "./ExpensiveComputation";
import HowUseMemoWorks from "./HowUseMemoWorks";
import MemoizingObjectsArrays from "./MemoizingObjectsArrays";
import UseMemoReactMemo from "./UseMemoReactMemo";
import RealWorldPatterns from "./RealWorldPatterns";
import WhenNotToUseMemo from "./WhenNotToUseMemo";

import ExpensiveComputationCode from "./ExpensiveComputation.jsx?raw";
import HowUseMemoWorksCode from "./HowUseMemoWorks.jsx?raw";
import MemoizingObjectsArraysCode from "./MemoizingObjectsArrays.jsx?raw";
import UseMemoReactMemoCode from "./UseMemoReactMemo.jsx?raw";
import RealWorldPatternsCode from "./RealWorldPatterns.jsx?raw";
import WhenNotToUseMemoCode from "./WhenNotToUseMemo.jsx?raw";

const NOTES = (
  <TabNotes
    title="useMemo — Cache a Computed Value Across Renders"
    mentalModel={
      <>
        <p>
          Every render, your component function runs top-to-bottom. Any
          expression on the right-hand side of a <code>const</code> gets
          recomputed — even if the inputs haven't changed. For a cheap
          expression that's fine. For a 5&nbsp;ms sort over 10,000 rows, it's
          wasted work on every keystroke.
        </p>
        <p>
          <code>useMemo(fn, deps)</code> is a{" "}
          <strong>cache with one slot</strong>. React runs <code>fn()</code> the
          first render and stores the result. On later renders it compares{" "}
          <code>deps</code> to the previous deps with <code>Object.is</code>; if
          every dep is the same, it returns the <em>cached</em> value and{" "}
          <em>does not</em> call <code>fn</code> again. If any dep changed, it
          reruns and caches the new result.
        </p>
        <p>Two distinct jobs come out of that one mechanism:</p>
        <ol>
          <li>
            <strong>Skip expensive computation</strong> — the one shown in every
            tutorial.
          </li>
          <li>
            <strong>Stabilize reference identity</strong> — an object or array
            literal in a render body is a <em>new</em> reference each time.
            Wrapping it in <code>useMemo</code> gives you the <em>same</em>{" "}
            reference across renders, so a <code>React.memo</code> child or a{" "}
            <code>useEffect</code> dep array doesn't see "a change" when nothing
            meaningful changed.
          </li>
        </ol>
        <p>
          Think of the dep array as the <strong>cache invalidation key</strong>.
          Every value the computation reads from props or state must appear
          there, or the cache will happily hand back a stale answer.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Measure first. Reach for useMemo when a render is visibly slow or a child is memoized and you're passing it an object/array.",
      },
      {
        kind: "do",
        text: "List every prop/state value the computation reads in the dep array — treat it like useEffect's deps.",
      },
      {
        kind: "do",
        text: "Use useMemo to stabilize objects/arrays you pass to React.memo children or include in useEffect deps.",
      },
      {
        kind: "dont",
        text: "Don't wrap cheap expressions (string concat, small arithmetic, .map over 20 items) — the cache bookkeeping costs more than it saves.",
      },
      {
        kind: "dont",
        text: "Don't use useMemo for side effects. The function must be pure — return a value, don't fetch, don't mutate.",
      },
      {
        kind: "dont",
        text: "Don't rely on useMemo for correctness. React may discard the cache and recompute; your code must still work.",
      },
    ]}
    gotchas={[
      "Empty deps []: the computation runs once and the cached value captures stale props/state forever. Almost always a bug — list the real deps.",
      "New object/array literal in the dep array (deps: [{id}]) defeats the cache — that literal is a new reference every render, so useMemo recomputes every time.",
      "Stabilizing a value that goes to a non-memoized child accomplishes nothing. The child re-renders because its parent re-rendered, not because of prop identity.",
      "useMemo returns the value; useCallback returns a function. `useMemo(() => fn, deps)` is not the same as `useCallback(fn, deps)` — the first caches fn itself, the second caches a call to fn.",
      "React 19's Compiler can memoize many of these cases automatically — but you still need to understand the mental model to read existing code and debug when it doesn't.",
    ]}
    snippet={`// 1) Skip expensive computation
const sorted = useMemo(
  () => bigList.slice().sort(cmp),
  [bigList]
);

// 2) Stabilize a reference for a memoized child
const columns = useMemo(
  () => [{ key: "name" }, { key: "score" }],
  []  // never changes — safe []
);

// 3) Stabilize an object that IS derived from state
const filter = useMemo(
  () => ({ query, minScore }),
  [query, minScore]
);

return <MemoTable columns={columns} filter={filter} rows={sorted} />;`}
    snippetLabel="useMemo"
  />
);

const sections = [
  { label: "Notes", content: NOTES },
  {
    label: "A. Expensive Computation",
    content: <ExpensiveComputation />,
    code: ExpensiveComputationCode,
  },
  {
    label: "B. How useMemo Works",
    content: <HowUseMemoWorks />,
    code: HowUseMemoWorksCode,
  },
  {
    label: "C. Objects & Arrays",
    content: <MemoizingObjectsArrays />,
    code: MemoizingObjectsArraysCode,
  },
  {
    label: "D. useMemo + React.memo",
    content: <UseMemoReactMemo />,
    code: UseMemoReactMemoCode,
  },
  {
    label: "E. Real-World Patterns",
    content: <RealWorldPatterns />,
    code: RealWorldPatternsCode,
  },
  {
    label: "F. When NOT to Use",
    content: <WhenNotToUseMemo />,
    code: WhenNotToUseMemoCode,
  },
];

export default function UseMemoDemo() {
  return (
    <div className="demo-section">
      <h2>useMemo — Memoizing Expensive Values & Stabilizing References</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
