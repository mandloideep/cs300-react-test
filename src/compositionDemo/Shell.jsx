// ============================================================
// Shell Component — Reusable wrapper with colored title bar
// ============================================================
// Used across multiple composition demo sections.
// Takes backgroundColor, textColor, title, and children props.
// Uses CSS custom properties for theming.

export default function Shell({ backgroundColor, textColor, title, children }) {
  console.log(
    "SHELL: rendering",
    JSON.stringify(title),
    "with bg =",
    backgroundColor,
  );

  return (
    <div
      className="shell"
      style={{
        "--shell-bg": backgroundColor || "#3498db",
        "--shell-text": textColor || "#fff",
      }}
    >
      <div className="shell-title">{title}</div>
      <div className="shell-content">
        {children}
        {/* children = whatever you put BETWEEN <Shell> and </Shell>.
            This is how composition works — the parent decides what goes inside. */}
      </div>
    </div>
  );
}
