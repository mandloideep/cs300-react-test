import SectionStepper from "../SectionStepper";
import ImperativeVsDeclarative from "./ImperativeVsDeclarative";
import TrafficLight from "./TrafficLight";
import ReRenderingDemo from "./ReRenderingDemo";

// ============================================================
// React vs JavaScript — Understanding the React Mental Model
// ============================================================
// This file shows the fundamental difference between how
// vanilla JavaScript and React approach building UIs.
// Each section mounts one at a time so the console stays clean.

const sections = [
  { label: "A+B. Imperative vs Declarative", content: <ImperativeVsDeclarative /> },
  { label: "C. Traffic Light", content: <TrafficLight /> },
  { label: "D. Re-Rendering", content: <ReRenderingDemo /> },
];

export default function ReactVsJs() {
  return (
    <div className="demo-section">
      <h2>React vs JavaScript — A New Way to Think About UI</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the scenes.
        Use the section buttons below to step through each concept one at a time.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
