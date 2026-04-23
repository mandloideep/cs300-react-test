import CodeViewer from "./CodeViewer";

// ============================================================
// TabNotes — Succinct mental-model notes for each demo tab
// ============================================================
// One renderer, consistent layout across every topic:
//   Mental Model  -> the picture the student should hold
//   Rules         -> do / don't bullets
//   Gotchas       -> things that silently bite
//   Canonical     -> 3-8 line snippet showing the API shape
//
// Content is passed in as props so every tab's notes read the same.

export default function TabNotes({
  title,
  mentalModel,
  rules,
  gotchas,
  snippet,
  snippetLabel,
}) {
  return (
    <div className="tab-notes">
      <h3>{title}</h3>

      <section className="notes-block notes-mental">
        <h4>Mental Model</h4>
        {mentalModel}
      </section>

      <section className="notes-block notes-rules">
        <h4>Rules</h4>
        <ul>
          {rules.map((r, i) => (
            <li key={i} className={r.kind === "do" ? "rule-do" : "rule-dont"}>
              <span className="rule-mark">{r.kind === "do" ? "✓" : "✗"}</span>{" "}
              {r.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="notes-block notes-gotchas">
        <h4>Gotchas</h4>
        <ul>
          {gotchas.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </section>

      {snippet && (
        <section className="notes-block notes-snippet">
          <h4>Canonical Shape{snippetLabel ? ` — ${snippetLabel}` : ""}</h4>
          <CodeViewer code={snippet} />
        </section>
      )}
    </div>
  );
}
