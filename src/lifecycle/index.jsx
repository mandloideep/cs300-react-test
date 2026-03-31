import SectionStepper from "../SectionStepper";
import LifecycleTimeline from "./LifecycleTimeline";
import ParentChildLifecycle from "./ParentChildLifecycle";
import ConditionalMounting from "./ConditionalMounting";
import EffectDepsVisualized from "./EffectDepsVisualized";

// ============================================================
// Lifecycle Demo — Understanding When React Does What
// ============================================================
// Every React component goes through a lifecycle:
//   1. MOUNT — component appears on screen for the first time
//   2. RE-RENDER — component updates because state or props changed
//   3. UNMOUNT — component is removed from the screen
// Each section mounts one at a time so the console stays clean.

const PRACTICAL = (
  <div className="demo-practical">
    <h3>Why does the lifecycle matter?</h3>
    <ul>
      <li><strong>Mount</strong> — fetch data, set up event listeners, start animations</li>
      <li><strong>Update</strong> — react to state/prop changes, sync external systems</li>
      <li><strong>Unmount</strong> — clean up timers, cancel network requests, remove event listeners</li>
      <li><strong>Parent-child order</strong> — know that children finish rendering before parent effects run</li>
      <li><strong>Conditional rendering</strong> — toggling a component is a real mount/unmount, not just CSS display:none</li>
    </ul>
    <p className="demo-note">
      Understanding the lifecycle helps you debug: "Why did my effect run twice?"
      "Why is my cleanup not firing?" "When does my data fetch happen?"
    </p>
  </div>
);

const sections = [
  { label: "A. Lifecycle Timeline", content: <LifecycleTimeline /> },
  { label: "B. Parent-Child Order", content: <ParentChildLifecycle /> },
  { label: "C. Conditional Mount", content: <ConditionalMounting /> },
  { label: "D. Deps Visualized", content: <EffectDepsVisualized /> },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function LifecycleDemo() {
  return (
    <div className="demo-section">
      <h2>Lifecycle — When React Does What</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see the full lifecycle logs.
        Use the section buttons below to step through each concept one at a time.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
