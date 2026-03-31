// ============================================================
// Card Component — Simple card that can go inside a Shell
// ============================================================
// Used across multiple composition demo sections.

export default function Card({ title, children }) {
  console.log("CARD: rendering", JSON.stringify(title));
  return (
    <div className="card">
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}
