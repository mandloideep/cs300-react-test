import SectionStepper from "../SectionStepper";
import PropDrillingPain from "./PropDrillingPain";
import FirstContext from "./FirstContext";
import StateVsContext from "./StateVsContext";
import StateVsLocalStorage from "./StateVsLocalStorage";
import ContextPlusLocalStorage from "./ContextPlusLocalStorage";
import MultipleContexts from "./MultipleContexts";
import CustomHookWrapper from "./CustomHookWrapper";
import CommonMistakes from "./CommonMistakes";

const sections = [
  { label: "A. Prop Drilling Pain", content: <PropDrillingPain /> },
  { label: "B. Your First Context", content: <FirstContext /> },
  { label: "C. State vs Context", content: <StateVsContext /> },
  { label: "D. State vs localStorage", content: <StateVsLocalStorage /> },
  { label: "E. Context + localStorage", content: <ContextPlusLocalStorage /> },
  { label: "F. Multiple Contexts", content: <MultipleContexts /> },
  { label: "G. Custom Hook Wrapper", content: <CustomHookWrapper /> },
  { label: "H. Common Mistakes", content: <CommonMistakes /> },
];

export default function ContextDemo() {
  return (
    <div className="demo-section">
      <h2>Context API — Sharing State Without Prop Drilling</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
