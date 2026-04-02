# Deploy Your Vite React App to GitHub Pages

A step-by-step guide to publishing your React app using GitHub Actions.

---

## Step 1: Set the Base Path in Vite

GitHub Pages serves your site at `https://USERNAME.github.io/REPO-NAME/`, not at the root `/`. Without setting `base`, all your JS, CSS, and image paths will break (404 errors).

Open `vite.config.js` and add the `base` property:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/YOUR-REPO-NAME/',  // ← Replace with your repo name
  plugins: [react()],
})
```

> Replace `YOUR-REPO-NAME` with the actual name of your GitHub repository.

---

## Step 2: Create the GitHub Actions Workflow

Create the file `.github/workflows/deploy.yml` in your project root:

```yaml
name: Deploy to GitHub Pages

on:
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - id: deployment
        uses: actions/deploy-pages@v4
```

> The `workflow_dispatch` trigger means this workflow only runs when you manually trigger it — it will NOT auto-deploy on every push.

---

## Step 3: Enable GitHub Pages in Repo Settings

1. Go to your repository on GitHub
2. Click **Settings** (top menu bar)
3. Click **Pages** (left sidebar, under "Code and automation")
4. Under **Source**, select **GitHub Actions** (instead of "Deploy from a branch")

> This is a one-time setup. If you skip this step, the deploy workflow will fail with a permissions error.

---

## Step 4: Push Your Code and Trigger the Workflow

First, commit and push all your changes (including the workflow file):

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push
```

Then trigger the deployment manually:

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Click **"Deploy to GitHub Pages"** in the left sidebar
4. Click the **"Run workflow"** dropdown button
5. Click the green **"Run workflow"** button

> The workflow takes about 1-2 minutes to complete. You can watch the progress by clicking on the running workflow.

---

## Step 5: Verify Your Deployment

Once the workflow completes successfully (green checkmark), your site is live!

Visit: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Troubleshooting

- **Blank page?** — Check that `base` in `vite.config.js` matches your repo name exactly (including the slashes)
- **404 on assets?** — Same issue as above. Open browser DevTools → Network tab to see which URLs are failing
- **Workflow failed?** — Click on the failed run in the Actions tab to see the error logs. Common issues: missing `package-lock.json` (run `npm install` locally first), or Pages source not set to "GitHub Actions"
- **Want to redeploy?** — Push your changes, then go to Actions → "Deploy to GitHub Pages" → "Run workflow" again
