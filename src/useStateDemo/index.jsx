import SectionStepper from "../SectionStepper";
import BrokenCounter from "./BrokenCounter";
import WorkingCounter from "./WorkingCounter";
import StaleStateTrap from "./StaleStateTrap";
import MultipleStates from "./MultipleStates";
import BrokenCounterCode from "./BrokenCounter.jsx?raw";
import WorkingCounterCode from "./WorkingCounter.jsx?raw";
import StaleStateTrapCode from "./StaleStateTrap.jsx?raw";
import MultipleStatesCode from "./MultipleStates.jsx?raw";

// ============================================================
// useState Demo — Understanding React State
// ============================================================
// This file teaches WHY React state exists, HOW it works,
// and common pitfalls students encounter.
// Each section mounts one at a time so the console stays clean.

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you use useState in real apps?</h3>
    <ul>
      <li>
        <strong>Form inputs</strong> — tracking what the user types (name,
        email, password)
      </li>
      <li>
        <strong>Toggles</strong> — dark mode on/off, sidebar open/closed, modal
        visible/hidden
      </li>
      <li>
        <strong>Counters</strong> — items in a shopping cart, notification
        badges, pagination
      </li>
      <li>
        <strong>Loading/error states</strong> — showing a spinner while data
        loads, showing error messages
      </li>
      <li>
        <strong>Selected items</strong> — which tab is active, which list item
        is highlighted
      </li>
      <li>
        <strong>
          Any data that, when it changes, should update what the user sees
        </strong>
      </li>
    </ul>
    <p className="demo-note">
      Rule of thumb: if the UI should change when a value changes, put it in
      state. If not (like a timer ID or a cache), use useRef instead.
    </p>
  </div>
);

const sections = [
  {
    label: "A. Broken Counter",
    content: <BrokenCounter />,
    code: BrokenCounterCode,
  },
  {
    label: "B. Working Counter",
    content: <WorkingCounter />,
    code: WorkingCounterCode,
  },
  {
    label: "C. Stale State Trap",
    content: <StaleStateTrap />,
    code: StaleStateTrapCode,
  },
  {
    label: "D. Multiple States",
    content: <MultipleStates />,
    code: MultipleStatesCode,
  },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function UseStateDemo() {
  return (
    <div className="demo-section">
      <h2>useState — Making React Aware of Changes</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the
        scenes. Use the section buttons below to step through each concept one
        at a time.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
