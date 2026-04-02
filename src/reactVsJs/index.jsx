import SectionStepper from "../SectionStepper";
import ImperativeVsDeclarative from "./ImperativeVsDeclarative";
import TrafficLight from "./TrafficLight";
import ReRenderingDemo from "./ReRenderingDemo";
import ImperativeVsDeclarativeCode from "./ImperativeVsDeclarative.jsx?raw";
import TrafficLightCode from "./TrafficLight.jsx?raw";
import ReRenderingDemoCode from "./ReRenderingDemo.jsx?raw";

// ============================================================
// React vs JavaScript — Understanding the React Mental Model
// ============================================================
// This file shows the fundamental difference between how
// vanilla JavaScript and React approach building UIs.
// Each section mounts one at a time so the console stays clean.

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When does the React mental model matter in real apps?</h3>
    <ul>
      <li>
        <strong>Thinking in state, not DOM</strong> — instead of "find the
        element and change its text," you ask "what state drives this text?"
      </li>
      <li>
        <strong>Declarative UI</strong> — describe what the UI should look like
        for every possible state; React figures out the DOM changes
      </li>
      <li>
        <strong>Re-renders are normal</strong> — React re-calls your component
        function often; keep it fast and side-effect-free
      </li>
      <li>
        <strong>Unidirectional data flow</strong> — data flows down through
        props; events flow up through callbacks
      </li>
      <li>
        <strong>Component boundaries</strong> — break the UI into small,
        reusable pieces; each piece manages its own slice of state
      </li>
    </ul>
    <p className="demo-note">
      Rule of thumb: if you catch yourself reaching for document.getElementById
      or innerHTML, stop and ask "what state should I change instead?" That is
      the core React mindset.
    </p>
  </div>
);

const sections = [
  {
    label: "A+B. Imperative vs Declarative",
    content: <ImperativeVsDeclarative />,
    code: ImperativeVsDeclarativeCode,
  },
  {
    label: "C. Traffic Light",
    content: <TrafficLight />,
    code: TrafficLightCode,
  },
  {
    label: "D. Re-Rendering",
    content: <ReRenderingDemo />,
    code: ReRenderingDemoCode,
  },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function ReactVsJs() {
  return (
    <div className="demo-section">
      <h2>React vs JavaScript — A New Way to Think About UI</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the
        scenes. Use the section buttons below to step through each concept one
        at a time.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
