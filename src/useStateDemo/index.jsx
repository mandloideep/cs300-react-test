import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
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

const NOTES = (
  <TabNotes
    title="useState — Mental Model"
    mentalModel={
      <>
        <p>
          State is a <strong>snapshot</strong>. Each render captures the
          values of state at that moment. Calling the setter schedules a{" "}
          <em>new</em> render with new values — it does not change the
          variables you already have in scope.
        </p>
        <p>
          React decides whether to re-render by comparing new state to old
          by <strong>reference</strong>. Mutating an object in place keeps
          the same reference, so nothing re-renders. To update, you replace.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Call the setter to update state — never reassign the variable.",
      },
      {
        kind: "do",
        text: "Use the updater form setN(prev => prev + 1) when the new value depends on the old.",
      },
      {
        kind: "do",
        text: "Replace objects/arrays with new ones: { ...obj, x: 1 } or [...arr, item].",
      },
      {
        kind: "dont",
        text: "Never mutate state in place (obj.x = 1, arr.push(item)).",
      },
      {
        kind: "dont",
        text: "Don't read state right after calling the setter expecting the new value — it updates on the next render.",
      },
    ]}
    gotchas={[
      "Multiple setN(n + 1) calls in one event handler collapse to one update, not three. Use setN(prev => prev + 1) to stack them.",
      "The initial value argument runs on every render but is only used on the first. For expensive init, pass a function: useState(() => compute()).",
      "State is local to the component instance. Two <Counter />s have independent state — lift it up if they need to share.",
    ]}
    snippet={`const [count, setCount] = useState(0);

// ✓ replace, don't mutate
setCount(count + 1);

// ✓ updater form when new depends on old
setCount(prev => prev + 1);

// ✓ lazy init for expensive defaults
const [rows, setRows] = useState(() => parseCSV(bigFile));`}
    snippetLabel="useState"
  />
);

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
  { label: "Notes", content: NOTES },
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
