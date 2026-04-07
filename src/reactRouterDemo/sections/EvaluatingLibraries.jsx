function EvaluatingLibraries() {
  return (
    <div className="demo-practical">
      <h3>Evaluating a Library Before Installing</h3>
      <p>
        Before you add a dependency, check these four things on{" "}
        <a
          href="https://www.npmjs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          npmjs.com
        </a>
        :
      </p>

      <table className="demo-table">
        <thead>
          <tr>
            <th>Check</th>
            <th>What to Look For</th>
            <th>Red Flag</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Weekly downloads</strong>
            </td>
            <td>High numbers (thousands+)</td>
            <td>Under 100/week</td>
          </tr>
          <tr>
            <td>
              <strong>Last published</strong>
            </td>
            <td>Within the last few months</td>
            <td>Over 2 years ago</td>
          </tr>
          <tr>
            <td>
              <strong>Bundle size</strong>
            </td>
            <td>Reasonable for what it does</td>
            <td>Huge for a simple task</td>
          </tr>
          <tr>
            <td>
              <strong>Dependencies</strong>
            </td>
            <td>Few or none</td>
            <td>Dozens of sub-dependencies</td>
          </tr>
        </tbody>
      </table>

      <p>
        For example, <code>react-router-dom</code> has 18M+ weekly downloads, is
        published regularly, and is maintained by the Remix team. That's a safe
        install.
      </p>

      <p className="demo-note">
        <strong>Rule of thumb:</strong> If a library has fewer than 1,000 weekly
        downloads and hasn't been updated in over a year, look for an
        alternative or write it yourself.
      </p>

      <h3>Checking Bundle Size Impact</h3>
      <p>
        Every library you add increases how much JavaScript your users need to
        download. Use these tools to check impact before installing:
      </p>
      <ul>
        <li>
          <a
            href="https://bundlephobia.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Bundlephobia</strong>
          </a>{" "}
          — shows the minified + gzipped size and download time for any npm
          package
        </li>
        <li>
          <a
            href="https://pkg-size.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>pkg-size.dev</strong>
          </a>{" "}
          — another size analyzer with dependency tree visualization
        </li>
      </ul>
      <p>
        For perspective: <code>react-router-dom</code> adds ~14kB gzipped to
        your bundle. That's reasonable for what it provides (full client-side
        routing). A package that adds 200kB just to format dates? Look for a
        lighter alternative.
      </p>

      <h3>Questions to Ask Before Installing</h3>
      <ol>
        <li>Can I do this with built-in browser/React APIs?</li>
        <li>Is this actively maintained?</li>
        <li>How much will this increase my bundle size?</li>
        <li>Does it have good documentation?</li>
        <li>Are there lighter alternatives?</li>
      </ol>
    </div>
  );
}

export default EvaluatingLibraries;
