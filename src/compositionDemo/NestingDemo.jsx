import Shell from "./Shell";
import Card from "./Card";

// ============================================================
// Section B: Nesting Components (Composition)
// ============================================================
// Components inside components inside components.
// Each Shell has a different color so you can SEE the nesting.
// Open the browser console to see the rendering order.

export default function NestingDemo() {
  return (
    <div className="demo-subsection">
      <h3>B. Nesting Components (Composition)</h3>
      <p className="demo-note">
        Components inside components inside components.
        Each Shell has a different color so you can SEE the nesting.
        Check the console to see the rendering order.
      </p>

      <Shell backgroundColor="#3498db" title="Outer Shell (Blue)">
        <p>I'm in the outer (blue) shell.</p>

        <Shell backgroundColor="#2ecc71" title="Inner Shell (Green)">
          <p>I'm in the inner (green) shell, which is INSIDE the blue shell.</p>

          <Card title="A Card Inside the Green Shell">
            <p>This card is the deepest level of nesting.</p>
          </Card>
        </Shell>

        <Card title="Another Card (in the Blue Shell)">
          <p>This card is inside the blue shell but outside the green one.</p>
        </Card>
      </Shell>

      {/* This is composition:
          - Shell doesn't know about Card
          - Card doesn't know about Shell
          - They work together because they both accept children
          - YOU decide how to combine them */}
    </div>
  );
}
