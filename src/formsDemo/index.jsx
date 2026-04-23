// ============================================================
// Forms Demo — SectionStepper wrapper
// ============================================================

import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
import ControlledText from "./ControlledText";
import CheckboxRadioSelect from "./CheckboxRadioSelect";
import MultiFieldForm from "./MultiFieldForm";
import Validation from "./Validation";
import FormSubmission from "./FormSubmission";
import ControlledTextCode from "./ControlledText.jsx?raw";
import CheckboxRadioSelectCode from "./CheckboxRadioSelect.jsx?raw";
import MultiFieldFormCode from "./MultiFieldForm.jsx?raw";
import ValidationCode from "./Validation.jsx?raw";
import FormSubmissionCode from "./FormSubmission.jsx?raw";

const NOTES = (
  <TabNotes
    title="Controlled Forms — Mental Model"
    mentalModel={
      <>
        <p>
          In a controlled form,{" "}
          <strong>React state is the source of truth</strong>. The input's{" "}
          <code>value</code> comes from state, and every keystroke calls{" "}
          <code>onChange</code> to update that state. The DOM input never holds
          data on its own.
        </p>
        <p>
          Submission is just another event. On <code>onSubmit</code> you call{" "}
          <code>preventDefault()</code> (so the page doesn't reload), read the
          state, validate, then do whatever comes next (fetch, route change,
          etc.).
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Pair every input with value={state} AND onChange={handler}.",
      },
      {
        kind: "do",
        text: "Call e.preventDefault() inside onSubmit to stop the browser navigating.",
      },
      {
        kind: "do",
        text: "Keep related fields in one state object, or split them — pick whichever makes updates cleaner.",
      },
      {
        kind: "dont",
        text: "Don't pass only value (without onChange) — React makes the field read-only.",
      },
      {
        kind: "dont",
        text: "Don't reach into the DOM with document.getElementById for values; read from state.",
      },
    ]}
    gotchas={[
      "Checkboxes use `checked` instead of `value`, and you read e.target.checked.",
      "<select> is controlled by setting `value` on the <select> itself, not `selected` on <option>.",
      "Number inputs still give you a string from e.target.value — convert with Number(...) if you need a number.",
      "Always pass a non-null initial value (like '' for text) — React warns when switching between controlled and uncontrolled.",
    ]}
    snippet={`function NameForm() {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted:", name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}`}
    snippetLabel="Controlled input"
  />
);

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you use controlled forms in real apps?</h3>
    <ul>
      <li>
        <strong>Login and signup pages</strong> — collect username, email,
        password; validate as the user types
      </li>
      <li>
        <strong>Search bars</strong> — filter a list in real time based on what
        the user types
      </li>
      <li>
        <strong>Settings and profile pages</strong> — let users update
        preferences, then submit changes
      </li>
      <li>
        <strong>Multi-step wizards</strong> — collect data across several
        screens and submit at the end
      </li>
      <li>
        <strong>Any user input</strong> — React needs to "own" the value so the
        UI always matches the state
      </li>
    </ul>
    <p className="demo-note">
      Rule of thumb: if React needs to know about or react to an input's value,
      make it controlled (value + onChange). State is always the single source
      of truth.
    </p>
  </div>
);

const sections = [
  { label: "Notes", content: NOTES },
  {
    label: "A. Controlled Text",
    content: <ControlledText />,
    code: ControlledTextCode,
  },
  {
    label: "B. Checkbox/Radio/Select",
    content: <CheckboxRadioSelect />,
    code: CheckboxRadioSelectCode,
  },
  {
    label: "C. Multi-Field Form",
    content: <MultiFieldForm />,
    code: MultiFieldFormCode,
  },
  { label: "D. Validation", content: <Validation />, code: ValidationCode },
  {
    label: "E. Form Submission",
    content: <FormSubmission />,
    code: FormSubmissionCode,
  },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function FormsDemo() {
  return (
    <div className="demo-section">
      <h2>Controlled Forms</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
