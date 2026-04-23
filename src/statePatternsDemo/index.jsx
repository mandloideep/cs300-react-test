// ============================================================
// State Patterns Demo — SectionStepper wrapper
// ============================================================

import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
import ObjectState from "./ObjectState";
import ArrayAdd from "./ArrayAdd";
import ArrayRemove from "./ArrayRemove";
import ArrayToggle from "./ArrayToggle";
import ObjectStateCode from "./ObjectState.jsx?raw";
import ArrayAddCode from "./ArrayAdd.jsx?raw";
import ArrayRemoveCode from "./ArrayRemove.jsx?raw";
import ArrayToggleCode from "./ArrayToggle.jsx?raw";

const NOTES = (
  <TabNotes
    title="Object & Array State — Mental Model"
    mentalModel={
      <>
        <p>
          React compares state by <strong>reference</strong>. Mutating an object
          or array in place keeps the same reference, so React decides nothing
          changed and skips the re-render.
        </p>
        <p>
          The pattern: <strong>build a new copy with the change applied</strong>
          , then pass it to the setter. Spread, map, filter — never push,
          splice, or direct assignment.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Object update: setObj({ ...obj, field: newValue }).",
      },
      {
        kind: "do",
        text: "Array add: setArr([...arr, item]).",
      },
      {
        kind: "do",
        text: "Array remove: setArr(arr.filter(x => x.id !== id)).",
      },
      {
        kind: "do",
        text: "Array toggle/update: setArr(arr.map(x => x.id === id ? { ...x, done: !x.done } : x)).",
      },
      {
        kind: "dont",
        text: "Never: arr.push(...), arr[i] = ..., obj.field = ..., arr.sort() on state.",
      },
    ]}
    gotchas={[
      "Nested objects need deep copies — spread only shallows one level. setObj({ ...obj, inner: { ...obj.inner, x: 1 } }).",
      "sort() and reverse() mutate in place. Use [...arr].sort(...) or arr.toSorted() to copy first.",
      "Every item in a rendered list needs a stable `key` prop. Don't use the index unless the list never reorders.",
    ]}
    snippet={`// Object — update one field, preserve the rest
setUser({ ...user, email: "new@x.com" });

// Array — add, remove, update by id
setTodos([...todos, { id, text, done: false }]);
setTodos(todos.filter(t => t.id !== id));
setTodos(todos.map(t =>
  t.id === id ? { ...t, done: !t.done } : t
));`}
    snippetLabel="Immutable updates"
  />
);

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
  { label: "Notes", content: NOTES },
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
