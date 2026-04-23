import { useState } from "react";
import Button from "./button";
import DangerButton from "./dangerButton";
import Layout from "./layout";
import LifecycleDemo from "./lifecycle";
import WindowDemo from "./window";
import ReactVsJs from "./reactVsJs";
import UseStateDemo from "./useStateDemo";
import UseEffectDemo from "./useEffectDemo";
import UseRefDemo from "./useRefDemo";
import UseCallbackDemo from "./useCallbackDemo";
import CompositionDemo from "./compositionDemo";
import FormsDemo from "./formsDemo";
import LocalStorageDemo from "./localStorageDemo";
import FetchDemo from "./fetchDemo";
import StatePatternsDemo from "./statePatternsDemo";
import KeyboardDemo from "./keyboardDemo";
import MistakesDemo from "./mistakesDemo";
import BookmarksApp from "./bookmarksApp";
import DeployGuide from "./deployGuide";
import DeployDemo from "./deployDemo";
import ReactRouterDemo from "./reactRouterDemo";
import ContextDemo from "./contextDemo";
import UseMemoDemo from "./useMemoDemo";
import LibrariesDemo from "./librariesDemo";

// Navigation tabs in teaching order (left to right)
const TABS = [
  { id: "reactVsJs", label: "React vs JS" },
  { id: "useState", label: "useState" },
  { id: "useEffect", label: "useEffect" },
  { id: "useRef", label: "useRef" },
  { id: "useCallback", label: "useCallback" },
  { id: "useMemo", label: "useMemo" },
  { id: "composition", label: "Composition" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "window", label: "Window" },
  { id: "home", label: "Home (Original)" },
  { id: "forms", label: "Forms" },
  { id: "localStorage", label: "localStorage" },
  { id: "fetch", label: "Fetch" },
  { id: "statePatterns", label: "State Patterns" },
  { id: "keyboard", label: "Keyboard" },
  { id: "mistakes", label: "Mistakes" },
  { id: "bookmarks", label: "Bookmarks App" },
  { id: "deploy", label: "Deploy Guide (GH Pages)" },
  { id: "deployVercel", label: "Deploy Guide (Vercel)" },
  { id: "context", label: "Context API" },
  { id: "reactRouter", label: "React Router" },
  { id: "libraries", label: "Libraries" },
];

function App() {
  // Start on React vs JS — the first concept to teach
  const [activeDemo, setActiveDemo] = useState("reactVsJs");

  return (
    <div>
      {/* Navigation bar */}
      <h1>
        CS300 React Demos
        <a
          href="https://github.com/mandloideep/cs300-react-test"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "12px", verticalAlign: "middle" }}
          title="GitHub repo link"
        >
          <svg
            height="24"
            width="24"
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{ verticalAlign: "middle" }}
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </h1>
      <nav className="demo-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`btn ${activeDemo === tab.id ? "btn-active" : "btn-secondary"}`}
            onClick={() => {
              console.log(
                "NAV: switching to",
                tab.id,
                "(previous component will unmount)",
              );
              setActiveDemo(tab.id);
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Conditional rendering — switching tabs unmounts/mounts components.
          Watch the console for cleanup effects! */}
      {activeDemo === "reactVsJs" && <ReactVsJs />}
      {activeDemo === "useState" && <UseStateDemo />}
      {activeDemo === "useEffect" && <UseEffectDemo />}
      {activeDemo === "useRef" && <UseRefDemo />}
      {activeDemo === "useCallback" && <UseCallbackDemo />}
      {activeDemo === "useMemo" && <UseMemoDemo />}
      {activeDemo === "composition" && <CompositionDemo />}
      {activeDemo === "lifecycle" && <LifecycleDemo />}
      {activeDemo === "window" && <WindowDemo />}
      {activeDemo === "forms" && <FormsDemo />}
      {activeDemo === "localStorage" && <LocalStorageDemo />}
      {activeDemo === "fetch" && <FetchDemo />}
      {activeDemo === "statePatterns" && <StatePatternsDemo />}
      {activeDemo === "keyboard" && <KeyboardDemo />}
      {activeDemo === "mistakes" && <MistakesDemo />}
      {activeDemo === "bookmarks" && <BookmarksApp />}
      {activeDemo === "deploy" && <DeployGuide />}
      {activeDemo === "deployVercel" && <DeployDemo />}
      {activeDemo === "reactRouter" && <ReactRouterDemo />}
      {activeDemo === "libraries" && <LibrariesDemo />}
      {activeDemo === "context" && <ContextDemo />}
      {activeDemo === "home" && (
        <Layout header={<h1>Header</h1>} footer={<h1>Footer</h1>}>
          <p>This is the original home page body.</p>
          <Button
            variant="primary"
            onClick={() => alert("Primary button clicked!")}
          >
            Primary Button
          </Button>
          <Button
            variant="secondary"
            onClick={() => alert("Secondary button clicked!")}
          >
            Secondary Button
          </Button>
          <DangerButton onClick={() => alert("Danger button clicked!")}>
            Danger Button
          </DangerButton>
        </Layout>
      )}
    </div>
  );
}

export default App;
