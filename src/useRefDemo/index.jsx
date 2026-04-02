import SectionStepper from "../SectionStepper";
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
