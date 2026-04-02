// ============================================================
// Bookmarks App — Progressive Build Stepper
// ============================================================

import SectionStepper from "../SectionStepper";
import Step1_BasicList from "./Step1_BasicList";
import Step2_AddForm from "./Step2_AddForm";
import Step3_DeleteAndFilter from "./Step3_DeleteAndFilter";
import Step4_LocalStorage from "./Step4_LocalStorage";
import Step5_MultiComponent from "./Step5_MultiComponent";
import Step1_BasicListCode from "./Step1_BasicList.jsx?raw";
import Step2_AddFormCode from "./Step2_AddForm.jsx?raw";
import Step3_DeleteAndFilterCode from "./Step3_DeleteAndFilter.jsx?raw";
import Step4_LocalStorageCode from "./Step4_LocalStorage.jsx?raw";
import Step5_MultiComponentCode from "./Step5_MultiComponent.jsx?raw";

const sections = [
  {
    label: "1. Basic List",
    content: <Step1_BasicList />,
    code: Step1_BasicListCode,
  },
  { label: "2. Add Form", content: <Step2_AddForm />, code: Step2_AddFormCode },
  {
    label: "3. Delete & Filter",
    content: <Step3_DeleteAndFilter />,
    code: Step3_DeleteAndFilterCode,
  },
  {
    label: "4. localStorage",
    content: <Step4_LocalStorage />,
    code: Step4_LocalStorageCode,
  },
  {
    label: "5. Multi-Component",
    content: <Step5_MultiComponent />,
    code: Step5_MultiComponentCode,
  },
];

export default function BookmarksApp() {
  return (
    <div className="demo-section">
      <h2>Bookmarks Manager — Progressive Build</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
