import { useState } from "react";
import ComponentTree, { CompNode } from "./ComponentTree";

export default function PropDrillingPain() {
  const [user] = useState({ name: "Ada Lovelace", role: "admin" });
  const [deep, setDeep] = useState(false);

  const headerSubtree = (
    <CompNode
      name="Header"
      role="passthrough"
      prop="user"
      note="Doesn't use user — only forwards it"
    >
      <CompNode
        name="UserMenu"
        role="passthrough"
        prop="user"
        note="Doesn't use user — only forwards it to UserBadge"
      >
        <CompNode
          name="UserBadge"
          role="leaf"
          prop="user"
          propValue="user"
          note="Only this leaf actually reads user.name / user.role"
          display={
            <>
              <strong>Logged in as:</strong> {user.name} ({user.role})
            </>
          }
        />
      </CompNode>
    </CompNode>
  );

  return (
    <div className="demo-subsection">
      <h3>Prop Drilling: Passing data through layers that don't need it</h3>
      <p className="demo-note">
        The <code>user</code> object lives in <code>App</code>. Only{" "}
        <code>UserBadge</code> (the green leaf) uses it. Every component in
        between has to accept and forward it. This is "prop drilling".
      </p>

      <button className="btn btn-primary" onClick={() => setDeep((d) => !d)}>
        {deep ? "Remove" : "Add"} a 4th layer
      </button>

      <div style={{ marginTop: 16 }}>
        <ComponentTree>
          <CompNode
            name="App"
            role="owner"
            prop="user"
            propValue={`{ name: "${user.name}", role: "${user.role}" }`}
            note="App owns the user state with useState. It has to pass user down through every layer."
          >
            <CompNode
              name="Layout"
              role="passthrough"
              prop="user"
              note="Doesn't use user — only forwards it"
            >
              {deep ? (
                <CompNode
                  name="ExtraLayer"
                  role="passthrough"
                  prop="user"
                  note="A new layer — now it ALSO has to accept & forward user"
                >
                  {headerSubtree}
                </CompNode>
              ) : (
                headerSubtree
              )}
            </CompNode>
          </CompNode>
        </ComponentTree>
      </div>

      <div className="demo-practical">
        <h3>Why this hurts</h3>
        <ul>
          <li>
            Every middle component needs the <code>user</code> prop in its
            signature.
          </li>
          <li>Renaming the prop means editing every layer.</li>
          <li>
            Adding a new layer (click the button above) means threading the prop
            through it too.
          </li>
          <li>
            Middle components break encapsulation — they "know" about a value
            they don't use.
          </li>
        </ul>
      </div>
    </div>
  );
}
