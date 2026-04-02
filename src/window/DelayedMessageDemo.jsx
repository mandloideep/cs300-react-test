import { useState, useEffect } from "react";

// ============================================================
// Section B: Delayed Message (Timeout with Cleanup)
// ============================================================
// Shows a message after a delay, with proper cleanup if unmounted early.
// Open the browser console to follow along!
// NOTE: In development, React StrictMode runs effects twice. This is normal!

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

    const countdownId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timerId = setTimeout(() => {
      console.log(`DELAYED MSG: ✅ timer fired! Showing "${message}"`);
      setShow(true);
    }, delay);

    return () => {
      console.log(
        `DELAYED MSG: 🧹 cleaning up timers (component unmounted or props changed)`,
      );
      clearTimeout(timerId);
      clearInterval(countdownId);
    };
  }, [message, delay]);

  return (
    <div>
      {show ? (
        <p style={{ fontSize: 20, color: "#2ecc71", fontWeight: "bold" }}>
          {message}
        </p>
      ) : (
        <p style={{ fontSize: 20, color: "#888" }}>
          Waiting... ({timeLeft}s remaining)
        </p>
      )}
    </div>
  );
}

export default function DelayedMessageDemo() {
  const [delay, setDelay] = useState(3000);
  const [message, setMessage] = useState("Hello from the future!");
  const [mounted, setMounted] = useState(true);

  return (
    <div className="demo-subsection">
      <h3>B. Delayed Message (Timeout with Cleanup)</h3>
      <p className="demo-note">
        The message appears after a delay. Change the delay or unmount early to
        see cleanup in action.
      </p>

      <div
        style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}
      >
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
          <select
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            style={{ padding: "4px 8px" }}
          >
            <option value={1000}>1 second</option>
            <option value={3000}>3 seconds</option>
            <option value={5000}>5 seconds</option>
          </select>
        </div>
        <button
          className={`btn ${mounted ? "btn-danger" : "btn-primary"}`}
          onClick={() => setMounted((prev) => !prev)}
        >
          {mounted ? "Unmount (cancel early)" : "Mount (start timer)"}
        </button>
      </div>

      {mounted && <DelayedMessage message={message} delay={delay} />}
      {!mounted && (
        <p className="demo-note">
          Component unmounted — timer was cleaned up. Check the console!
        </p>
      )}
    </div>
  );
}
