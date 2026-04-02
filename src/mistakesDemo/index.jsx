// ============================================================
// Mistakes Demo — SectionStepper wrapper
// ============================================================

import SectionStepper from "../SectionStepper";
import MutationBug from "./MutationBug";
import StaleClosureInEffect from "./StaleClosureInEffect";
import MissingDeps from "./MissingDeps";
import InfiniteLoop from "./InfiniteLoop";
import MutationBugCode from "./MutationBug.jsx?raw";
import StaleClosureInEffectCode from "./StaleClosureInEffect.jsx?raw";
import MissingDepsCode from "./MissingDeps.jsx?raw";
import InfiniteLoopCode from "./InfiniteLoop.jsx?raw";

const PRACTICAL = (
  <div className="demo-practical">
    <h3>How do you avoid these mistakes in real apps?</h3>
    <ul>
      <li>
        <strong>Mutation bugs</strong> — always spread objects/arrays before
        modifying; use ESLint rules to catch direct mutations
      </li>
      <li>
        <strong>Stale closures</strong> — use the functional updater form (prev
        =&gt; prev + 1) whenever new state depends on old state
      </li>
      <li>
        <strong>Missing dependency arrays</strong> — include every variable your
        effect reads; the React ESLint plugin warns about this automatically
      </li>
      <li>
        <strong>Infinite loops</strong> — never setState unconditionally inside
        useEffect without a proper dependency array; always ask "what triggers
        this effect?"
      </li>
      <li>
        <strong>Debugging strategy</strong> — add console.log at the top of your
        component to see how often it re-renders, and inside effects to see when
        they fire
      </li>
    </ul>
    <p className="demo-note">
      Rule of thumb: install the "eslint-plugin-react-hooks" package and follow
      its warnings. Most of these mistakes are caught automatically if you pay
      attention to the linter.
    </p>
  </div>
);

const sections = [
  { label: "A. Mutation Bug", content: <MutationBug />, code: MutationBugCode },
  {
    label: "B. Stale Closure",
    content: <StaleClosureInEffect />,
    code: StaleClosureInEffectCode,
  },
  { label: "C. Missing Deps", content: <MissingDeps />, code: MissingDepsCode },
  {
    label: "D. Infinite Loop",
    content: <InfiniteLoop />,
    code: InfiniteLoopCode,
  },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function MistakesDemo() {
  return (
    <div className="demo-section">
      <h2>Common State Mistakes</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
