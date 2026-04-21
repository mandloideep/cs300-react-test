import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
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

const NOTES = (
  <TabNotes
    title="React Router — Mental Model"
    mentalModel={
      <>
        <p>
          The URL is <strong>state</strong>. React Router reads the URL,
          matches it against your <code>&lt;Routes&gt;</code>, and renders
          the matching <code>&lt;Route&gt;</code>'s element. Change the URL
          (via <code>&lt;Link&gt;</code> or <code>useNavigate</code>) and
          React re-renders the matching route — no page reload.
        </p>
        <p>
          Routes nest like components. A parent layout renders{" "}
          <code>&lt;Outlet /&gt;</code> where its child route should
          appear. Dynamic parts of the URL (<code>:id</code>) arrive as{" "}
          <code>useParams</code>; query strings come from{" "}
          <code>useSearchParams</code>.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Wrap the app in <BrowserRouter> once, then declare routes with <Routes> and <Route>.",
      },
      {
        kind: "do",
        text: "Navigate with <Link to='/x'> or navigate('/x') — never window.location.href.",
      },
      {
        kind: "do",
        text: "Read dynamic segments with useParams(), query strings with useSearchParams().",
      },
      {
        kind: "do",
        text: "Nest layouts: parent renders <Outlet />, child routes render inside it.",
      },
      {
        kind: "dont",
        text: "Don't use <a href='/x'> for internal navigation — it triggers a full reload.",
      },
    ]}
    gotchas={[
      "<NavLink> is <Link> that knows if it's the active route — use it for nav bars to auto-highlight.",
      "Order matters in <Routes>. More specific paths should come first, or use `index` for the default child route.",
      "Hosting on GitHub Pages or a subpath? Set `basename` on <BrowserRouter> so routes resolve correctly.",
      "useNavigate returns a function; don't call it during render — call it in handlers or effects.",
    ]}
    snippet={`<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="courses" element={<CourseList />} />
      <Route path="courses/:id" element={<CourseDetail />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</BrowserRouter>

// In CourseDetail:
const { id } = useParams();
const navigate = useNavigate();`}
    snippetLabel="Routes + params"
  />
);

const sections = [
  { label: "Notes", content: NOTES },
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
