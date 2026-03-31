import { useState, useEffect } from "react";

// ============================================================
// Section A: Live Window Width
// ============================================================
// Listens to the browser's resize event and updates React state.
// This shows the subscribe/cleanup pattern for browser events.
// Open the browser console to follow along!

export default function WindowWidthLive() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log("WINDOW WIDTH: 📏 subscribing to resize event");

    function handleResize() {
      const newWidth = window.innerWidth;
      console.log("WINDOW WIDTH: 📏 resized to", newWidth, "px");
      setWidth(newWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      console.log("WINDOW WIDTH: 📏 unsubscribing from resize event");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    </div>
  );
}
