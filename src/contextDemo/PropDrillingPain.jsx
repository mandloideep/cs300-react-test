import { useState } from "react";

function UserBadge({ user }) {
  return (
    <div className="tree-layer tree-leaf">
      <div className="tree-layer-label">UserBadge (leaf — actually uses user)</div>
      <strong>Logged in as:</strong> {user.name} ({user.role})
    </div>
  );
}

function UserMenu({ user }) {
  return (
    <div className="tree-layer">
      <div className="tree-layer-label">UserMenu (passes user through)</div>
      <UserBadge user={user} />
    </div>
  );
}

function Header({ user }) {
  return (
    <div className="tree-layer">
      <div className="tree-layer-label">Header (passes user through)</div>
      <UserMenu user={user} />
    </div>
  );
}

function ExtraLayer({ user }) {
  return (
    <div className="tree-layer">
      <div className="tree-layer-label">ExtraLayer (also passes user through!)</div>
      <Header user={user} />
    </div>
  );
}

function Layout({ user, deep }) {
  return (
    <div className="tree-layer">
      <div className="tree-layer-label">Layout (passes user through)</div>
      {deep ? <ExtraLayer user={user} /> : <Header user={user} />}
    </div>
  );
}

export default function PropDrillingPain() {
  const [user] = useState({ name: "Ada Lovelace", role: "admin" });
  const [deep, setDeep] = useState(false);

  return (
    <div className="demo-subsection">
      <h3>Prop Drilling: Passing data through layers that don't need it</h3>
      <p className="demo-note">
        The <code>user</code> object lives in <code>App</code>. Only{" "}
        <code>UserBadge</code> uses it. Every component in between has to accept and
        forward it. This is "prop drilling".
      </p>

      <button className="btn btn-primary" onClick={() => setDeep(d => !d)}>
        {deep ? "Remove" : "Add"} a 4th layer
      </button>

      <div className="tree-layer" style={{ marginTop: 16 }}>
        <div className="tree-layer-label">App (owns the user state)</div>
        <Layout user={user} deep={deep} />
      </div>

      <div className="demo-practical">
        <h3>Why this hurts</h3>
        <ul>
          <li>Every middle component needs the <code>user</code> prop in its signature.</li>
          <li>Renaming the prop means editing every layer.</li>
          <li>Adding a new layer (the 4th one above) means threading the prop through it too.</li>
          <li>Middle components break encapsulation — they "know" about a value they don't use.</li>
        </ul>
      </div>
    </div>
  );
}
