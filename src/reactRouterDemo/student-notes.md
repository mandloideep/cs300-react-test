---
title: "NPM Libraries & React Router Basics"
weight: 1
---

# NPM Libraries & React Router Basics

## Introduction

This session covers two foundational skills for building real React applications. First, you'll learn how to add **third-party libraries** to your project using npm -- the tool that lets you reuse code written by other developers. Then you'll learn **React Router**, which turns your single-page React app into a multi-page experience with different URLs, navigation, and page transitions -- all without reloading the browser.

---

## NPM: Adding Libraries to Your Project

### What is npm?

**npm** (Node Package Manager) is a tool that comes installed with Node.js. It lets you:

- Install packages (libraries) that other developers have published
- Manage your project's dependencies in `package.json`
- Share your own packages with the community

The npm registry has over 2 million packages -- everything from React itself to tiny utilities.

### Installing a Package

To add a library to your project, run this command in your project's terminal:

```bash
npm install react-router-dom
```

This does three things:

1. **Downloads** the package into `node_modules/`
2. **Adds** it to `package.json` under `"dependencies"`
3. **Updates** `package-lock.json` with the exact version

```json
// package.json (after install)
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.1.1"  // <-- new line added
  }
}
```

{{< callout type="warning" >}}
Never edit `node_modules/` directly. Never commit it to Git (it's already in `.gitignore`). If you delete `node_modules/`, just run `npm install` to restore everything from `package.json`.
{{< /callout >}}

### Evaluating a Library Before Installing

Before you add a dependency, check these four things on [npmjs.com](https://www.npmjs.com):

| Check | What to Look For | Red Flag |
|-------|-------------------|----------|
| **Weekly downloads** | High numbers (thousands+) | Under 100/week |
| **Last published** | Within the last few months | Over 2 years ago |
| **Bundle size** | Reasonable for what it does | Huge for a simple task |
| **Dependencies** | Few or none | Dozens of sub-dependencies |

For example, `react-router-dom` has 18M+ weekly downloads, is published regularly, and is maintained by the Remix team. That's a safe install.

{{< callout type="important" >}}
**Rule of thumb:** If a library has fewer than 1,000 weekly downloads and hasn't been updated in over a year, look for an alternative or write it yourself.
{{< /callout >}}

### Uninstalling a Package

```bash
npm uninstall package-name
```

This removes it from `node_modules/` and `package.json`.

### Team Workflow

When a teammate installs a new package and pushes to GitHub, you need to run:

```bash
npm install
```

This reads `package.json` and installs any new dependencies they added. You'll see this pattern constantly in GP2.

---

## React Router: Client-Side Routing

### Why Do We Need Routing?

Without routing, your React app has one URL (`localhost:5173/`) and shows one view. But real apps need multiple pages:

- `/` -- Home page
- `/about` -- About page
- `/courses` -- Course listing
- `/courses/42` -- Individual course detail

**Traditional websites** reload the entire page for every link click. The browser sends a new request to the server, gets back a full HTML page, and renders it from scratch.

**Single-Page Applications (SPAs)** with React Router change the URL and swap components without reloading. The browser stays on the same page -- React just renders a different component based on the URL.

```
Traditional Website:              SPA with React Router:
Click link → full page reload     Click link → URL changes
Server sends new HTML             React swaps component
White flash, slow                 Instant, smooth
```

### Setting Up React Router

{{% steps %}}

### Install the package

```bash
npm install react-router-dom
```

### Wrap your app in BrowserRouter

```jsx
// main.jsx
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### Define your routes

```jsx
// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import CourseList from "./components/CourseList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<CourseList />} />
    </Routes>
  );
}
```

{{% /steps %}}

### Core Components

| Component | Purpose | Example |
|-----------|---------|---------|
| `BrowserRouter` | Wraps the entire app, enables routing | `<BrowserRouter><App /></BrowserRouter>` |
| `Routes` | Container for all Route definitions | `<Routes>...</Routes>` |
| `Route` | Maps a URL path to a component | `<Route path="/about" element={<About />} />` |
| `Link` | Navigates without page reload | `<Link to="/about">About</Link>` |
| `NavLink` | Like Link, but knows if it's active | `<NavLink to="/about">About</NavLink>` |
| `Outlet` | Renders child route content in layouts | `<Outlet />` |

### Link vs NavLink

Both navigate without reloading. The difference is that **NavLink** knows whether its URL matches the current page:

```jsx
import { Link, NavLink } from "react-router-dom";

