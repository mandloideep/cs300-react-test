import SectionStepper from "../SectionStepper";

// ============================================================
// Deploy Demo — Step-by-step Vercel deployment
// ============================================================
// Walks students through deploying their own Vite React app
// to Vercel (free Hobby tier, no credit card).

const vercelJson = `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
`;

const STEP_A = (
  <div className="demo-practical">
    <h3>Step 1: Push your code to GitHub</h3>
    <p>
      Make sure all your changes are committed and pushed to your repository:
    </p>
    <div className="code-block">
      git add .<br />
      git commit -m "Ready for deployment"
      <br />
      git push origin main
    </div>
    <p style={{ color: "#666", fontSize: "0.9rem" }}>
      Your repo should have a <code>package.json</code> and{" "}
      <code>vite.config.js</code> at the root.
    </p>
  </div>
);

const STEP_B = (
  <div className="demo-practical">
    <h3>Step 2: Sign up / Sign in to Vercel</h3>
    <p>
      Go to <strong>vercel.com</strong> and click <strong>"Sign Up"</strong> (or
      "Log In" if you already have an account).
    </p>
    <p>
      Choose <strong>"Continue with GitHub"</strong> — this connects your repos
      automatically.
    </p>
    <div className="demo-note">
      Vercel's free tier (called "Hobby") is completely free. No credit card
      required. You get unlimited deployments for personal projects.
    </div>
  </div>
);

const STEP_C = (
  <div className="demo-practical">
    <h3>Step 3: Import your project</h3>
    <p>
      Click <strong>"Add New... &rarr; Project"</strong>, then find your
      repository in the list and click <strong>"Import"</strong>.
    </p>
    <p>
      Vercel auto-detects that it's a Vite project and fills in the correct
      settings:
    </p>
    <table className="compare-table">
      <thead>
        <tr>
          <th>Setting</th>
          <th>Value (auto-detected)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Framework Preset</td>
          <td>Vite</td>
        </tr>
        <tr>
          <td>Build Command</td>
          <td>
            <code>npm run build</code>
          </td>
        </tr>
        <tr>
          <td>Output Directory</td>
          <td>
            <code>dist</code>
          </td>
        </tr>
      </tbody>
    </table>
    <p style={{ color: "#666", fontSize: "0.9rem" }}>
      You usually don't need to change anything here. Just verify and continue.
    </p>
  </div>
);

const STEP_D = (
  <div className="demo-practical">
    <h3>Step 4: Add environment variables (if needed)</h3>
    <p>
      If your app uses a <code>.env</code> file with API keys, you need to add
      them in Vercel too. Expand the <strong>"Environment Variables"</strong>{" "}
      section before deploying.
    </p>
    <table className="compare-table">
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>VITE_API_KEY</code>
          </td>
          <td>your-api-key-here</td>
        </tr>
        <tr>
          <td>
            <code>VITE_API_BASE_URL</code>
          </td>
          <td>https://api.example.com</td>
        </tr>
      </tbody>
    </table>
    <div className="demo-note">
      Remember: Vite requires the <code>VITE_</code> prefix. Variables without
      it won't be available in your frontend code.
    </div>
  </div>
);

const STEP_E = (
  <div className="demo-practical">
    <h3>Step 5: Deploy!</h3>
    <p>
      Click <strong>"Deploy"</strong> and wait about 30-60 seconds. Vercel will:
    </p>
    <ol>
      <li>Clone your repo</li>
      <li>
        Run <code>npm install</code>
      </li>
      <li>
        Run <code>npm run build</code>
      </li>
      <li>
        Upload the <code>dist/</code> folder to their CDN
      </li>
    </ol>
    <p>
      When it's done, you'll get a live URL like:{" "}
      <code>your-project-abc123.vercel.app</code>
    </p>
    <div className="demo-note">
      <strong>Auto-deploy:</strong> From now on, every time you push to{" "}
      <code>main</code>, Vercel automatically rebuilds and deploys. Merge a PR
      &rarr; site updates in ~30 seconds.
    </div>
  </div>
);

