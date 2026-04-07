import SectionStepper from "../SectionStepper";
import NpmBasics from "./sections/NpmBasics";
import EvaluatingLibraries from "./sections/EvaluatingLibraries";
import WhyRouting from "./sections/WhyRouting";
import LinkVsNavLink from "./sections/LinkVsNavLink";
import NestedRoutes from "./sections/NestedRoutes";
import DynamicRoutes from "./sections/DynamicRoutes";
import NavigateAndSearch from "./sections/NavigateAndSearch";
import CourseHubLiveDemo from "./sections/CourseHubLiveDemo";

import packageJson from "../../package.json?raw";
import basicSetupCode from "./snippets/basic-setup.jsx?raw";
import appRoutesCode from "./snippets/app-routes.jsx?raw";
import LayoutCode from "./components/Layout.jsx?raw";
import CourseDetailCode from "./components/CourseDetail.jsx?raw";
import CourseListCode from "./components/CourseList.jsx?raw";

// ============================================================
// React Router Demo — NPM Libraries & Client-Side Routing
// ============================================================
// Walks students through evaluating/installing npm packages,
// then progressively introduces React Router concepts with
// a live interactive CourseHub demo at the end.

const sections = [
  {
    label: "A. NPM Basics",
    content: <NpmBasics />,
    code: packageJson,
  },
  {
    label: "B. Evaluating Libraries",
    content: <EvaluatingLibraries />,
  },
  {
    label: "C. Why Routing?",
    content: <WhyRouting />,
    code: basicSetupCode,
  },
  {
    label: "D. Link vs NavLink",
    content: <LinkVsNavLink />,
    code: LayoutCode,
  },
  {
    label: "E. Nested Routes",
    content: <NestedRoutes />,
    code: appRoutesCode,
  },
  {
    label: "F. Dynamic Routes",
    content: <DynamicRoutes />,
    code: CourseDetailCode,
  },
  {
    label: "G. Navigate & Search",
    content: <NavigateAndSearch />,
    code: CourseListCode,
  },
  {
    label: "H. Live Demo",
    content: <CourseHubLiveDemo />,
    code: appRoutesCode,
  },
];

export default function ReactRouterDemo() {
  return (
    <div className="demo-section">
      <h2>React Router — NPM Libraries & Client-Side Routing</h2>
      <p className="demo-note">
        This demo covers how to evaluate and install npm packages, then walks
        through React Router concepts step by step. The final section is a fully
        interactive CourseHub app you can click around in.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
