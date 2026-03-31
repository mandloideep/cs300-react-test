import { useState } from "react";

// ============================================================
// SectionStepper — Show one section at a time
// ============================================================
// Each demo page uses this to step through sections A, B, C, D.
// Only the active section is MOUNTED — previous sections are unmounted.
// This keeps the console clean and lets students focus on one concept.
//
// Usage:
//   <SectionStepper sections={[
//     { label: "A. The Broken Counter", content: <BrokenCounter /> },
//     { label: "B. The Working Counter", content: <WorkingCounter /> },
//   ]} />

export default function SectionStepper({ sections }) {
  const [step, setStep] = useState(0);

  const current = sections[step];

  return (
    <div>
      {/* Step indicator and navigation */}
      <div className="stepper-nav">
        <button
          className="btn btn-secondary"
          onClick={() => setStep(prev => prev - 1)}
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
                console.log(`SECTION: switching to "${section.label}" (previous section will unmount)`);
                setStep(i);
              }}
            >
              {section.label}
            </button>
          ))}
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setStep(prev => prev + 1)}
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
      <div className="stepper-content">
        {current.content}
      </div>
    </div>
  );
}
