import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
import DataFetchingState from "./DataFetchingState";
import FormsValidation from "./FormsValidation";
import TablesRouting from "./TablesRouting";
import UIStyling from "./UIStyling";
import Utilities from "./Utilities";

const NOTES = (
  <TabNotes
    title="React Ecosystem — How to Pick (and When to Skip) a Library"
    mentalModel={
      <>
        <p>
          React itself is small on purpose. It renders UI from state, and that's
          roughly it. Everything else you need in a real app — fetching data,
          managing forms, validating input, routing, styling, animating,
          formatting dates — lives in the <strong>ecosystem</strong>. The hard
          skill isn't learning any one library; it's knowing which job each
          category solves and reaching for the right one at the right time.
        </p>
        <p>
          Think of this tab as an <strong>ecosystem map</strong>, not a
          tutorial. Each section groups libraries by the problem they solve:
        </p>
        <ul>
          <li>
            <strong>Data fetching & state</strong> (TanStack Query, Zustand,
            Axios) — replaces hand-rolled <code>useEffect + useState</code> for
            server data and global state.
          </li>
          <li>
            <strong>Forms & validation</strong> (React Hook Form, Zod) —
            replaces controlled-input boilerplate and ad-hoc{" "}
            <code>if (!email)</code> checks.
          </li>
          <li>
            <strong>Tables & routing</strong> (TanStack Table, TanStack Router)
            — sortable/filterable data grids and type-safe URL state.
          </li>
          <li>
            <strong>UI & styling</strong> (Tailwind, shadcn/ui, Framer Motion,
            React Icons) — visual layer, components, motion.
          </li>
          <li>
            <strong>Utilities</strong> (date-fns, Day.js, React Hot Toast) —
            small single-purpose helpers.
          </li>
        </ul>
        <p>
          A library earns its place when it replaces a pile of custom code you'd
          otherwise write, test, and maintain. It fails the test when it
          replaces three lines of <code>useState</code>/<code>useEffect</code>{" "}
          with a 40&nbsp;KB dependency and a new mental model.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Start with the problem, not the library. Write it with plain React first; add a library only when the rough edges are real.",
      },
      {
        kind: "do",
        text: "Prefer one well-maintained library per category (one fetcher, one forms lib, one router) — consistency beats breadth.",
      },
      {
        kind: "do",
        text: "Check weekly npm downloads, last commit date, and GitHub issue response before adopting. Dead libraries bite.",
      },
      {
        kind: "do",
        text: "Read the 'Getting Started' + one real example before committing. If the API feels wrong on day one, it won't feel better on day 30.",
      },
      {
        kind: "dont",
        text: "Don't install a library to avoid learning a hook. useState + useEffect covers more than beginners expect.",
      },
      {
        kind: "dont",
        text: "Don't stack three libraries that solve the same problem (Redux + Zustand + Context). Pick one.",
      },
      {
        kind: "dont",
        text: "Don't pick libraries by stars alone. Stars measure hype; downloads + recent commits measure health.",
      },
    ]}
    gotchas={[
      "Bundle size adds up fast. A moment-like date library can be 60+ KB gzipped; date-fns / Day.js are a fraction of that. Check bundlephobia.com before adding.",
      "Version churn — TanStack libraries, React Router, and others have had breaking v-major rewrites. Pin versions, read migration guides, don't upgrade blindly.",
      "'Headless' libraries (TanStack Table, Radix) give you logic and no styles — that's a feature, but means you still have to style everything.",
      "UI kits (shadcn/ui) copy components into your repo rather than installing them as a dependency — different mental model from MUI/Chakra; you own the code.",
      "Many libraries require a Provider near the root (QueryClientProvider, RouterProvider, ThemeProvider). Forgetting the provider produces cryptic 'hook called outside X' errors.",
      "Server-state libraries (TanStack Query) and client-state libraries (Zustand, Redux) solve different problems. Don't put server data in Redux; don't put form state in TanStack Query.",
    ]}
    snippet={`// Picking a library — the checklist
//
// 1. What problem does this solve that plain React doesn't?
// 2. Is it actively maintained?      (commits in last 3 months)
// 3. Is it widely used?               (> 100k weekly downloads)
// 4. What's the bundle cost?          (bundlephobia.com)
// 5. Does the API feel right?         (read the README + 1 example)
// 6. Is there a provider / setup tax? (QueryClientProvider, etc.)
// 7. What's the migration story?      (v-major breaking changes?)
//
// If you can't answer 1 clearly, you probably don't need it yet.`}
    snippetLabel="library-picking checklist"
  />
);

const sections = [
  { label: "Notes", content: NOTES },
  { label: "A. Data Fetching & State", content: <DataFetchingState /> },
  { label: "B. Forms & Validation", content: <FormsValidation /> },
  { label: "C. Tables & Routing", content: <TablesRouting /> },
  { label: "D. UI & Styling", content: <UIStyling /> },
  { label: "E. Utilities", content: <Utilities /> },
];

export default function LibrariesDemo() {
  return (
    <div className="demo-section">
      <h2>React Ecosystem — Libraries You'll Use in Real Projects</h2>
      <p style={{ color: "#666", marginBottom: 8 }}>
        These are the most popular, production-ready libraries for building
        modern React applications. In later weeks we'll build a project
        integrating several of these and deploy it to Vercel and Netlify.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
