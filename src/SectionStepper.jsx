import { useState, useRef, useCallback } from "react";
import CodeViewer from "./CodeViewer";

// ============================================================
// SectionStepper — Show one section at a time
// ============================================================
// Each demo page uses this to step through sections A, B, C, D.
// Only the active section is MOUNTED — previous sections are unmounted.
// This keeps the console clean and lets students focus on one concept.
//
// Usage:
//   <SectionStepper sections={[
//     { label: "A. The Broken Counter", content: <BrokenCounter />, code: BrokenCounterCode },
//     { label: "B. The Working Counter", content: <WorkingCounter />, code: WorkingCounterCode },
//     { label: "Practical Use Cases", content: PRACTICAL },  // no code — full width
//   ]} />

// view: "both" | "demo" | "code"
// layout: "side" | "bottom"

export default function SectionStepper({ sections }) {
  const [step, setStep] = useState(0);
  const [view, setView] = useState("both"); // both | demo | code
  const [layout, setLayout] = useState("side"); // side | bottom
  const [splitRatio, setSplitRatio] = useState(50); // percentage for demo panel
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const current = sections[step];
  const hasCode = !!current.code;

  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      dragging.current = true;

      const onMouseMove = (e) => {
        if (!dragging.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let ratio;
        if (layout === "side") {
          ratio = ((e.clientX - rect.left) / rect.width) * 100;
        } else {
          ratio = ((e.clientY - rect.top) / rect.height) * 100;
        }
        setSplitRatio(Math.min(Math.max(ratio, 25), 75));
      };

      const onMouseUp = () => {
        dragging.current = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [layout],
  );

  const cycleView = () => {
    if (view === "both") setView("code");
    else if (view === "code") setView("demo");
    else setView("both");
  };

  const viewLabel =
    view === "both"
      ? "Code Only"
      : view === "code"
        ? "Demo Only"
        : "Split View";

  // Build grid style for split (3 children: demo, handle, code)
  const splitStyle = {};
  if (hasCode && view === "both") {
    if (layout === "side") {
      splitStyle.gridTemplateColumns = `${splitRatio}fr 22px ${100 - splitRatio}fr`;
      splitStyle.gridTemplateRows = "1fr";
    } else {
      splitStyle.gridTemplateColumns = "1fr";
      splitStyle.gridTemplateRows = `${splitRatio}fr 22px ${100 - splitRatio}fr`;
    }
  }

  const contentClass =
    hasCode && view === "both"
      ? `stepper-content stepper-split ${layout === "bottom" ? "stepper-split-bottom" : ""}`
      : "stepper-content";

  return (
    <div>
      {/* Step indicator and navigation */}
      <div className="stepper-nav">
        <button
          className="btn btn-secondary"
          onClick={() => setStep((prev) => prev - 1)}
          disabled={step === 0}
        >
          ← Previous
        </button>

        <div className="stepper-tabs">
          {sections.map((section, i) => (
            <button
              key={i}
              className={`stepper-tab ${i === step ? "stepper-tab-active" : ""} ${i < step ? "stepper-tab-done" : ""}`}
              onClick={() => {
                console.log(
                  `SECTION: switching to "${section.label}" (previous section will unmount)`,
                );
                setStep(i);
              }}
            >
              {section.label}
            </button>
          ))}
        </div>

        {hasCode && (
          <div className="code-toolbar">
            <button className="btn code-toggle" onClick={cycleView}>
              {viewLabel}
            </button>
            {view === "both" && (
              <button
                className="btn code-toggle"
                onClick={() =>
                  setLayout((l) => (l === "side" ? "bottom" : "side"))
                }
                title={layout === "side" ? "Code below" : "Code on side"}
              >
                {layout === "side" ? "↓" : "→"}
              </button>
            )}
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={() => setStep((prev) => prev + 1)}
          disabled={step === sections.length - 1}
        >
          Next →
        </button>
      </div>

      {/* Progress bar */}
      <div className="stepper-progress">
        <div
          className="stepper-progress-bar"
          style={{ width: `${((step + 1) / sections.length) * 100}%` }}
        />
      </div>

      {/* Only the active section is mounted.
          When you switch, the old section unmounts (cleanup runs)
          and the new section mounts (effects run fresh).
          Watch the console! */}
      <div className={contentClass} style={splitStyle} ref={containerRef}>
        {(view === "both" || view === "demo") && (
          <div className="stepper-demo">{current.content}</div>
        )}

        {hasCode && view === "both" && (
          <div
            className={`split-handle ${layout === "bottom" ? "split-handle-horizontal" : ""}`}
            onMouseDown={onMouseDown}
          />
        )}

        {hasCode && (view === "both" || view === "code") && (
          <div
            className={`stepper-code ${view === "code" ? "stepper-code-full" : ""}`}
          >
            <CodeViewer code={current.code} />
          </div>
        )}
      </div>
    </div>
  );
}
