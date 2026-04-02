import Shell from "./Shell";

// ============================================================
// Section A: The Shell Pattern
// ============================================================
// A Shell is a reusable wrapper. You pass it a title and background color,
// and put anything inside it using children.
// Open the browser console to follow along!

export default function ShellPatternDemo() {
  return (
    <div className="demo-subsection">
      <h3>A. The Shell Pattern</h3>
      <p className="demo-note">
        A Shell is a reusable wrapper. You pass it a title and background color,
        and put anything inside it using children. Look at how the blue shell
        wraps the content below.
      </p>

      <Shell backgroundColor="#3498db" title="My First Shell">
        <p>This content is INSIDE the shell.</p>
        <p>The shell provides the colored title bar and border.</p>
        <p>
          Whatever we put here becomes the shell's <code>children</code> prop.
        </p>
      </Shell>

      <Shell backgroundColor="#e74c3c" title="A Red Shell">
        <p>
          Same component, different color. The Shell doesn't care what's inside!
        </p>
      </Shell>
    </div>
  );
}
