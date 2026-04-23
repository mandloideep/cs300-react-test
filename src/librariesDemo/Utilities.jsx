export default function Utilities() {
  return (
    <div className="demo-subsection">
      <h3>E. Utilities</h3>
      <p className="demo-note">
        Utility libraries handle common operations that JavaScript doesn't do
        well out of the box — like date formatting and manipulation.
      </p>

      {/* date-fns */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h4>date-fns</h4>
        <p>
          <strong>What:</strong> Modern, modular date utility library —
          tree-shakeable, immutable, and comprehensive. The "Lodash for dates."
        </p>
        <p>
          <strong>Why:</strong> JavaScript's built-in <code>Date</code> object
          is notoriously painful — no formatting, no relative time, no timezone
          support, mutates in place. date-fns gives you 200+ functions, each
          importable individually so your bundle only includes what you use.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install date-fns
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="keyword">import</span>{" "}
          {"{ format, formatDistanceToNow, isAfter, addDays }"}{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"date-fns"</span>;
          <br />
          <br />
          <span className="comment">{"// Format dates"}</span>
          <br />
          format(<span className="keyword">new</span> Date(),{" "}
          <span className="string">"MMM d, yyyy"</span>);
          <br />
          <span className="comment">{'// → "Apr 23, 2026"'}</span>
          <br />
          <br />
          <span className="comment">{"// Relative time"}</span>
          <br />
          formatDistanceToNow(someDate, {"{ addSuffix: true }"});
          <br />
          <span className="comment">{'// → "3 days ago"'}</span>
          <br />
          <br />
          <span className="comment">{"// Date math"}</span>
          <br />
          <span className="keyword">const</span> deadline = addDays(
          <span className="keyword">new</span> Date(), 7);
          <br />
          isAfter(deadline, <span className="keyword">new</span> Date());{" "}
          <span className="comment">{"// → true"}</span>
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://date-fns.org/docs/Getting-Started"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      {/* dayjs */}
      <div className="card">
        <h4>Day.js (Alternative)</h4>
        <p>
          <strong>What:</strong> Tiny (2KB) date library with a
          Moment.js-compatible API — chainable, immutable, and plugin-based.
        </p>
        <p>
          <strong>Why:</strong> If you want the smallest possible bundle and a
          familiar API (same as Moment.js), Day.js is the choice. date-fns is
          more comprehensive; Day.js is more minimal.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install dayjs
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="keyword">import</span> dayjs{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"dayjs"</span>;
          <br />
          <span className="keyword">import</span> relativeTime{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"dayjs/plugin/relativeTime"</span>;
          <br />
          <br />
          dayjs.extend(relativeTime);
          <br />
          <br />
          dayjs().format(<span className="string">"MMM D, YYYY"</span>);
          <br />
          <span className="comment">{'// → "Apr 23, 2026"'}</span>
          <br />
          <br />
          dayjs(<span className="string">"2026-04-20"</span>).fromNow();
          <br />
          <span className="comment">{'// → "3 days ago"'}</span>
          <br />
          <br />
          dayjs().add(7, <span className="string">"day"</span>).format(
          <span className="string">"YYYY-MM-DD"</span>);
          <br />
          <span className="comment">{'// → "2026-04-30"'}</span>
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://day.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      <div className="demo-practical">
        <h3>Choosing a date library</h3>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Library</th>
              <th>Size</th>
              <th>API style</th>
              <th>Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>date-fns</code>
              </td>
              <td>Tree-shakeable (import only what you use)</td>
              <td>Standalone functions</td>
              <td>Most projects — comprehensive, modular</td>
            </tr>
            <tr>
              <td>
                <code>dayjs</code>
              </td>
              <td>~2KB core</td>
              <td>Chainable (like Moment.js)</td>
              <td>Minimal bundle, simple formatting</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="demo-practical" style={{ marginTop: 16 }}>
        <h3>The complete stack — what a production React app looks like</h3>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Need</th>
              <th>Library</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data fetching</td>
              <td>TanStack Query + Axios</td>
            </tr>
            <tr>
              <td>Global state</td>
              <td>Zustand</td>
            </tr>
            <tr>
              <td>Forms</td>
              <td>React Hook Form + Zod</td>
            </tr>
            <tr>
              <td>Data tables</td>
              <td>TanStack Table</td>
            </tr>
            <tr>
              <td>Routing</td>
              <td>React Router or TanStack Router</td>
            </tr>
            <tr>
              <td>Styling</td>
              <td>Tailwind CSS + shadcn/ui</td>
            </tr>
            <tr>
              <td>Animations</td>
              <td>Framer Motion</td>
            </tr>
            <tr>
              <td>Icons</td>
              <td>React Icons (Lucide)</td>
            </tr>
            <tr>
              <td>Notifications</td>
              <td>React Hot Toast</td>
            </tr>
            <tr>
              <td>Dates</td>
              <td>date-fns</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: 8, color: "#666" }}>
          In weeks 15-16, we'll build a mini project integrating several of
          these and deploy it to Vercel and Netlify.
        </p>
      </div>
    </div>
  );
}
