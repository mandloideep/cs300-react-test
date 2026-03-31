import SectionStepper from "../SectionStepper";
import ControlledTextInput from "./ControlledTextInput";
import CheckboxAndSelect from "./CheckboxAndSelect";
import ValidationDemo from "./ValidationDemo";
import FormSubmitDemo from "./FormSubmitDemo";

// ============================================================
// Form Demo — Controlled Inputs and Form Handling in React
// ============================================================
// In React, form inputs are "controlled" — React state is the
// single source of truth for the input's value.
// Each section mounts one at a time so the console stays clean.

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you use controlled forms in real apps?</h3>
    <ul>
      <li><strong>Login/signup forms</strong> — collect username, password, validate as they type</li>
      <li><strong>Search bars</strong> — filter results as the user types (debounce with useEffect)</li>
      <li><strong>Settings pages</strong> — toggle preferences, choose themes, update profiles</li>
      <li><strong>Multi-step wizards</strong> — collect data across steps, submit at the end</li>
      <li><strong>Any user input</strong> — React needs to "own" the value to keep UI and state in sync</li>
    </ul>
    <p className="demo-note">
      Rule of thumb: if React needs to know about or react to an input's value, make it controlled
      (value + onChange). The state is always the "source of truth."
    </p>
  </div>
);

const sections = [
  { label: "A. Text Input", content: <ControlledTextInput /> },
  { label: "B. Checkbox & Select", content: <CheckboxAndSelect /> },
  { label: "C. Validation", content: <ValidationDemo /> },
  { label: "D. Form Submit", content: <FormSubmitDemo /> },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function FormDemo() {
  return (
    <div className="demo-section">
      <h2>Forms — Controlled Inputs in React</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see what happens behind the scenes.
        Use the section buttons below to step through each concept one at a time.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
