import { useState, useEffect, useRef } from "react";

// ============================================================
// Window & Browser APIs Demo — React + the Outside World
// ============================================================
// React manages the UI, but sometimes you need to interact with
// browser APIs: window size, timers, scroll position, online status, etc.
// useEffect is the bridge between React and the browser.
// Open the browser console to follow along!
// NOTE: In development, React StrictMode runs effects twice. This is normal!

// --- Section A: Window Width (Live Resize) ---
// Listens to the browser's resize event and updates React state.
function WindowWidthLive() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log("WINDOW WIDTH: 📏 subscribing to resize event");

    function handleResize() {
      const newWidth = window.innerWidth;
      console.log("WINDOW WIDTH: 📏 resized to", newWidth, "px");
      setWidth(newWidth);
    }

    // Subscribe to the browser event
    window.addEventListener("resize", handleResize);

    // Cleanup: unsubscribe when component unmounts
    return () => {
      console.log("WINDOW WIDTH: 📏 unsubscribing from resize event");
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty deps = subscribe once on mount, cleanup on unmount

  return (
    <div className="demo-subsection">
      <h3>A. Live Window Width</h3>
      <p className="demo-note">
        Resize your browser window. The value below updates in real-time!
        Check the console to see the event listener subscribe/unsubscribe.
      </p>
      <p style={{ fontSize: 28, fontWeight: "bold", fontFamily: "monospace" }}>
        Window width: {width}px
      </p>
      <p>
        Screen size:{" "}
        <strong>
          {width < 600 ? "📱 Mobile" : width < 1024 ? "📟 Tablet" : "🖥️ Desktop"}
        </strong>
      </p>
      {/* This pattern is common:
          1. useEffect subscribes to a browser event
          2. The event handler updates React state
          3. State change → re-render → UI shows new value
          4. Cleanup removes the listener to prevent memory leaks */}
    </div>
  );
}

// --- Section B: Delayed Message (Timeout with Cleanup) ---
// Shows a message after a delay, with proper cleanup if unmounted early.
function DelayedMessage({ message, delay }) {
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState(Math.ceil(delay / 1000));

  // Reset state when props change, before the effect runs
  const [prevMessage, setPrevMessage] = useState(message);
  const [prevDelay, setPrevDelay] = useState(delay);
  if (message !== prevMessage || delay !== prevDelay) {
    setPrevMessage(message);
    setPrevDelay(delay);
    setShow(false);
    setTimeLeft(Math.ceil(delay / 1000));
  }

  useEffect(() => {
    console.log(`DELAYED MSG: ⏳ starting ${delay}ms timer for "${message}"`);

    // Countdown display
    const countdownId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdownId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // The actual reveal timer
    const timerId = setTimeout(() => {
      console.log(`DELAYED MSG: ✅ timer fired! Showing "${message}"`);
      setShow(true);
    }, delay);

    // Cleanup both timers if component unmounts or props change
    return () => {
      console.log(`DELAYED MSG: 🧹 cleaning up timers (component unmounted or props changed)`);
      clearTimeout(timerId);
      clearInterval(countdownId);
    };
  }, [message, delay]);

  return (
    <div>
      {show ? (
        <p style={{ fontSize: 20, color: "#2ecc71", fontWeight: "bold" }}>{message}</p>
      ) : (
        <p style={{ fontSize: 20, color: "#888" }}>
          Waiting... ({timeLeft}s remaining)
        </p>
      )}
    </div>
  );
}

function DelayedMessageDemo() {
  const [delay, setDelay] = useState(3000);
  const [message, setMessage] = useState("Hello from the future!");
  const [mounted, setMounted] = useState(true);

  return (
    <div className="demo-subsection">
      <h3>B. Delayed Message (Timeout with Cleanup)</h3>
      <p className="demo-note">
        The message appears after a delay. Change the delay or unmount early to see cleanup in action.
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <div>
          <label>Message: </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ padding: "4px 8px" }}
          />
        </div>
        <div>
          <label>Delay: </label>
          <select value={delay} onChange={(e) => setDelay(Number(e.target.value))} style={{ padding: "4px 8px" }}>
            <option value={1000}>1 second</option>
            <option value={3000}>3 seconds</option>
            <option value={5000}>5 seconds</option>
          </select>
        </div>
        <button
          className={`btn ${mounted ? "btn-danger" : "btn-primary"}`}
          onClick={() => setMounted(prev => !prev)}
        >
          {mounted ? "Unmount (cancel early)" : "Mount (start timer)"}
        </button>
      </div>

      {mounted && <DelayedMessage message={message} delay={delay} />}
      {!mounted && <p className="demo-note">Component unmounted — timer was cleaned up. Check the console!</p>}
    </div>
  );
}

// --- Section C: Mouse Position Tracker ---
// Tracks the mouse position across the entire document.
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    if (!tracking) return; // Don't subscribe if tracking is off

    console.log("MOUSE TRACKER: 🖱️ subscribing to mousemove");

    function handleMouseMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      console.log("MOUSE TRACKER: 🖱️ unsubscribing from mousemove");
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tracking]); // Re-run when tracking toggled on/off

  return (
    <div className="demo-subsection">
      <h3>C. Mouse Position Tracker</h3>
      <p className="demo-note">
        Toggle tracking on, then move your mouse. The position updates in real-time.
        Toggle off to unsubscribe — check the console for subscribe/unsubscribe logs.
      </p>

      <button
        className={`btn ${tracking ? "btn-danger" : "btn-primary"}`}
        onClick={() => setTracking(prev => !prev)}
        style={{ marginBottom: 12 }}
      >
        {tracking ? "Stop Tracking" : "Start Tracking"}
      </button>

      <div style={{
        fontFamily: "monospace",
        fontSize: 24,
        fontWeight: "bold",
        padding: 16,
        backgroundColor: tracking ? "#eef6ff" : "#f5f5f5",
        borderRadius: 8,
        border: `2px solid ${tracking ? "#3498db" : "#ddd"}`,
        transition: "all 0.3s",
      }}>
        x: {position.x}, y: {position.y}
      </div>

      {tracking && (
        <p className="demo-note" style={{ marginTop: 8 }}>
          Move your mouse anywhere on the page!
        </p>
      )}
    </div>
  );
}