// Link — basic navigation, no active awareness
<Link to="/about">About</Link>

// NavLink — provides isActive for styling
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
>
  About
</NavLink>
```

**When to use which:**
- **NavLink** -- for navigation bars, sidebars, tab menus (anywhere you highlight the current page)
- **Link** -- for inline links within content, cards, list items

### Nested Routes & Layouts

Most apps have a navigation bar that appears on every page. Instead of repeating `<nav>` in every component, use a **layout route**:

```jsx
// components/Layout.jsx
import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav className="navbar">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/courses">Courses</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
```

```jsx
// App.jsx — nested route structure
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import CourseList from "./components/CourseList";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<CourseList />} />
      </Route>
    </Routes>
  );
}
```

How it works:

```
┌──────────────────────────────────┐
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
└──────────────────────────────────┘
```

- The parent `Route` has no `path`, just `element={<Layout />}`
- Child routes are nested inside the parent
- `<Outlet />` is the placeholder where child components render
- The nav stays on screen while only the content area changes

{{< callout type="info" >}}
The `end` prop on `<NavLink to="/" end>` means it only highlights when the URL is exactly `/`, not for every URL that starts with `/`.
{{< /callout >}}

---

## State Patterns Review

For the complete reference on immutable state patterns, keyboard events, and common mistakes, see your **Week 11 Session 2 Student Notes**. Here's a quick cheat sheet:

### Immutable State Update Cheat Sheet

```jsx
// Object — spread + override
setUser({ ...user, name: "New Name" });

// Array — add (spread)
setItems([...items, newItem]);

// Array — remove (filter)
setItems(items.filter(item => item.id !== id));

// Array — toggle/update (map)
setItems(items.map(item =>
  item.id === id ? { ...item, done: !item.done } : item
));
```

{{< callout type="error" >}}
Never mutate state directly. `items.push(newItem)` modifies the existing array -- React won't detect the change and won't re-render. Always create a new array or object.
{{< /callout >}}

---

## Key Takeaways

{{< callout emoji="🎯" >}}
- **npm install** adds a package to your project. Check npmjs.com before installing: downloads, last published, bundle size, dependencies.
- **React Router** turns a single-page React app into a multi-page experience without page reloads.
- **BrowserRouter** wraps your app. **Routes** contains your route definitions. **Route** maps a path to a component.
- **Link** navigates without reload. **NavLink** is the same but knows if it's the active page.
- **Nested routes** with a Layout + **Outlet** keep shared UI (like a navbar) persistent across pages.
- State updates must be **immutable** -- use spread for objects, spread/filter/map for arrays. Never `.push()` or directly assign.
{{< /callout >}}

---

## Coming Up Thursday

On Thursday we'll continue with React Router:
- **Dynamic routes** with `useParams` (e.g., `/courses/42`)
- **useNavigate** for programmatic navigation (e.g., redirect after form submit)
- **404 pages** with catch-all routes
- **useSearchParams** for query strings (e.g., `/courses?q=react`)

---

## Additional Resources

{{< cards >}}
  {{< card link="https://reactrouter.com/en/main/start/tutorial" title="React Router Tutorial" subtitle="Official step-by-step guide" icon="book-open" >}}
  {{< card link="https://reactrouter.com/en/main/start/concepts" title="React Router Concepts" subtitle="Core concepts explained" icon="academic-cap" >}}
  {{< card link="https://www.npmjs.com" title="npm Registry" subtitle="Search and evaluate packages" icon="link" >}}
  {{< card link="https://docs.npmjs.com/cli/v10/commands/npm-install" title="npm install docs" subtitle="Official npm CLI reference" icon="document-text" >}}
{{< /cards >}}
