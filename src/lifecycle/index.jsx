import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
import LifecycleTimeline from "./LifecycleTimeline";
import ParentChildLifecycle from "./ParentChildLifecycle";
import ConditionalMounting from "./ConditionalMounting";
import EffectDepsVisualized from "./EffectDepsVisualized";
import LifecycleTimelineCode from "./LifecycleTimeline.jsx?raw";
import ParentChildLifecycleCode from "./ParentChildLifecycle.jsx?raw";
import ConditionalMountingCode from "./ConditionalMounting.jsx?raw";
import EffectDepsVisualizedCode from "./EffectDepsVisualized.jsx?raw";

// ============================================================
// Lifecycle Demo — Understanding When React Does What
// ============================================================
// Every React component goes through a lifecycle:
//   1. MOUNT — component appears on screen for the first time
//   2. RE-RENDER — component updates because state or props changed
//   3. UNMOUNT — component is removed from the screen
// Each section mounts one at a time so the console stays clean.

const NOTES = (
  <TabNotes
    title="Lifecycle — Mental Model"
    mentalModel={
      <>
        <p>
          Function components have three phases: <strong>mount</strong> (first
          time on screen), <strong>update</strong> (re-render because props or
          state changed), and <strong>unmount</strong> (removed from screen).
        </p>
        <p>
          There are no <code>componentDidMount</code>-style methods.
          <code>useEffect</code> with different dependency arrays covers all
          three cases. The <em>cleanup</em> function returned from an effect
          runs before the next effect and on unmount.
        </p>
        <p>
          Order inside one render pass: children render before parents' effects
          run. Cleanup runs before the next effect in the same component.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "useEffect(fn, [])   — run once on mount, cleanup on unmount.",
      },
      {
        kind: "do",
        text: "useEffect(fn, [x])  — run when x changes (plus first mount). Previous cleanup runs first.",
      },
      {
        kind: "do",
        text: "useEffect(fn)       — run after every render. Rarely what you want.",
      },
      {
        kind: "do",
        text: "Always clean up subscriptions, timers, and listeners in the returned function.",
      },
      {
        kind: "dont",
        text: "Don't rely on render order for logic — only side effects in useEffect see a consistent order.",
      },
    ]}
    gotchas={[
      "Conditional rendering with && is a real mount/unmount. It's not like CSS display:none — state resets.",
      "Effects run AFTER the browser has painted. If you need to measure DOM synchronously, use useLayoutEffect.",
      "In React StrictMode (dev only), mount/cleanup/mount runs on purpose to surface bugs. In production it mounts once.",
      "Switching tabs in this app triggers real unmounts — open the console to see cleanup logs fire.",
    ]}
    snippet={`// Mount once, clean up on unmount
useEffect(() => {
  console.log("mounted");
  return () => console.log("unmounted");
}, []);

// Run when userId changes (old cleanup runs first)
useEffect(() => {
  const sub = subscribe(userId);
  return () => sub.cancel();
}, [userId]);`}
    snippetLabel="Lifecycle via useEffect"
  />
);

const PRACTICAL = (
  <div className="demo-practical">
    <h3>Why does the lifecycle matter?</h3>
    <ul>
      <li>
        <strong>Mount</strong> — fetch data, set up event listeners, start
        animations
      </li>
      <li>
        <strong>Update</strong> — react to state/prop changes, sync external
        systems
      </li>
      <li>
        <strong>Unmount</strong> — clean up timers, cancel network requests,
        remove event listeners
      </li>
      <li>
        <strong>Parent-child order</strong> — know that children finish
        rendering before parent effects run
      </li>
      <li>
        <strong>Conditional rendering</strong> — toggling a component is a real
        mount/unmount, not just CSS display:none
      </li>
    </ul>
    <p className="demo-note">
      Understanding the lifecycle helps you debug: "Why did my effect run
      twice?" "Why is my cleanup not firing?" "When does my data fetch happen?"
    </p>
  </div>
);

const sections = [
  { label: "Notes", content: NOTES },
  {
    label: "A. Lifecycle Timeline",
    content: <LifecycleTimeline />,
    code: LifecycleTimelineCode,
  },
  {
    label: "B. Parent-Child Order",
    content: <ParentChildLifecycle />,
    code: ParentChildLifecycleCode,
  },
  {
    label: "C. Conditional Mount",
    content: <ConditionalMounting />,
    code: ConditionalMountingCode,
  },
  {
    label: "D. Deps Visualized",
    content: <EffectDepsVisualized />,
    code: EffectDepsVisualizedCode,
  },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function LifecycleDemo() {
  return (
    <div className="demo-section">
      <h2>Lifecycle — When React Does What</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see the full lifecycle
        logs. Use the section buttons below to step through each concept one at
        a time.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
