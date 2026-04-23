// ============================================================
// localStorage Demo — SectionStepper wrapper
// ============================================================

import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
import SaveOnChange from "./SaveOnChange";
import LoadOnMount from "./LoadOnMount";
import ThemePersistence from "./ThemePersistence";
import FullPattern from "./FullPattern";
import SaveOnChangeCode from "./SaveOnChange.jsx?raw";
import LoadOnMountCode from "./LoadOnMount.jsx?raw";
import ThemePersistenceCode from "./ThemePersistence.jsx?raw";
import FullPatternCode from "./FullPattern.jsx?raw";

const NOTES = (
  <TabNotes
    title="localStorage — Mental Model"
    mentalModel={
      <>
        <p>
          <code>localStorage</code> is a browser-provided{" "}
          <strong>string key/value store</strong> that survives page reloads and
          tab closes. It lives per origin (domain) and is synchronous.
        </p>
        <p>
          Pair it with React like this: <strong>read once</strong> when state
          initializes (lazy init in useState), <strong>write</strong> inside a
          useEffect that depends on the value. The UI stays in React state;
          localStorage is just a persistence layer next to it.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Use JSON.stringify on write and JSON.parse on read — localStorage only stores strings.",
      },
      {
        kind: "do",
        text: "Initialize state lazily: useState(() => JSON.parse(localStorage.getItem(key)) ?? default).",
      },
      {
        kind: "do",
        text: "Write in a useEffect([value]) so every change is persisted automatically.",
      },
      {
        kind: "dont",
        text: "Don't store passwords, JWTs, or anything sensitive — any script on the page can read localStorage.",
      },
      {
        kind: "dont",
        text: "Don't read localStorage on every render — wrap reads in a lazy initializer or an effect.",
      },
    ]}
    gotchas={[
      "getItem returns null when the key doesn't exist. Guard with ?? or a try/catch around JSON.parse.",
      "localStorage access throws in some environments (private mode, server-side rendering). Wrap in try/catch if your code might run there.",
      "Changes in other tabs fire a 'storage' event — listen for it if multiple tabs of your app must stay in sync.",
      "~5 MB per origin quota. Fine for prefs; not fine for caching large API payloads.",
    ]}
    snippet={`// Read once (lazy init) + write on change
function useStickyState(key, initial) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key);
    return raw === null ? initial : JSON.parse(raw);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`}
    snippetLabel="Persistent state hook"
  />
);

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you use localStorage in real apps?</h3>
    <ul>
      <li>
        <strong>Persisting user preferences</strong> — dark/light theme, font
        size, language selection
      </li>
      <li>
        <strong>Saving form drafts</strong> — if the user refreshes mid-form,
        restore what they already typed
      </li>
      <li>
        <strong>Remembering UI state</strong> — which sidebar panel was open,
        which tab was last active
      </li>
      <li>
        <strong>Caching API responses</strong> — avoid re-fetching data the user
        just loaded (use with caution and expiry)
      </li>
      <li>
        <strong>Shopping cart persistence</strong> — keep cart items across page
        reloads before the user logs in
      </li>
      <li>
        <strong>Authentication tokens</strong> — store a JWT so the user stays
        logged in (sessionStorage is more common for this)
      </li>
    </ul>
    <p className="demo-note">
      Rule of thumb: load from localStorage once on mount (useEffect with []),
      save to localStorage whenever the relevant state changes (useEffect with
      [value]). Never store sensitive data like passwords in localStorage.
    </p>
  </div>
);

const sections = [
  { label: "Notes", content: NOTES },
  {
    label: "A. Save on Change",
    content: <SaveOnChange />,
    code: SaveOnChangeCode,
  },
  {
    label: "B. Load on Mount",
    content: <LoadOnMount />,
    code: LoadOnMountCode,
  },
  {
    label: "C. Theme Persistence",
    content: <ThemePersistence />,
    code: ThemePersistenceCode,
  },
  { label: "D. Full Pattern", content: <FullPattern />, code: FullPatternCode },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function LocalStorageDemo() {
  return (
    <div className="demo-section">
      <h2>localStorage with useEffect</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
