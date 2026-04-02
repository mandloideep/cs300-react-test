// ============================================================
// State Patterns Demo — SectionStepper wrapper
// ============================================================

import SectionStepper from "../SectionStepper";
import ObjectState from "./ObjectState";
import ArrayAdd from "./ArrayAdd";
import ArrayRemove from "./ArrayRemove";
import ArrayToggle from "./ArrayToggle";
import ObjectStateCode from "./ObjectState.jsx?raw";
import ArrayAddCode from "./ArrayAdd.jsx?raw";
import ArrayRemoveCode from "./ArrayRemove.jsx?raw";
import ArrayToggleCode from "./ArrayToggle.jsx?raw";

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you use object and array state patterns in real apps?</h3>
    <ul>
      <li>
        <strong>Todo lists</strong> — add, remove, and toggle completion on an
        array of items
      </li>
      <li>
        <strong>User profile forms</strong> — update individual fields in an
        object (name, email, bio) without losing the others
      </li>
      <li>
        <strong>Shopping carts</strong> — add products, remove them, update
        quantities (array of objects)
      </li>
      <li>
        <strong>Multi-select filters</strong> — toggle tags or categories on and
        off in an array
      </li>
      <li>
        <strong>Dashboard widgets</strong> — an array of card objects the user
        can reorder or dismiss
      </li>
    </ul>
    <p className="demo-note">
      Rule of thumb: never mutate state directly. Always create a new array or
      object using spread (...), map, or filter, then pass the new copy to the
      setter.
    </p>
  </div>
);

const sections = [
  { label: "A. Object State", content: <ObjectState />, code: ObjectStateCode },
  { label: "B. Array Add", content: <ArrayAdd />, code: ArrayAddCode },
  { label: "C. Array Remove", content: <ArrayRemove />, code: ArrayRemoveCode },
  { label: "D. Array Toggle", content: <ArrayToggle />, code: ArrayToggleCode },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function StatePatternsDemo() {
  return (
    <div className="demo-section">
      <h2>Object &amp; Array State Patterns</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
