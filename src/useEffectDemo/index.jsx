import SectionStepper from "../SectionStepper";
import RenderVsEffect from "./RenderVsEffect";
import DependencyArray from "./DependencyArray";
import CleanupDemo from "./CleanupDemo";
import DebouncedSearch from "./DebouncedSearch";
import RenderVsEffectCode from "./RenderVsEffect.jsx?raw";
import DependencyArrayCode from "./DependencyArray.jsx?raw";
import CleanupDemoCode from "./CleanupDemo.jsx?raw";
import DebouncedSearchCode from "./DebouncedSearch.jsx?raw";

// ============================================================
// useEffect Demo — Running Code Outside the Render Cycle
// ============================================================
// useEffect lets you run "side effects" AFTER React has updated the screen.
// Side effects = anything that reaches outside the component:
//   - fetching data, setting timers, subscribing to events, logging, etc.
// Each section mounts one at a time so the console stays clean.

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you use useEffect in real apps?</h3>
    <ul>
      <li>
        <strong>Fetching data from an API</strong> — load user data when a
        profile page mounts
      </li>
      <li>
        <strong>Subscribing to events</strong> — listen for window resize,
        WebSocket messages, keyboard shortcuts
      </li>
      <li>
        <strong>Syncing with localStorage</strong> — save user preferences
        whenever they change
      </li>
      <li>
        <strong>Updating the document title</strong> —{" "}
        <code>
          document.title = `You have $&#123;count&#125; notifications`
        </code>
      </li>
      <li>
        <strong>Setting up timers</strong> — intervals, timeouts, debouncing,
        polling
      </li>
      <li>
        <strong>Analytics/logging</strong> — track page views or user
        interactions
      </li>
      <li>
        <strong>Cleanup on unmount</strong> — unsubscribe, clear timers, cancel
        network requests
      </li>
    </ul>
    <p className="demo-note">
      Rule of thumb: if code needs to "reach outside" the component (browser
      APIs, network, DOM) → useEffect. If it's just computing a value from
      props/state → do it in the function body, no effect needed.
    </p>
  </div>
);

const sections = [
  {
    label: "A. Render vs Effect",
    content: <RenderVsEffect />,
    code: RenderVsEffectCode,
  },
  {
    label: "B. Dependency Array",
    content: <DependencyArray />,
    code: DependencyArrayCode,
  },
  { label: "C. Cleanup", content: <CleanupDemo />, code: CleanupDemoCode },
  {
    label: "D. Debounced Search",
    content: <DebouncedSearch />,
    code: DebouncedSearchCode,
  },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function UseEffectDemo() {
  return (
    <div className="demo-section">
      <h2>useEffect — Side Effects Outside the Render Cycle</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the
        scenes. Use the section buttons below to step through each concept one
        at a time.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
