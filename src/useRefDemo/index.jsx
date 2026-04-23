import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
import RefVsState from "./RefVsState";
import DomAccess from "./DomAccess";
import PreviousValue from "./PreviousValue";
import Stopwatch from "./Stopwatch";
import RefVsStateCode from "./RefVsState.jsx?raw";
import DomAccessCode from "./DomAccess.jsx?raw";
import PreviousValueCode from "./PreviousValue.jsx?raw";
import StopwatchCode from "./Stopwatch.jsx?raw";

// ============================================================
// useRef Demo — Values That Persist Without Re-Rendering
// ============================================================
// useRef gives you a "box" (.current) that persists across renders
// but DOES NOT trigger a re-render when changed.
// Each section mounts one at a time so the console stays clean.

const NOTES = (
  <TabNotes
    title="useRef — Mental Model"
    mentalModel={
      <>
        <p>
          A ref is a <strong>box</strong>. You read and write its contents
          through <code>.current</code>. The box survives every re-render, but
          writing to it does <em>not</em> trigger a re-render.
        </p>
        <p>
          Two uses come up constantly: (1) get a handle to a DOM node via{" "}
          <code>ref={"{inputRef}"}</code>, and (2) stash a mutable value the UI
          does not need to show (timer IDs, previous values, caches).
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Use useState when changing the value should update the screen.",
      },
      {
        kind: "do",
        text: "Use useRef when the value must persist across renders but does NOT need to re-render.",
      },
      {
        kind: "do",
        text: "Attach to a DOM node with the ref prop: <input ref={inputRef} /> → inputRef.current is the element.",
      },
      {
        kind: "dont",
        text: "Don't read or write ref.current during render — do it in event handlers or effects.",
      },
      {
        kind: "dont",
        text: "Don't use a ref to cache derived data that the UI displays — that's state.",
      },
    ]}
    gotchas={[
      "Updating ref.current does not re-render. If the screen should react to the change, that value belongs in useState.",
      "Refs to DOM nodes are null on the first render — they're set after React commits. Safe to use in effects or event handlers.",
      "The initial value useRef(x) only runs on the first render. Same pattern as useState.",
    ]}
    snippet={`// DOM ref
const inputRef = useRef(null);
useEffect(() => { inputRef.current?.focus(); }, []);
return <input ref={inputRef} />;

// Mutable value ref (timer ID)
const timerRef = useRef(null);
timerRef.current = setInterval(tick, 1000);
clearInterval(timerRef.current);`}
    snippetLabel="useRef"
  />
);

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you use useRef in real apps?</h3>
    <ul>
      <li>
        <strong>Auto-focusing inputs</strong> — focus a search bar when a page
        loads
      </li>
      <li>
        <strong>Storing timer/interval IDs</strong> — need to clear them later
        without re-rendering
      </li>
      <li>
        <strong>Tracking previous values</strong> — for animations or comparison
        logic
      </li>
      <li>
        <strong>Measuring DOM elements</strong> — getting element width/height
        for layout calculations
      </li>
      <li>
        <strong>Integrating non-React libraries</strong> — a chart library that
        needs a DOM node to render into
      </li>
      <li>
        <strong>
          Storing any value that should NOT trigger a re-render when it changes
        </strong>
      </li>
    </ul>
    <p className="demo-note">
      Rule of thumb: if changing a value should update the screen → useState. If
      it should NOT update the screen → useRef.
    </p>
  </div>
);

const sections = [
  { label: "Notes", content: NOTES },
  { label: "A. Ref vs State", content: <RefVsState />, code: RefVsStateCode },
  { label: "B. DOM Access", content: <DomAccess />, code: DomAccessCode },
  {
    label: "C. Previous Value",
    content: <PreviousValue />,
    code: PreviousValueCode,
  },
  { label: "D. Stopwatch", content: <Stopwatch />, code: StopwatchCode },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function UseRefDemo() {
  return (
    <div className="demo-section">
      <h2>useRef — Persistent Values Without Re-Renders</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the
        scenes. Use the section buttons below to step through each concept one
        at a time.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
