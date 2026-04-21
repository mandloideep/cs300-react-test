import { createContext, useContext, useState } from "react";
import ComponentTree, { CompNode } from "./ComponentTree";

const ThemeContext = createContext(null);
const UserContext = createContext(null);
const CartContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "Ada", role: "admin" });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const add = () =>
    setItems((arr) => [
      ...arr,
      { id: Date.now(), name: `Item ${arr.length + 1}` },
    ]);
  const clear = () => setItems([]);
  return (
    <CartContext.Provider value={{ items, add, clear }}>
      {children}
    </CartContext.Provider>
  );
}

function ThemeBadgeLive() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <strong>Theme:</strong> {theme}{" "}
      <button
        className="btn btn-secondary"
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      >
        toggle
      </button>
    </>
  );
}

function UserBadgeLive() {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <strong>User:</strong> {user.name} ({user.role}){" "}
      <button
        className="btn btn-secondary"
        onClick={() =>
          setUser((u) =>
            u.name === "Ada"
              ? { name: "Grace", role: "guest" }
              : { name: "Ada", role: "admin" },
          )
        }
      >
        switch
      </button>
    </>
  );
}

function CartBadgeLive() {
  const { items, add, clear } = useContext(CartContext);
  return (
    <>
      <strong>Cart:</strong> {items.length} items{" "}
      <button className="btn btn-secondary" onClick={add}>
        add
      </button>{" "}
      <button className="btn btn-danger" onClick={clear}>
        clear
      </button>
    </>
  );
}

export default function MultipleContexts() {
  return (
    <div className="demo-subsection">
      <h3>Multiple Contexts — split by concern</h3>
      <p className="demo-note">
        Wrap providers in any order. Each context updates independently, so
        toggling the theme doesn't re-render cart consumers, and adding to the
        cart doesn't re-render theme consumers.
      </p>

      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <ComponentTree>
              <CompNode
                name="ThemeProvider"
                role="provider"
                hook="useState('light') + <ThemeContext.Provider>"
                propValue="{ theme, setTheme }"
                note="Owns theme state and provides it via ThemeContext."
              >
                <CompNode
                  name="UserProvider"
                  role="provider"
                  hook="useState({ name, role }) + <UserContext.Provider>"
                  propValue="{ user, setUser }"
                  note="Owns user state and provides it via UserContext."
                >
                  <CompNode
                    name="CartProvider"
                    role="provider"
                    hook="useState([]) + <CartContext.Provider>"
                    propValue="{ items, add, clear }"
                    note="Owns cart state and provides it via CartContext."
                  >
                    <CompNode
                      name="ThemeBadge"
                      role="consumer"
                      hook="useContext(ThemeContext)"
                      note="Reads only theme. Ignores user/cart changes."
                      display={<ThemeBadgeLive />}
                    />
                    <CompNode
                      name="UserBadge"
                      role="consumer"
                      hook="useContext(UserContext)"
                      note="Reads only user. Ignores theme/cart changes."
                      display={<UserBadgeLive />}
                    />
                    <CompNode
                      name="CartBadge"
                      role="consumer"
                      hook="useContext(CartContext)"
                      note="Reads only cart. Ignores theme/user changes."
                      display={<CartBadgeLive />}
                    />
                  </CompNode>
                </CompNode>
              </CompNode>
            </ComponentTree>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>

      <div className="demo-practical">
        <h3>Should I make one big context or many small ones?</h3>
        <ul>
          <li>
            <strong>Many small ones (preferred).</strong> Each consumer only
            re-renders when its own context changes.
          </li>
          <li>
            <strong>One big context</strong> means every consumer re-renders on
            every change — wasteful.
          </li>
          <li>
            Group values that change together (e.g., <code>cart.items</code> +{" "}
            <code>cart.total</code>).
          </li>
          <li>
            Split values that change independently (theme vs user vs cart).
          </li>
        </ul>
        <p style={{ marginTop: 12 }}>
          Wrapping order in <code>App.jsx</code> doesn't matter for correctness
          — only for which context can read which (inner can read outer, not
          vice versa).
        </p>
      </div>
    </div>
  );
}
