import SectionStepper from "../SectionStepper";
import deployYml from "../../.github/workflows/deploy.yml?raw";
import viteConfig from "../../vite.config.js?raw";

// ============================================================
// Deploy Guide — Step-by-step GitHub Pages deployment
// ============================================================
// Walks students through deploying their own Vite React app
// to GitHub Pages using a manual GitHub Actions workflow.

const STEP_A = (
  <div className="demo-practical">
    <h3>Step 1: Set the Base Path in Vite</h3>
    <p>
      GitHub Pages serves your site at{" "}
      <code>https://USERNAME.github.io/REPO-NAME/</code>, not at the root{" "}
      <code>/</code>. Without setting <code>base</code>, all your JS, CSS, and
      image paths will break (404 errors).
    </p>
    <p>
      Open <code>vite.config.js</code> and add the <code>base</code> property
      with your repository name:
    </p>
    <pre className="demo-code-block">{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/YOUR-REPO-NAME/',  // ← Replace with your repo name
  plugins: [react()],
})`}</pre>
    <p className="demo-note">
      Replace <code>YOUR-REPO-NAME</code> with the actual name of your GitHub
      repository (e.g., <code>/cs300-react-test/</code>).
    </p>
  </div>
);

const STEP_B = (
  <div className="demo-practical">
    <h3>Step 2: Create the GitHub Actions Workflow</h3>
    <p>
      GitHub Actions will build your app and deploy it for you. You need to
      create a workflow file that tells GitHub what to do.
    </p>

    <h4>File Location (this matters!)</h4>
    <p>
      The file <strong>must</strong> be at exactly this path from your project
      root:
    </p>
    <pre className="demo-code-block">{`your-project/
├── .github/
│   └── workflows/
│       └── deploy.yml   ← this file
├── src/
├── package.json
└── vite.config.js`}</pre>
    <p className="demo-note">
      GitHub <strong>only</strong> looks inside <code>.github/workflows/</code>{" "}
      for workflow files. If you put <code>deploy.yml</code> anywhere else (like
      the project root), GitHub will never find it and nothing will happen. The
      folder starts with a dot (<code>.github</code>), which means it is a
      hidden folder — you may need to enable "Show hidden files" in your file
      explorer to see it.
    </p>

    <h4>File Name</h4>
    <p>
      The file name (<code>deploy.yml</code>) can be anything you want — GitHub
      runs every <code>.yml</code> file it finds in{" "}
      <code>.github/workflows/</code>. We use <code>deploy.yml</code> to make
      the purpose obvious. The <strong>name</strong> field inside the file (line
      1: <code>name: Deploy to GitHub Pages</code>) is what shows up in the
      GitHub Actions UI.
    </p>

    <h4>Copy the workflow from the code panel →</h4>
    <p>
      Use the code panel on the right to copy the full workflow file contents.
    </p>
    <p className="demo-note">
      The <code>workflow_dispatch</code> trigger means this workflow only runs
      when you manually trigger it — it will NOT auto-deploy on every push.
    </p>
  </div>
);

const STEP_C = (
  <div className="demo-practical">
    <h3>Step 3: Enable GitHub Pages in Repo Settings</h3>
    <p>
      Before the workflow can deploy, you need to tell GitHub to use Actions as
      the source for Pages:
    </p>
    <ol>
      <li>Go to your repository on GitHub</li>
      <li>
        Click <strong>Settings</strong> (top menu bar)
      </li>
      <li>
        Click <strong>Pages</strong> (left sidebar, under "Code and automation")
      </li>
      <li>
        Under <strong>Source</strong>, select <strong>GitHub Actions</strong>{" "}
        (instead of "Deploy from a branch")
      </li>
    </ol>
    <p className="demo-note">
      This is a one-time setup. If you skip this step, the deploy workflow will
      fail with a permissions error.
    </p>
  </div>
);

const STEP_D = (
  <div className="demo-practical">
    <h3>Step 4: Push Your Code and Trigger the Workflow</h3>
    <p>
      First, commit and push all your changes (including the workflow file):
    </p>
    <pre className="demo-code-block">{`git add .
git commit -m "Add GitHub Pages deployment"
git push`}</pre>
    <p>Then trigger the deployment manually:</p>
    <ol>
      <li>Go to your repository on GitHub</li>
      <li>
        Click the <strong>Actions</strong> tab
      </li>
      <li>
        Click <strong>"Deploy to GitHub Pages"</strong> in the left sidebar
      </li>
      <li>
        Click the <strong>"Run workflow"</strong> dropdown button
      </li>
      <li>
        Click the green <strong>"Run workflow"</strong> button
      </li>
    </ol>
    <p className="demo-note">
      The workflow takes about 1-2 minutes to complete. You can watch the
      progress by clicking on the running workflow.
    </p>
  </div>
);

const STEP_E = (
  <div className="demo-practical">
    <h3>Step 5: Verify Your Deployment</h3>
    <p>
      Once the workflow completes successfully (green checkmark), your site is
      live!
    </p>
    <p>
      Visit: <code>https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/</code>
    </p>
    <h4>Troubleshooting</h4>
    <ul>
      <li>
        <strong>Blank page?</strong> — Check that <code>base</code> in{" "}
        <code>vite.config.js</code> matches your repo name exactly (including
        the slashes)
      </li>
      <li>
        <strong>404 on assets?</strong> — Same issue as above. Open browser
        DevTools → Network tab to see which URLs are failing
      </li>
      <li>
        <strong>Workflow failed?</strong> — Click on the failed run in the
        Actions tab to see the error logs. Common issues: missing{" "}
        <code>package-lock.json</code> (run <code>npm install</code> locally
        first), or Pages source not set to "GitHub Actions"
      </li>
      <li>
        <strong>Want to redeploy?</strong> — Push your changes, then go to
        Actions → "Deploy to GitHub Pages" → "Run workflow" again
      </li>
    </ul>
  </div>
);

const sections = [
  { label: "A. Set Base Path", content: STEP_A, code: viteConfig },
  { label: "B. Create Workflow", content: STEP_B, code: deployYml },
  { label: "C. Enable Pages", content: STEP_C },
  { label: "D. Push & Deploy", content: STEP_D },
  { label: "E. Verify", content: STEP_E },
];

export default function DeployGuide() {
  return (
    <div className="demo-section">
      <h2>Deploy to GitHub Pages</h2>
      <p className="demo-note">
        Follow these steps to publish your Vite React app to GitHub Pages. Each
        step builds on the previous one — go through them in order.
      </p>
      <SectionStepper sections={sections} />
    </div>
  );
}
