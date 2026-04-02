// ============================================================
// Keyboard Demo — SectionStepper wrapper
// ============================================================

import SectionStepper from "../SectionStepper";
import EscapeToClose from "./EscapeToClose";
import KeyboardShortcuts from "./KeyboardShortcuts";
import EscapeToCloseCode from "./EscapeToClose.jsx?raw";
import KeyboardShortcutsCode from "./KeyboardShortcuts.jsx?raw";

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you handle keyboard events in real apps?</h3>
    <ul>
      <li>
        <strong>Closing modals with Escape</strong> — the most common keyboard
        shortcut users expect
      </li>
      <li>
        <strong>Keyboard shortcuts</strong> — Ctrl+S to save, Ctrl+K to open a
        search palette, arrow keys to navigate lists
      </li>
      <li>
        <strong>Accessibility</strong> — making custom components (dropdowns,
        tabs, menus) navigable without a mouse
      </li>
      <li>
        <strong>Games and interactive demos</strong> — move a character or
        control an animation with arrow keys
      </li>
      <li>
        <strong>Form submission on Enter</strong> — triggering a search or
        submit when the user presses Enter in an input
      </li>
    </ul>
    <p className="demo-note">
      Rule of thumb: add keyboard listeners in a useEffect with proper cleanup.
      For global shortcuts (Escape, Ctrl+K), listen on window/document. For
      input-specific events (Enter to submit), use the onKeyDown prop directly
      on the element.
    </p>
  </div>
);

const sections = [
  {
    label: "A. Escape to Close",
    content: <EscapeToClose />,
    code: EscapeToCloseCode,
  },
  {
    label: "B. Keyboard Shortcuts",
    content: <KeyboardShortcuts />,
    code: KeyboardShortcutsCode,
  },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function KeyboardDemo() {
  return (
    <div className="demo-section">
      <h2>Keyboard Event Listeners</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
