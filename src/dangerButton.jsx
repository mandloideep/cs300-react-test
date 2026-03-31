export default function DangerButton({ onClick, children }) {
  return (
    <button
      className="btn btn-danger"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
