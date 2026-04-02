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
import CompositionDemo from "./compositionDemo";
import FormsDemo from "./formsDemo";
import LocalStorageDemo from "./localStorageDemo";
import FetchDemo from "./fetchDemo";
import StatePatternsDemo from "./statePatternsDemo";
import KeyboardDemo from "./keyboardDemo";
import MistakesDemo from "./mistakesDemo";
import BookmarksApp from "./bookmarksApp";
import DeployGuide from "./deployGuide";

// Navigation tabs in teaching order (left to right)
const TABS = [
  { id: "reactVsJs", label: "React vs JS" },
  { id: "useState", label: "useState" },
  { id: "useEffect", label: "useEffect" },
  { id: "useRef", label: "useRef" },
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
  { id: "deploy", label: "Deploy Guide" },
];

function App() {
  // Start on React vs JS — the first concept to teach
  const [activeDemo, setActiveDemo] = useState("reactVsJs");

  return (
    <div>
      {/* Navigation bar */}
      <h1>CS300 React Demos</h1>
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
