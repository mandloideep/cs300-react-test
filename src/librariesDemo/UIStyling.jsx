export default function UIStyling() {
  return (
    <div className="demo-subsection">
      <h3>D. UI & Styling</h3>
      <p className="demo-note">
        These libraries handle the visual side — CSS frameworks, component
        libraries, animations, icons, and notifications. Mix and match based on
        your project needs.
      </p>

      {/* Tailwind CSS */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h4>Tailwind CSS</h4>
        <p>
          <strong>What:</strong> Utility-first CSS framework — style elements
          with predefined classes instead of writing custom CSS.
        </p>
        <p>
          <strong>Why:</strong> No more naming CSS classes or switching between
          files. Build responsive, dark-mode-ready UIs directly in your JSX. The
          industry standard for modern React projects.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install (Vite)"}</span>
          <br />
          npm install tailwindcss @tailwindcss/vite
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="comment">{"// Instead of writing CSS..."}</span>
          <br />
          &lt;button <span className="keyword">className</span>=
          <span className="string">
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
            rounded"
          </span>
          &gt;
          <br />
          {"  "}Click me
          <br />
          &lt;/button&gt;
          <br />
          <br />
          <span className="comment">{"// Responsive"}</span>
          <br />
          &lt;div <span className="keyword">className</span>=
          <span className="string">
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          </span>
          &gt;
          <br />
          <br />
          <span className="comment">{"// Dark mode"}</span>
          <br />
          &lt;div <span className="keyword">className</span>=
          <span className="string">
            "bg-white dark:bg-gray-800 text-black dark:text-white"
          </span>
          &gt;
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      {/* shadcn/ui */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h4>shadcn/ui</h4>
        <p>
          <strong>What:</strong> Copy-paste component library built on Radix UI
          primitives and Tailwind CSS. Not an npm package — you own the code.
        </p>
        <p>
          <strong>Why:</strong> Beautiful, accessible components (buttons,
          modals, dropdowns, data tables, forms) that you copy into your project
          and customize. Unlike traditional component libraries, you can modify
          every line. The most popular React component approach in 2025-2026.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Initialize in your project"}</span>
          <br />
          npx shadcn@latest init
          <br />
          <br />
          <span className="comment">{"// Add components as needed"}</span>
          <br />
          npx shadcn@latest add button
          <br />
          npx shadcn@latest add dialog
          <br />
          npx shadcn@latest add data-table
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="comment">{"// Use like any React component"}</span>
          <br />
          <span className="keyword">import</span> {"{ Button }"}{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"@/components/ui/button"</span>;
          <br />
          <br />
          &lt;<span className="component">Button</span> variant=
          <span className="string">"outline"</span> size=
          <span className="string">"lg"</span>&gt;
          <br />
          {"  "}Click me
          <br />
          &lt;/<span className="component">Button</span>&gt;
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      {/* Framer Motion */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h4>Framer Motion (Motion)</h4>
        <p>
          <strong>What:</strong> Declarative animations for React — animate
          mount/unmount, layout changes, gestures, and scroll-triggered effects.
        </p>
        <p>
          <strong>Why:</strong> CSS animations are limited and hard to
          coordinate. Framer Motion makes complex animations simple with a
          declarative API. Animate presence (enter/exit), layout transitions,
          drag, and spring physics.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install motion
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="keyword">import</span>{" "}
          {"{ motion, AnimatePresence }"} <span className="keyword">from</span>{" "}
          <span className="string">"motion/react"</span>;
          <br />
          <br />
          <span className="comment">{"// Animate on mount"}</span>
          <br />
          &lt;<span className="component">motion.div</span>
          <br />
          {"  "}initial={"{{ opacity: 0, y: 20 }}"}
          <br />
          {"  "}animate={"{{ opacity: 1, y: 0 }}"}
          <br />
          {"  "}transition={"{{ duration: 0.3 }}"}
          <br />
          &gt;
          <br />
          {"  "}Hello!
          <br />
          &lt;/<span className="component">motion.div</span>&gt;
          <br />
          <br />
          <span className="comment">
            {"// Animate exit (wrap in AnimatePresence)"}
          </span>
          <br />
          &lt;<span className="component">AnimatePresence</span>&gt;
          <br />
          {"  "}
          {"{"}isVisible &amp;&amp; (
          <br />
          {"    "}&lt;<span className="component">motion.div</span> exit=
          {"{{ opacity: 0 }}"}&gt;Bye!&lt;/
          <span className="component">motion.div</span>&gt;
          <br />
          {"  "}){"}"}
          <br />
          &lt;/<span className="component">AnimatePresence</span>&gt;
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://motion.dev/docs/react-quick-start"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      {/* React Icons */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h4>React Icons</h4>
        <p>
          <strong>What:</strong> One package, 40+ icon libraries — Font Awesome,
          Material Design, Heroicons, Lucide, and more as React components.
        </p>
        <p>
          <strong>Why:</strong> Import only the icons you use (tree-shakeable).
          Style them with props like <code>size</code> and <code>color</code>.
          No font files or CSS to manage.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install react-icons
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="keyword">import</span> {"{ FaGithub, FaReact }"}{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"react-icons/fa"</span>;
          <br />
          <span className="keyword">import</span> {"{ IoSearch }"}{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"react-icons/io5"</span>;
          <br />
          <br />
          &lt;<span className="component">FaGithub</span> size={"{24}"} color=
          <span className="string">"#333"</span> /&gt;
          <br />
          &lt;<span className="component">FaReact</span> size={"{32}"} color=
          <span className="string">"#61dafb"</span> /&gt;
          <br />
          &lt;<span className="component">IoSearch</span> /&gt;
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://react-icons.github.io/react-icons/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation & Icon Search
          </a>
        </p>
      </div>

      {/* React Hot Toast */}
      <div className="card">
        <h4>React Hot Toast</h4>
        <p>
          <strong>What:</strong> Lightweight toast notifications with a clean
          API, customizable styling, and promise support.
        </p>
        <p>
          <strong>Why:</strong> Show success/error/loading notifications with
          one line of code. Supports promises (auto-shows loading →
          success/error), custom JSX, and positioning. Under 5KB.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install react-hot-toast
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="keyword">import</span> toast, {"{ Toaster }"}{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"react-hot-toast"</span>;
          <br />
          <br />
          <span className="comment">
            {"// Add <Toaster /> once in your app"}
          </span>
          <br />
          &lt;<span className="component">Toaster</span> position=
          <span className="string">"top-right"</span> /&gt;
          <br />
          <br />
          <span className="comment">{"// Then call from anywhere"}</span>
          <br />
          toast.success(<span className="string">"Saved!"</span>);
          <br />
          toast.error(<span className="string">"Something went wrong"</span>);
          <br />
          <br />
          <span className="comment">
            {"// Promise toast — loading → success/error"}
          </span>
          <br />
          toast.promise(saveData(), {"{"}
          <br />
          {"  "}loading: <span className="string">"Saving..."</span>,
          <br />
          {"  "}success: <span className="string">"Saved!"</span>,
          <br />
          {"  "}error: <span className="string">"Could not save"</span>,
          <br />
          {"}"});
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://react-hot-toast.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      <div className="demo-practical">
        <h3>The modern React UI stack</h3>
        <ul>
          <li>
            <strong>Tailwind CSS + shadcn/ui</strong> is the most popular
            combination in 2025-2026. shadcn gives you pre-built components;
            Tailwind lets you customize everything.
          </li>
          <li>
            <strong>Framer Motion</strong> for any animation beyond simple CSS
            transitions (enter/exit, layout, drag, scroll).
          </li>
          <li>
            <strong>React Icons</strong> for icons — pick one icon library
            prefix (e.g., <code>Fi</code> for Feather Icons) and stick with it
            for consistency.
          </li>
          <li>
            <strong>React Hot Toast</strong> for user feedback — form
            submissions, API responses, error handling.
          </li>
        </ul>
      </div>
    </div>
  );
}
