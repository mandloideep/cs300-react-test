import { createContext, useContext, useState } from "react";
import ComponentTree from "./ComponentTree";

const UserContext = createContext(null);

function UserBadgeLive() {
  const user = useContext(UserContext);
  return (
    <>
      <strong>Logged in as:</strong> {user.name} ({user.role})
    </>
  );
}

function buildTree(user) {
  return {
    name: "App",
    role: "owner",
    hook: `useState({ name: "${user.name}", role: "${user.role}" })`,
    note: "App owns the user state AND wraps its tree in the Provider.",
    children: [
      {
        name: "UserContext.Provider",
        role: "provider",
        propValue: "user",
        note: "Distributes user to any descendant — no props needed on the middle layers.",
        children: [
          {
            name: "Layout",
            role: "unaware",
            note: "No user prop. Doesn't know user exists.",
            children: [
              {
                name: "Header",
                role: "unaware",
                note: "No user prop. Doesn't know user exists.",
                children: [
                  {
                    name: "UserMenu",
                    role: "unaware",
                    note: "No user prop. Doesn't know user exists.",
                    children: [
                      {
                        name: "UserBadge",
                        role: "consumer",
                        hook: "useContext(UserContext)",
                        note: "Reaches up to the Provider directly — skips every layer above.",
                        display: <UserBadgeLive />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

export default function FirstContext() {
  const [user, setUser] = useState({ name: "Ada Lovelace", role: "admin" });

  return (
    <div className="demo-subsection">
      <h3>Solving prop drilling with Context (3-step API)</h3>
      <p className="demo-note">
        <strong>Step 1:</strong> <code>createContext()</code> at the top of the
        file. <strong>Step 2:</strong> wrap the tree in{" "}
        <code>&lt;Context.Provider value=&#123;...&#125;&gt;</code>.{" "}
        <strong>Step 3:</strong> call <code>useContext(Context)</code> in any
        descendant.
      </p>
      <p className="demo-note">
        Compare this tree with Section A. Middle layers are now{" "}
        <strong>grey</strong> — they don't touch <code>user</code> at all. Only
        the <strong>purple Provider</strong> and the{" "}
        <strong>green Consumer</strong> do.
      </p>

      <div style={{ marginBottom: 12 }}>
        <button
          className="btn btn-primary"
          onClick={() =>
            setUser((u) =>
              u.role === "admin"
                ? { name: "Grace Hopper", role: "guest" }
                : { name: "Ada Lovelace", role: "admin" },
            )
          }
        >
          Switch user (updates everywhere)
        </button>
      </div>

      <UserContext.Provider value={user}>
        <ComponentTree root={buildTree(user)} />
      </UserContext.Provider>

      <div className="demo-practical">
        <h3>Notice</h3>
        <ul>
          <li>
            Layout, Header, UserMenu no longer accept a <code>user</code> prop.
          </li>
          <li>
            UserBadge reaches up to the Provider directly via{" "}
            <code>useContext</code>.
          </li>
          <li>
            When you click "Switch user", the Provider's value changes and only
            the components that <em>read</em> the context re-render with the new
            value.
          </li>
        </ul>
      </div>
    </div>
  );
}
