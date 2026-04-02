import { useState, useEffect, useRef } from "react";

// ============================================================
// Section E: Document Title Sync
// ============================================================
// A simple but common use case: updating the browser tab title.
// Open the browser console to follow along!

export default function DocumentTitleSync() {
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

    return () => {
      document.title = savedTitle;
    };
  }, [notifications]);

  return (
    <div className="demo-subsection">
      <h3>E. Document Title Sync</h3>
      <p className="demo-note">
        Click to add notifications. Watch your browser tab title change! This is
        a common useEffect pattern for keeping external state in sync.
      </p>

      <p style={{ fontSize: 20, fontWeight: "bold" }}>
        Notifications: {notifications}
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          className="btn btn-primary"
          onClick={() => setNotifications((prev) => prev + 1)}
        >
          Add Notification
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setNotifications((prev) => Math.max(0, prev - 1))}
        >
          Dismiss One
        </button>
        <button className="btn btn-danger" onClick={() => setNotifications(0)}>
          Clear All
        </button>
      </div>
    </div>
  );
}
