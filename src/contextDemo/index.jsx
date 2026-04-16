import SectionStepper from "../SectionStepper";
import PropDrillingPain from "./PropDrillingPain";
import FirstContext from "./FirstContext";
import StateVsContext from "./StateVsContext";
import StateVsLocalStorage from "./StateVsLocalStorage";
import ContextPlusLocalStorage from "./ContextPlusLocalStorage";
import MultipleContexts from "./MultipleContexts";
import CustomHookWrapper from "./CustomHookWrapper";
import CommonMistakes from "./CommonMistakes";

import PropDrillingPainCode from "./PropDrillingPain.jsx?raw";
import FirstContextCode from "./FirstContext.jsx?raw";
import StateVsContextCode from "./StateVsContext.jsx?raw";
import StateVsLocalStorageCode from "./StateVsLocalStorage.jsx?raw";
import ContextPlusLocalStorageCode from "./ContextPlusLocalStorage.jsx?raw";
import MultipleContextsCode from "./MultipleContexts.jsx?raw";
import CustomHookWrapperCode from "./CustomHookWrapper.jsx?raw";
import CommonMistakesCode from "./CommonMistakes.jsx?raw";

const sections = [
  {
    label: "A. Prop Drilling Pain",
    content: <PropDrillingPain />,
    code: PropDrillingPainCode,
  },
  {
    label: "B. Your First Context",
    content: <FirstContext />,
    code: FirstContextCode,
  },
  {
    label: "C. State vs Context",
    content: <StateVsContext />,
    code: StateVsContextCode,
  },
  {
    label: "D. State vs localStorage",
    content: <StateVsLocalStorage />,
    code: StateVsLocalStorageCode,
  },
  {
    label: "E. Context + localStorage",
    content: <ContextPlusLocalStorage />,
    code: ContextPlusLocalStorageCode,
  },
  {
    label: "F. Multiple Contexts",
    content: <MultipleContexts />,
    code: MultipleContextsCode,
  },
  {
    label: "G. Custom Hook Wrapper",
    content: <CustomHookWrapper />,
    code: CustomHookWrapperCode,
  },
  {
    label: "H. Common Mistakes",
    content: <CommonMistakes />,
    code: CommonMistakesCode,
  },
];

export default function ContextDemo() {
  return (
    <div className="demo-section">
      <h2>Context API — Sharing State Without Prop Drilling</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
