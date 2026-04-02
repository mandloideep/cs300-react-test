import SectionStepper from "../SectionStepper";
import WindowWidthLive from "./WindowWidthLive";
import DelayedMessageDemo from "./DelayedMessageDemo";
import MouseTracker from "./MouseTracker";
import OnlineStatus from "./OnlineStatus";
import DocumentTitleSync from "./DocumentTitleSync";
import WindowWidthLiveCode from "./WindowWidthLive.jsx?raw";
import DelayedMessageDemoCode from "./DelayedMessageDemo.jsx?raw";
import MouseTrackerCode from "./MouseTracker.jsx?raw";
import OnlineStatusCode from "./OnlineStatus.jsx?raw";
import DocumentTitleSyncCode from "./DocumentTitleSync.jsx?raw";

// ============================================================
// Window & Browser APIs Demo — React + the Outside World
// ============================================================
// React manages the UI, but sometimes you need to interact with
// browser APIs: window size, timers, scroll position, online status, etc.
// useEffect is the bridge between React and the browser.
// Each section mounts one at a time so the console stays clean.

const PRACTICAL = (
  <div className="demo-practical">
    <h3>When do you connect React to browser APIs?</h3>
    <ul>
      <li>
        <strong>Responsive layouts</strong> — listen to resize, adjust UI based
        on screen size
      </li>
      <li>
        <strong>Timers & countdowns</strong> — setTimeout/setInterval with
        proper cleanup
      </li>
      <li>
        <strong>User input tracking</strong> — mouse position, scroll depth,
        keyboard shortcuts
      </li>
      <li>
        <strong>Network status</strong> — show offline banners, retry failed
        requests
      </li>
      <li>
        <strong>Document title</strong> — unread count, page name, notification
        badges
      </li>
      <li>
        <strong>LocalStorage sync</strong> — persist user preferences across
        page reloads
      </li>
      <li>
        <strong>Geolocation, clipboard, notifications</strong> — any browser API
        via useEffect
      </li>
    </ul>
    <p className="demo-note">
      The pattern is always the same: subscribe in useEffect, update state in
      the handler, unsubscribe in the cleanup function. Once you learn this
      pattern, you can connect React to anything.
    </p>
  </div>
);

const sections = [
  {
    label: "A. Window Width",
    content: <WindowWidthLive />,
    code: WindowWidthLiveCode,
  },
  {
    label: "B. Delayed Message",
    content: <DelayedMessageDemo />,
    code: DelayedMessageDemoCode,
  },
  {
    label: "C. Mouse Tracker",
    content: <MouseTracker />,
    code: MouseTrackerCode,
  },
  {
    label: "D. Online Status",
    content: <OnlineStatus />,
    code: OnlineStatusCode,
  },
  {
    label: "E. Doc Title",
    content: <DocumentTitleSync />,
    code: DocumentTitleSyncCode,
  },
  { label: "Practical Use Cases", content: PRACTICAL },
];

export default function WindowDemo() {
  return (
    <div className="demo-section">
      <h2>Window & Browser APIs — React Meets the Real World</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see subscribe/unsubscribe
        logs. Use the section buttons below to step through each concept one at
        a time.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
