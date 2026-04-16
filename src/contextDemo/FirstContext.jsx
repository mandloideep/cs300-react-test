import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

function UserBadge() {
  const user = useContext(UserContext);
  return (
    <div className="tree-layer tree-leaf">
      <div className="tree-layer-label">UserBadge — calls useContext(UserContext)</div>
      <strong>Logged in as:</strong> {user.name} ({user.role})
    </div>
  );
}

function UserMenu() {
  return (
    <div className="tree-layer">
      <div className="tree-layer-label">UserMenu — no user prop!</div>
      <UserBadge />
    </div>
  );
}

function Header() {
  return (
    <div className="tree-layer">
      <div className="tree-layer-label">Header — no user prop!</div>
      <UserMenu />
    </div>
  );
}

function Layout() {
  return (
    <div className="tree-layer">
      <div className="tree-layer-label">Layout — no user prop!</div>
      <Header />
    </div>
  );
}

export default function FirstContext() {
  const [user, setUser] = useState({ name: "Ada Lovelace", role: "admin" });

  return (
    <div className="demo-subsection">
      <h3>Solving prop drilling with Context (3-step API)</h3>
      <p className="demo-note">
        <strong>Step 1:</strong> <code>createContext()</code> at the top of the file.{" "}
        <strong>Step 2:</strong> wrap the tree in <code>&lt;Context.Provider value=&#123;...&#125;&gt;</code>.{" "}
        <strong>Step 3:</strong> call <code>useContext(Context)</code> in any descendant.
      </p>

      <div style={{ marginBottom: 12 }}>
        <button
          className="btn btn-primary"
          onClick={() =>
            setUser(u =>
              u.role === "admin"
                ? { name: "Grace Hopper", role: "guest" }
                : { name: "Ada Lovelace", role: "admin" }
            )
          }
        >
          Switch user (updates everywhere)
        </button>
      </div>

      <UserContext.Provider value={user}>
        <div className="tree-layer">
          <div className="tree-layer-label">App + UserContext.Provider</div>
          <Layout />
        </div>
      </UserContext.Provider>

      <div className="demo-practical">
        <h3>Notice</h3>
        <ul>
          <li>Layout, Header, UserMenu no longer accept a <code>user</code> prop.</li>
          <li>UserBadge reaches up to the Provider directly via <code>useContext</code>.</li>
          <li>When you click "Switch user", the Provider's value changes and only the components that <em>read</em> the context re-render with the new value.</li>
        </ul>
      </div>
    </div>
  );
}
