import SectionStepper from "../SectionStepper";
import RerenderProblem from "./RerenderProblem";
import WhyFunctionsChange from "./WhyFunctionsChange";
import UseCallbackSyntax from "./UseCallbackSyntax";
import ReactMemo from "./ReactMemo";
import UseMemoDemo from "./UseMemoDemo";
import WhenNotToUse from "./WhenNotToUse";

import RerenderProblemCode from "./RerenderProblem.jsx?raw";
import WhyFunctionsChangeCode from "./WhyFunctionsChange.jsx?raw";
import UseCallbackSyntaxCode from "./UseCallbackSyntax.jsx?raw";
import ReactMemoCode from "./ReactMemo.jsx?raw";
import UseMemoDemoCode from "./UseMemoDemo.jsx?raw";
import WhenNotToUseCode from "./WhenNotToUse.jsx?raw";

const sections = [
  {
    label: "A. Re-render Problem",
    content: <RerenderProblem />,
    code: RerenderProblemCode,
  },
  {
    label: "B. Why Functions Change",
    content: <WhyFunctionsChange />,
    code: WhyFunctionsChangeCode,
  },
  {
    label: "C. useCallback Syntax",
    content: <UseCallbackSyntax />,
    code: UseCallbackSyntaxCode,
  },
  {
    label: "D. React.memo",
    content: <ReactMemo />,
    code: ReactMemoCode,
  },
  {
    label: "E. useMemo",
    content: <UseMemoDemo />,
    code: UseMemoDemoCode,
  },
  {
    label: "F. When NOT to Use",
    content: <WhenNotToUse />,
    code: WhenNotToUseCode,
  },
];

export default function UseCallbackDemo() {
  return (
    <div className="demo-section">
      <h2>useCallback, React.memo & useMemo — Performance Optimization</h2>
      <SectionStepper sections={sections} />
    </div>
  );
}
