const ROLE_STYLES = {
  owner: {
    border: "2px solid #2563eb",
    background: "#eff6ff",
    badge: { bg: "#2563eb", text: "owns state" },
  },
  provider: {
    border: "2px solid #7c3aed",
    background: "#f5f3ff",
    badge: { bg: "#7c3aed", text: "provides via Context" },
  },
  passthrough: {
    border: "2px dashed #9ca3af",
    background: "#f9fafb",
    badge: { bg: "#6b7280", text: "passes through" },
  },
  unaware: {
    border: "1px dashed #d1d5db",
    background: "#fafafa",
    badge: { bg: "#d1d5db", text: "doesn't touch it" },
  },
  consumer: {
    border: "2px solid #16a34a",
    background: "#f0fdf4",
    badge: { bg: "#16a34a", text: "reads from context" },
  },
  leaf: {
    border: "2px solid #16a34a",
    background: "#f0fdf4",
    badge: { bg: "#16a34a", text: "actually uses it" },
  },
};

function Signature({ node }) {
  const muted = node.role === "unaware";
  const color = muted
    ? "#9ca3af"
    : node.role === "leaf" || node.role === "consumer"
      ? "#16a34a"
      : "#6b7280";

  if (node.role === "provider") {
    return (
      <span style={{ fontFamily: "monospace", fontWeight: 600 }}>
        &lt;{node.name}
        {node.propValue && (
          <span style={{ color: "#7c3aed", fontWeight: 400 }}>
            {" "}
            value={"{"}
            {node.propValue}
            {"}"}
          </span>
        )}
        &gt;
      </span>
    );
  }

  const showProp =
    node.prop && node.role !== "unaware" && node.role !== "consumer";

  return (
    <span
      style={{
        fontFamily: "monospace",
        fontWeight: 600,
        color: muted ? "#9ca3af" : "inherit",
      }}
    >
      &lt;{node.name}
      {showProp && (
        <span style={{ color, fontWeight: 400 }}>
          {" "}
          {node.prop}={"{"}
          {node.propValue ?? node.prop}
          {"}"}
        </span>
      )}
      &gt;
    </span>
  );
}

function Hook({ hook }) {
  if (!hook) return null;
  return (
    <div
      style={{
        marginTop: 6,
        fontFamily: "monospace",
        fontSize: 12,
        color: "#4b5563",
        background: "rgba(255,255,255,0.6)",
        padding: "2px 6px",
        borderRadius: 4,
        display: "inline-block",
      }}
    >
      {hook}
    </div>
  );
}

function Node({ node }) {
  const style = ROLE_STYLES[node.role] ?? ROLE_STYLES.passthrough;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div
      style={{
        border: style.border,
        background: style.background,
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <Signature node={node} />
        <span
          style={{
            fontSize: 11,
            background: style.badge.bg,
            color: style.badge.bg === "#d1d5db" ? "#374151" : "white",
            padding: "2px 8px",
            borderRadius: 10,
            whiteSpace: "nowrap",
          }}
        >
          {style.badge.text}
        </span>
      </div>

      <Hook hook={node.hook} />

      {node.note && (
        <div
          style={{
            fontSize: 13,
            color: node.role === "unaware" ? "#9ca3af" : "#4b5563",
            marginTop: 4,
          }}
        >
          {node.note}
        </div>
      )}

      {node.display && (
        <div
          style={{
            marginTop: 8,
            padding: 8,
            background: "white",
            border: "1px solid #d1d5db",
            borderRadius: 4,
            fontSize: 14,
          }}
        >
          {node.display}
        </div>
      )}

      {hasChildren &&
        node.children.map((child, i) => <Node key={i} node={child} />)}
    </div>
  );
}

export default function ComponentTree({ root }) {
  return <Node node={root} />;
}
