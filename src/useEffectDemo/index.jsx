import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
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

const NOTES = (
  <TabNotes
    title="useEffect — Mental Model"
    mentalModel={
      <>
        <p>
          <code>useEffect</code> is how your component{" "}
          <strong>synchronizes with something outside of React</strong> —
          the DOM, the network, timers, subscriptions, localStorage.
        </p>
        <p>
          It runs <em>after</em> React commits the render to the screen.
          The dependency array tells React when to re-run it: whenever any
          listed value changed since the last render.
        </p>
        <p>
          The cleanup function runs <strong>before</strong> the next effect
          runs and when the component unmounts. It exists so the "outside
          thing" stays in sync — every subscription gets unsubscribed, every
          timer gets cleared.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Use useEffect only for side effects — reaching outside React (network, DOM APIs, timers, subscriptions).",
      },
      {
        kind: "do",
        text: "List every value from props/state/scope that the effect reads in the dependency array.",
      },
      {
        kind: "do",
        text: "Return a cleanup function whenever you create a subscription, timer, or listener.",
      },
      {
        kind: "dont",
        text: "Don't use useEffect to compute a value from other state — compute it during render instead.",
      },
      {
        kind: "dont",
        text: "Don't leave out dependencies to 'fix' an infinite loop — the bug is that state is set unconditionally.",
      },
    ]}
    gotchas={[
      "No dependency array = runs after EVERY render. Empty [] = runs once after mount. [x] = runs when x changes.",
      "Setting state inside an effect triggers another render, which can trigger the effect again. Guard with a condition or pick the right dependencies.",
      "In StrictMode (dev only), effects mount → cleanup → mount again on purpose. This surfaces missing cleanup bugs.",
      "An async function cannot be passed to useEffect directly. Define an async function inside and call it, or return a cleanup that cancels.",
    ]}
    snippet={`useEffect(() => {
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id);   // cleanup
}, []);   // [] = run once on mount, clean up on unmount

useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);   // re-run whenever count changes`}
    snippetLabel="useEffect"
  />
);

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
  { label: "Notes", content: NOTES },
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
