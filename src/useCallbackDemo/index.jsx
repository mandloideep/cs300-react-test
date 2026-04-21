import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
import RerenderProblem from "./RerenderProblem";
import WhyFunctionsChange from "./WhyFunctionsChange";
import UseCallbackSyntax from "./UseCallbackSyntax";
import ReactMemo from "./ReactMemo";
import UseMemoDemo from "./UseMemoDemo";
import WhenNotToUse from "./WhenNotToUse";

import RerenderProblemCode from "./RerenderProblem.jsx?raw";
import WhyFunctionsChangeCode from "./WhyFunctionsChange.jsx?raw";
import UseCallbackSyntaxCode from "./UseCallbackSyntax.jsx?raw";
import ReactMemoCode from "./ReactMemo.jsx?raw";
import UseMemoDemoCode from "./UseMemoDemo.jsx?raw";
import WhenNotToUseCode from "./WhenNotToUse.jsx?raw";

const NOTES = (
  <TabNotes
    title="useCallback / useMemo / React.memo — Mental Model"
    mentalModel={
      <>
        <p>
          Every render, your component function runs again — so every
          function and object literal inside it is a <strong>new</strong>{" "}
          value. Children that receive them as props see "different props"
          and re-render even when the logic hasn't changed.
        </p>
        <p>
          <code>useCallback</code> freezes a function's identity across
          renders. <code>useMemo</code> does the same for a computed value.
          <code>React.memo</code> tells a component to skip re-rendering
          when its props are equal by reference. The three only help{" "}
          <strong>together</strong> — memoizing a prop is pointless if the
          child isn't memoized.
        </p>
        <p>
          Treat them as <em>performance</em> tools, not correctness tools.
          Measure first; reach for them when a render is actually expensive.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Use React.memo on the child first — that's what actually skips the render.",
      },
      {
        kind: "do",
        text: "Wrap functions passed to memoized children in useCallback so their identity is stable.",
      },
      {
        kind: "do",
        text: "Use useMemo for genuinely expensive computations (big lists, heavy math), not cheap ones.",
      },
      {
        kind: "dont",
        text: "Don't useCallback everything — the wrapper itself has a cost and adds noise.",
      },
      {
        kind: "dont",
        text: "Don't omit a dependency to 'stabilize' a callback — that bakes in a stale closure.",
      },
    ]}
    gotchas={[
      "useCallback is useless without React.memo on the receiver (or use as an effect dependency). On its own, it changes nothing.",
      "Passing an inline object or array to a memoized child defeats the memo — every render creates a new reference.",
      "Stale closures: a useCallback with [] captures the first render's values forever. List the real dependencies.",
    ]}
    snippet={`const Child = React.memo(function Child({ onClick }) {
  return <button onClick={onClick}>Go</button>;
});

function Parent() {
  const [n, setN] = useState(0);

  // stable identity — Child won't re-render when n changes
  const handleClick = useCallback(() => doThing(), []);

  // only recompute when items changes
  const sorted = useMemo(() => items.slice().sort(), [items]);

  return <Child onClick={handleClick} />;
}`}
    snippetLabel="useCallback + memo"
  />
);

const sections = [
  { label: "Notes", content: NOTES },
  {
    label: "A. Re-render Problem",
    content: <RerenderProblem />,
    code: RerenderProblemCode,
  },
  {
    label: "B. Why Functions Change",
    content: <WhyFunctionsChange />,
    code: WhyFunctionsChangeCode,
  },
  {
    label: "C. useCallback Syntax",
    content: <UseCallbackSyntax />,
    code: UseCallbackSyntaxCode,
  },
  {
    label: "D. React.memo",
    content: <ReactMemo />,
    code: ReactMemoCode,
  },
  {
    label: "E. useMemo",
    content: <UseMemoDemo />,
    code: UseMemoDemoCode,
  },
  {
    label: "F. When NOT to Use",
    content: <WhenNotToUse />,
    code: WhenNotToUseCode,
  },
];

export default function UseCallbackDemo() {
  return (
    <div className="demo-section">
      <h2>useCallback, React.memo & useMemo — Performance Optimization</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
