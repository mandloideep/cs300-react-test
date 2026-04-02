// ============================================================
// Section A: Escape to Close
// ============================================================

import { useState, useEffect } from "react";

export default function EscapeToClose() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        console.log("⌨️ KEYBOARD: Escape pressed — closing overlay");
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    console.log("⌨️ KEYBOARD: added Escape listener");

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      console.log("⌨️ KEYBOARD: removed Escape listener");
    };
  }, [isOpen]);

  return (
    <div className="demo-subsection">
      <h3>A. Escape to Close</h3>

      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Open Overlay
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Overlay Panel</h3>
            <p>
              Press <strong>Escape</strong> or click outside to close.
            </p>
            <button className="btn btn-danger" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="demo-note">
        The useEffect only adds the listener when <code>isOpen</code> is true.
        The cleanup function removes it when the overlay closes or the component
        unmounts. This is exactly the pattern for Assignment 4's Modal option.
      </div>
    </div>
  );
}
