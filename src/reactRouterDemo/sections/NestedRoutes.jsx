function NestedRoutes() {
  return (
    <div className="demo-practical">
      <h3>Nested Routes and Layouts</h3>
      <p>
        Most apps have a navigation bar that appears on every page. Instead of
        repeating <code>&lt;nav&gt;</code> in every component, use a{" "}
        <strong>layout route</strong>.
      </p>

      <h4>How It Works</h4>
      <pre className="demo-code-block">{`┌──────────────────────────────────┐
│  Layout                          │
│  ┌────────────────────────────┐  │
│  │  Nav: Home | About | Courses│  │
│  └────────────────────────────┘  │
│  ┌────────────────────────────┐  │
│  │  <Outlet />                │  │
│  │                            │  │
│  │  (child route renders here)│  │
│  │  <Home />, <About />, etc. │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘`}</pre>

      <h4>Key Concepts</h4>
      <ul>
        <li>
          The parent <code>Route</code> has <strong>no path</strong>, just{" "}
          <code>element=&#123;&lt;Layout /&gt;&#125;</code>
        </li>
        <li>Child routes are nested inside the parent</li>
        <li>
          <code>&lt;Outlet /&gt;</code> is the placeholder where child
          components render
        </li>
        <li>The nav stays on screen while only the content area changes</li>
      </ul>

      <h4>
        The <code>end</code> Prop
      </h4>
      <pre className="demo-code-block">{`<NavLink to="/" end>Home</NavLink>`}</pre>
      <p>
        The <code>end</code> prop on <code>&lt;NavLink to="/" end&gt;</code>{" "}
        means it only highlights when the URL is <strong>exactly</strong>{" "}
        <code>/</code>, not for every URL that starts with <code>/</code>.
        Without <code>end</code>, the Home link would always appear active since
        every URL starts with <code>/</code>.
      </p>

      <p className="demo-note">
        Check the code panel to see the complete nested route configuration with
        Layout, child routes, and the catch-all 404 route.
      </p>
    </div>
  );
}

export default NestedRoutes;
