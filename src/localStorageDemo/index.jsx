// ============================================================
// localStorage Demo — SectionStepper wrapper
// ============================================================

import SectionStepper from "../SectionStepper";
import SaveOnChange from "./SaveOnChange";
import LoadOnMount from "./LoadOnMount";
import ThemePersistence from "./ThemePersistence";
import FullPattern from "./FullPattern";
import SaveOnChangeCode from "./SaveOnChange.jsx?raw";
import LoadOnMountCode from "./LoadOnMount.jsx?raw";
import ThemePersistenceCode from "./ThemePersistence.jsx?raw";
import FullPatternCode from "./FullPattern.jsx?raw";

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