// --- Section D: Online/Offline Status ---
// Detects if the user's browser goes offline or comes back online.
function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    console.log("ONLINE STATUS: 🌐 subscribing to online/offline events");

    function handleOnline() {
      console.log("ONLINE STATUS: 🟢 back online!");
      setIsOnline(true);
      setHistory(prev => [...prev, `🟢 Online at ${new Date().toLocaleTimeString()}`].slice(-5));
    }

    function handleOffline() {
      console.log("ONLINE STATUS: 🔴 went offline!");
      setIsOnline(false);
      setHistory(prev => [...prev, `🔴 Offline at ${new Date().toLocaleTimeString()}`].slice(-5));
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      console.log("ONLINE STATUS: 🌐 unsubscribing from online/offline events");
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="demo-subsection">
      <h3>D. Online/Offline Status</h3>
      <p className="demo-note">
        This detects your real network status. To test: open DevTools → Network tab → toggle "Offline" checkbox.
      </p>

      <div style={{
        padding: 16,
        borderRadius: 8,
        backgroundColor: isOnline ? "#d4edda" : "#f8d7da",
        border: `2px solid ${isOnline ? "#28a745" : "#dc3545"}`,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
      }}>
        {isOnline ? "🟢 Online" : "🔴 Offline"}
      </div>

      {history.length > 0 && (
        <div style={{ fontFamily: "monospace", fontSize: 13 }}>
          <strong>Status history:</strong>
          {history.map((entry, i) => (
            <div key={i}>{entry}</div>
          ))}
        </div>
      )}

      {/* This is the same subscribe/cleanup pattern:
          1. useEffect subscribes to browser events on mount
          2. Event fires → update state → React re-renders
          3. Cleanup unsubscribes when component unmounts
          Every browser API interaction follows this pattern! */}
    </div>
  );
}

// --- Section E: Document Title Sync ---
// A simple but common use case: updating the browser tab title.
function DocumentTitleSync() {
  const [notifications, setNotifications] = useState(0);
  const originalTitle = useRef(document.title);

  useEffect(() => {
    const savedTitle = originalTitle.current;

    if (notifications > 0) {
      document.title = `(${notifications}) New notifications`;
      console.log("DOC TITLE: 📋 updated to", document.title);
    } else {
      document.title = savedTitle;
      console.log("DOC TITLE: 📋 reset to original");
    }

    // Restore original title when component unmounts
    return () => {
      document.title = savedTitle;
    };
  }, [notifications]);

  return (
    <div className="demo-subsection">
      <h3>E. Document Title Sync</h3>
      <p className="demo-note">
        Click to add notifications. Watch your browser tab title change!
        This is a common useEffect pattern for keeping external state in sync.
      </p>

      <p style={{ fontSize: 20, fontWeight: "bold" }}>
        Notifications: {notifications}
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-primary" onClick={() => setNotifications(prev => prev + 1)}>
          Add Notification
        </button>
        <button className="btn btn-secondary" onClick={() => setNotifications(prev => Math.max(0, prev - 1))}>
          Dismiss One
        </button>
        <button className="btn btn-danger" onClick={() => setNotifications(0)}>
          Clear All
        </button>
      </div>
    </div>
  );
}

// --- Main Demo Component ---
export default function WindowDemo() {
  return (
    <div className="demo-section">
      <h2>Window & Browser APIs — React Meets the Real World</h2>
      <p className="demo-note">
        Open your browser console (F12 → Console) to see subscribe/unsubscribe logs.
        These demos show the universal pattern: useEffect subscribes, cleanup unsubscribes.
      </p>

      <WindowWidthLive />
      <DelayedMessageDemo />
      <MouseTracker />
      <OnlineStatus />
      <DocumentTitleSync />

      {/* Practical Use Cases */}
      <div className="demo-practical">
        <h3>When do you connect React to browser APIs?</h3>
        <ul>
          <li><strong>Responsive layouts</strong> — listen to resize, adjust UI based on screen size</li>
          <li><strong>Timers & countdowns</strong> — setTimeout/setInterval with proper cleanup</li>
          <li><strong>User input tracking</strong> — mouse position, scroll depth, keyboard shortcuts</li>
          <li><strong>Network status</strong> — show offline banners, retry failed requests</li>
          <li><strong>Document title</strong> — unread count, page name, notification badges</li>
          <li><strong>LocalStorage sync</strong> — persist user preferences across page reloads</li>
          <li><strong>Geolocation, clipboard, notifications</strong> — any browser API via useEffect</li>
        </ul>
        <p className="demo-note">
          The pattern is always the same: subscribe in useEffect, update state in the handler,
          unsubscribe in the cleanup function. Once you learn this pattern, you can connect React to anything.
        </p>
      </div>
    </div>
  );
}
