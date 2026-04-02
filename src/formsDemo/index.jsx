// ============================================================
// Forms Demo — SectionStepper wrapper
// ============================================================

import SectionStepper from "../SectionStepper";
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
