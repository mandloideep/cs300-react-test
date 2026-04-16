function NpmBasics() {
  return (
    <div className="demo-practical">
      <h3>What is npm?</h3>
      <p>
        <strong>npm</strong> (Node Package Manager) is a tool that comes
        installed with Node.js. It lets you:
      </p>
      <ul>
        <li>
          Install packages (libraries) that other developers have published
        </li>
        <li>
          Manage your project's dependencies in <code>package.json</code>
        </li>
        <li>Share your own packages with the community</li>
      </ul>
      <p>
        The npm registry has over 2 million packages — everything from React
        itself to tiny utilities.
      </p>

      <h3>Installing a Package</h3>
      <p>
        To add a library to your project, run this command in your project's
        terminal:
      </p>
      <pre className="demo-code-block">{`npm install react-router`}</pre>
      <p>This does three things:</p>
      <ol>
        <li>
          <strong>Downloads</strong> the package into <code>node_modules/</code>
        </li>
        <li>
          <strong>Adds</strong> it to <code>package.json</code> under{" "}
          <code>"dependencies"</code>
        </li>
        <li>
          <strong>Updates</strong> <code>package-lock.json</code> with the exact
          version
        </li>
      </ol>
      <p className="demo-note">
        Never edit <code>node_modules/</code> directly. Never commit it to Git
        (it's already in <code>.gitignore</code>). If you delete{" "}
        <code>node_modules/</code>, just run <code>npm install</code> to restore
        everything from <code>package.json</code>.
      </p>

      <h3>Uninstalling a Package</h3>
      <pre className="demo-code-block">{`npm uninstall package-name`}</pre>
      <p>
        This removes it from <code>node_modules/</code> and{" "}
        <code>package.json</code>.
      </p>

      <h3>Team Workflow</h3>
      <p>
        When a teammate installs a new package and pushes to GitHub, you need to
        run:
      </p>
      <pre className="demo-code-block">{`npm install`}</pre>
      <p>
        This reads <code>package.json</code> and installs any new dependencies
        they added. You'll see this pattern constantly in group projects.
      </p>
    </div>
  );
}

export default NpmBasics;
