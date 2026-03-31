import { useState, useEffect } from "react";

// ============================================================
// Section D: Online/Offline Status
// ============================================================
// Detects if the user's browser goes offline or comes back online.
// To test: open DevTools → Network tab → toggle "Offline" checkbox.
// Open the browser console to follow along!

export default function OnlineStatus() {
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
    </div>
  );
}
