import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
import ShellPatternDemo from "./ShellPatternDemo";
import NestingDemo from "./NestingDemo";
import PropsFlowDemo from "./PropsFlowDemo";
import LiftingStateDemo from "./LiftingStateDemo";
import ShellPatternDemoCode from "./ShellPatternDemo.jsx?raw";
import NestingDemoCode from "./NestingDemo.jsx?raw";
import PropsFlowDemoCode from "./PropsFlowDemo.jsx?raw";
import LiftingStateDemoCode from "./LiftingStateDemo.jsx?raw";

// ============================================================
// Composition Demo — Shells, Layouts, Props, and Lifting State
// ============================================================
// React is all about COMPOSING small pieces into bigger pieces.
// Components are like LEGO blocks — each one does one thing,
// and you snap them together to build complex UIs.
// Each section mounts one at a time so the console stays clean.

const NOTES = (
  <TabNotes
    title="Composition — Mental Model"
    mentalModel={
      <>
        <p>
          React components are <strong>LEGO blocks</strong>. Each one does
          one thing; you snap them together to build complex UIs. You rarely
          configure a component with a dozen boolean props — instead you
          pass smaller components into it.
        </p>
        <p>
          Two lifelines: <code>children</code> lets a parent wrap arbitrary
          content ("shells" like layouts, cards, modals). "Lifting state up"
          is how two siblings share data — the common parent owns the
          state and passes it (plus a setter) down as props.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Prefer <Wrapper>{children}</Wrapper> over <Wrapper variant='x' showY fancy />.",
      },
      {
        kind: "do",
        text: "Lift state to the nearest common parent when two components must stay in sync.",
      },
      {
        kind: "do",
        text: "Pass data down through props, events back up through callbacks.",
      },
      {
        kind: "dont",
        text: "Don't duplicate state in siblings — one source of truth, shared via the parent.",
      },
      {
        kind: "dont",
        text: "Don't reach for Context until prop-passing becomes genuinely painful (usually 3+ levels).",
      },
    ]}
    gotchas={[
      "children is just a prop. You can accept other components as named props too (header, sidebar, footer) — the 'slots' pattern.",
      "Passing a new object/array/function on each render causes children to see 'changed' props. Memoize only when it matters for perf.",
      "Lifting state up is the default fix for 'these two things need to talk'. Context is for wide, stable values, not sibling sync.",
    ]}
    snippet={`// Shell pattern — accepts any children
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Lifting state up
function Parent() {
  const [value, setValue] = useState("");
  return (
    <>
      <Input value={value} onChange={setValue} />
      <Preview value={value} />
    </>
  );
}`}
    snippetLabel="Children + lifting state"
  />
);

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you use composition in real apps?</h3>
    <ul>
      <li>
        <strong>Dashboard layouts</strong> — a Shell for the sidebar, a Shell
        for the main content area
      </li>
      <li>
        <strong>Theme providers</strong> — pass dark/light theme down through
        the component tree
      </li>
      <li>
        <strong>Modal/dialog wrappers</strong> — a Shell that adds an overlay
        and a close button
      </li>
      <li>
        <strong>Form field containers</strong> — a wrapper that adds a label,
        error message, and styling
      </li>
      <li>
        <strong>Page layouts</strong> — header + sidebar + content + footer, all
        composed together
      </li>
      <li>
        <strong>Lifting state</strong> — whenever two siblings need to share
        data, move the state to their parent
      </li>
    </ul>
    <p className="demo-note">
      Rule of thumb: if two components need to stay in sync, lift their shared
      state to the nearest common parent and pass it down as props.
    </p>
  </div>
);

const sections = [
  { label: "Notes", content: NOTES },
  {
    label: "A. Shell Pattern",
    content: <ShellPatternDemo />,
    code: ShellPatternDemoCode,
  },
  { label: "B. Nesting", content: <NestingDemo />, code: NestingDemoCode },
  {
    label: "C. Props Flow Down",
    content: <PropsFlowDemo />,
    code: PropsFlowDemoCode,
  },
  {
    label: "D. Lifting State",
    content: <LiftingStateDemo />,
    code: LiftingStateDemoCode,
  },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function CompositionDemo() {
  return (
    <div className="demo-section">
      <h2>Composition — Building UIs from Small Pieces</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the
        scenes. Use the section buttons below to step through each concept one
        at a time.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
