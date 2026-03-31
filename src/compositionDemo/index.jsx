import SectionStepper from "../SectionStepper";
import ShellPatternDemo from "./ShellPatternDemo";
import NestingDemo from "./NestingDemo";
import PropsFlowDemo from "./PropsFlowDemo";
import LiftingStateDemo from "./LiftingStateDemo";

// ============================================================
// Composition Demo — Shells, Layouts, Props, and Lifting State
// ============================================================
// React is all about COMPOSING small pieces into bigger pieces.
// Components are like LEGO blocks — each one does one thing,
// and you snap them together to build complex UIs.
// Each section mounts one at a time so the console stays clean.

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you use composition in real apps?</h3>
    <ul>
      <li><strong>Dashboard layouts</strong> — a Shell for the sidebar, a Shell for the main content area</li>
      <li><strong>Theme providers</strong> — pass dark/light theme down through the component tree</li>
      <li><strong>Modal/dialog wrappers</strong> — a Shell that adds an overlay and a close button</li>
      <li><strong>Form field containers</strong> — a wrapper that adds a label, error message, and styling</li>
      <li><strong>Page layouts</strong> — header + sidebar + content + footer, all composed together</li>
      <li><strong>Lifting state</strong> — whenever two siblings need to share data, move the state to their parent</li>
    </ul>
    <p className="demo-note">
      Rule of thumb: if two components need to stay in sync, lift their shared state to
      the nearest common parent and pass it down as props.
    </p>
  </div>
);

const sections = [
  { label: "A. Shell Pattern", content: <ShellPatternDemo /> },
  { label: "B. Nesting", content: <NestingDemo /> },
  { label: "C. Props Flow Down", content: <PropsFlowDemo /> },
  { label: "D. Lifting State", content: <LiftingStateDemo /> },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function CompositionDemo() {
  return (
    <div className="demo-section">
      <h2>Composition — Building UIs from Small Pieces</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the scenes.
        Use the section buttons below to step through each concept one at a time.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
