import SectionStepper from "../SectionStepper";
import TabNotes from "../TabNotes";
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

const NOTES = (
  <TabNotes
    title="Context API — Mental Model"
    mentalModel={
      <>
        <p>
          Context lets a value{" "}
          <strong>teleport from a provider to any descendant</strong> without
          being passed through every prop in between. Think: theme, current
          user, language — things many components deep in the tree need to read
          but nobody in between cares about.
        </p>
        <p>
          Shape: <code>createContext(defaultValue)</code> gives you a{" "}
          <code>Provider</code> that wraps a subtree and a value consumers read
          via <code>useContext</code>. The provider owns the state; every
          consumer reads the same value.
        </p>
        <p>
          Cost: <strong>every consumer re-renders</strong> whenever the
          provider's value changes — including any child whose own props didn't
          change. Keep contexts narrow; split them when unrelated values change
          at different rates.
        </p>
      </>
    }
    rules={[
      {
        kind: "do",
        text: "Use context for wide, stable, read-by-many values: auth user, theme, locale, feature flags.",
      },
      {
        kind: "do",
        text: "Put useState inside the provider component so it owns and distributes the value.",
      },
      {
        kind: "do",
        text: "Wrap useContext in a custom hook (useAuth, useTheme) so consumers have one clean API.",
      },
      {
        kind: "dont",
        text: "Don't reach for Context to solve 'siblings need to share' — lift state up first.",
      },
      {
        kind: "dont",
        text: "Don't stuff unrelated values into one context — every change re-renders every consumer.",
      },
    ]}
    gotchas={[
      "The provider's `value` prop gets a new object literal on every render by default — that triggers re-renders in all consumers. Memoize it or split stable/changing pieces.",
      "useContext outside a provider returns the default value from createContext. That's a feature for testing, but a footgun in production — a custom hook can throw instead.",
      "Context does NOT replace a state manager. It's just value propagation; the state lives in whatever useState/useReducer the provider holds.",
    ]}
    snippet={`const ThemeContext = createContext("light");

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}`}
    snippetLabel="Provider + custom hook"
  />
);

const sections = [
  { label: "Notes", content: NOTES },
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
