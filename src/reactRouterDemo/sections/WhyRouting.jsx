function WhyRouting() {
  return (
    <div className="demo-practical">
      <h3>Why Do We Need Routing?</h3>
      <p>
        Without routing, your React app has one URL (
        <code>localhost:5173/</code>) and shows one view. But real apps need
        multiple pages:
      </p>
      <ul>
        <li>
          <code>/</code> — Home page
        </li>
        <li>
          <code>/about</code> — About page
        </li>
        <li>
          <code>/courses</code> — Course listing
        </li>
        <li>
          <code>/courses/42</code> — Individual course detail
        </li>
      </ul>

      <h3>Traditional Websites vs SPAs</h3>
      <pre className="demo-code-block">{`Traditional Website:              SPA with React Router:
Click link → full page reload     Click link → URL changes
Server sends new HTML             React swaps component
White flash, slow                 Instant, smooth`}</pre>
      <p>
        <strong>Single-Page Applications (SPAs)</strong> with React Router
        change the URL and swap components without reloading. The browser stays
        on the same page — React just renders a different component based on the
        URL.
      </p>

      <h3>Setting Up React Router</h3>
      <ol>
        <li>
          <strong>Install the package:</strong>{" "}
          <code>npm install react-router-dom</code>
        </li>
        <li>
          <strong>Wrap your app</strong> in <code>BrowserRouter</code> (in{" "}
          <code>main.jsx</code>)
        </li>
        <li>
          <strong>Define your routes</strong> using <code>Routes</code> and{" "}
          <code>Route</code> (in <code>App.jsx</code>)
        </li>
      </ol>
      <p className="demo-note">
        Check the code panel to see the complete setup code for both{" "}
        <code>main.jsx</code> and <code>App.jsx</code>.
      </p>

      <h3>Core Components</h3>
      <table className="demo-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>BrowserRouter</code>
            </td>
            <td>Wraps the entire app, enables routing</td>
          </tr>
          <tr>
            <td>
              <code>Routes</code>
            </td>
            <td>Container for all Route definitions</td>
          </tr>
          <tr>
            <td>
              <code>Route</code>
            </td>
            <td>Maps a URL path to a component</td>
          </tr>
          <tr>
            <td>
              <code>Link</code>
            </td>
            <td>Navigates without page reload</td>
          </tr>
          <tr>
            <td>
              <code>NavLink</code>
            </td>
            <td>Like Link, but knows if it's the active page</td>
          </tr>
          <tr>
            <td>
              <code>Outlet</code>
            </td>
            <td>Renders child route content in layouts</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WhyRouting;
