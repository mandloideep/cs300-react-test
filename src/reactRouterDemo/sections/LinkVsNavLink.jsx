function LinkVsNavLink() {
  return (
    <div className="demo-practical">
      <h3>Link vs NavLink</h3>
      <p>
        Both <code>Link</code> and <code>NavLink</code> navigate without
        reloading the page. The key difference is that <strong>NavLink</strong>{" "}
        knows whether its URL matches the current page.
      </p>

      <h4>Link — Basic Navigation</h4>
      <pre className="demo-code-block">{`import { Link } from "react-router-dom";

// Simple navigation, no active awareness
<Link to="/about">About</Link>
<Link to="/courses/3">View Course</Link>`}</pre>

      <h4>NavLink — Active-Aware Navigation</h4>
      <pre className="demo-code-block">{`import { NavLink } from "react-router-dom";

// Provides isActive for styling the current page
<NavLink
  to="/about"
  className={({ isActive }) =>
    isActive ? "nav-link active" : "nav-link"
  }
>
  About
</NavLink>`}</pre>

      <h3>When to Use Which</h3>
      <table className="demo-table">
        <thead>
          <tr>
            <th>Use</th>
            <th>When</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>NavLink</code>
            </td>
            <td>Navigation bars, sidebars, tab menus</td>
            <td>Highlighting the current page in the navbar</td>
          </tr>
          <tr>
            <td>
              <code>Link</code>
            </td>
            <td>Inline links, cards, list items</td>
            <td>"View Details" link on a course card</td>
          </tr>
        </tbody>
      </table>

      <p className="demo-note">
        Check the code panel to see <code>Layout.jsx</code> — it uses{" "}
        <code>NavLink</code> for the navigation bar with <code>isActive</code>{" "}
        styling. The course cards in <code>CourseList.jsx</code> use plain{" "}
        <code>Link</code> instead.
      </p>
    </div>
  );
}

export default LinkVsNavLink;