const STEP_F = (
  <div className="demo-practical">
    <h3>Step 6: Fix React Router 404s (important!)</h3>
    <p>
      If you're using React Router with <code>BrowserRouter</code>, you'll
      notice a problem: refreshing any page other than <code>/</code> shows a{" "}
      <strong>404 error</strong>.
    </p>
    <p>
      <strong>Why?</strong> Vercel looks for a file at{" "}
      <code>/restaurants/pizza</code> on the server — but that file doesn't
      exist. Your React app handles routing client-side, not server-side.
    </p>
    <p>
      <strong>Fix:</strong> Create a <code>vercel.json</code> file in your
      project root (see the Code tab for the exact contents).
    </p>
    <p>
      This tells Vercel: "For any URL, serve <code>index.html</code> and let
      React Router handle it."
    </p>
    <p>Commit and push this file — Vercel will auto-redeploy:</p>
    <div className="code-block">
      git add vercel.json
      <br />
      git commit -m "Add Vercel rewrites for React Router"
      <br />
      git push
    </div>
  </div>
);

const STEP_G = (
  <div className="demo-practical">
    <h3>Step 7: Test your live site</h3>
    <p>Open your Vercel URL and test every feature:</p>
    <ul style={{ lineHeight: 2 }}>
      <li>Home page loads correctly</li>
      <li>Navigation between pages works</li>
      <li>
        Direct URL access works (e.g., paste <code>/restaurants/1</code> in a
        new tab)
      </li>
      <li>API data loads (check loading states and error handling)</li>
      <li>Favorites / localStorage features work</li>
      <li>Responsive design looks good on mobile (use DevTools device mode)</li>
      <li>No console errors</li>
    </ul>
    <div className="demo-note">
      <strong>Share your URL!</strong> This is a real website anyone can visit.
      Add it to your README, your portfolio, and your resume.
    </div>
  </div>
);

const STEP_H = (
  <div className="demo-practical">
    <h3>Vercel vs Netlify vs GitHub Pages</h3>
    <table className="compare-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Vercel</th>
          <th>Netlify</th>
          <th>GitHub Pages</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Free tier</td>
          <td>
            <span className="tag tag-good">Yes</span>
          </td>
          <td>
            <span className="tag tag-good">Yes</span>
          </td>
          <td>
            <span className="tag tag-good">Yes</span>
          </td>
        </tr>
        <tr>
          <td>Credit card required</td>
          <td>
            <span className="tag tag-good">No</span>
          </td>
          <td>
            <span className="tag tag-good">No</span>
          </td>
          <td>
            <span className="tag tag-good">No</span>
          </td>
        </tr>
        <tr>
          <td>Auto-deploy from GitHub</td>
          <td>
            <span className="tag tag-good">Yes</span>
          </td>
          <td>
            <span className="tag tag-good">Yes</span>
          </td>
          <td>
            <span className="tag tag-warn">With Actions</span>
          </td>
        </tr>
        <tr>
          <td>React Router support</td>
          <td>
            <span className="tag tag-good">vercel.json</span>
          </td>
          <td>
            <span className="tag tag-good">_redirects file</span>
          </td>
          <td>
            <span className="tag tag-bad">HashRouter only</span>
          </td>
        </tr>
        <tr>
          <td>Environment variables</td>
          <td>
            <span className="tag tag-good">Dashboard</span>
          </td>
          <td>
            <span className="tag tag-good">Dashboard</span>
          </td>
          <td>
            <span className="tag tag-bad">Secrets + Actions</span>
          </td>
        </tr>
        <tr>
          <td>Best for</td>
          <td>React / Next.js</td>
          <td>Any static site</td>
          <td>Simple sites</td>
        </tr>
      </tbody>
    </table>
    <p style={{ marginTop: 8, color: "#666" }}>
      For GP2 and your Final Project, <strong>Vercel</strong> is the easiest
      option for React + Vite apps. Netlify is also excellent and works nearly
      identically.
    </p>
  </div>
);

const sections = [
  { label: "A. Push to GitHub", content: STEP_A },
  { label: "B. Sign in to Vercel", content: STEP_B },
  { label: "C. Import project", content: STEP_C },
  { label: "D. Env variables", content: STEP_D },
  { label: "E. Deploy", content: STEP_E },
  { label: "F. Fix Router 404s", content: STEP_F, code: vercelJson },
  { label: "G. Test live site", content: STEP_G },
  { label: "H. Compare hosts", content: STEP_H },
];

export default function DeployDemo() {
  return (
    <div className="demo-section">
      <h2>Deploy to Vercel — Free, No Credit Card</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Vercel's Hobby plan is free forever for personal projects. Unlimited
        deployments, automatic HTTPS, custom domains optional.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
