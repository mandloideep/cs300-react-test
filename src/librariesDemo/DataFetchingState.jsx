export default function DataFetchingState() {
  return (
    <div className="demo-subsection">
      <h3>A. Data Fetching & State Management</h3>
      <p className="demo-note">
        These libraries handle how your app fetches data from APIs, caches it,
        and manages global state. They replace the manual{" "}
        <code>useEffect + useState</code> pattern you've been writing.
      </p>

      {/* TanStack Query */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h4>TanStack Query (React Query)</h4>
        <p>
          <strong>What:</strong> Async state management — fetching, caching,
          syncing, and updating server data.
        </p>
        <p>
          <strong>Why:</strong> Replaces manual <code>useEffect</code> +{" "}
          <code>useState</code> for API calls. Handles caching, background
          refetching, stale-while-revalidate, pagination, optimistic updates —
          all out of the box.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install @tanstack/react-query
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="comment">
            {"// Usage — replaces useEffect + useState + loading/error states"}
          </span>
          <br />
          <span className="keyword">import</span> {"{ useQuery }"}{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"@tanstack/react-query"</span>;
          <br />
          <br />
          <span className="keyword">function</span>{" "}
          <span className="component">TodoList</span>() {"{"}
          <br />
          {"  "}
          <span className="keyword">const</span> {"{ data, isLoading, error }"}{" "}
          = <span className="hook">useQuery</span>({"{"}
          <br />
          {"    "}queryKey: [<span className="string">"todos"</span>],
          <br />
          {"    "}queryFn: () =&gt;
          <br />
          {"      "}fetch(<span className="string">"/api/todos"</span>).then(r
          =&gt; r.json()),
          <br />
          {"  "}
          {"}"});
          <br />
          <br />
          {"  "}
          <span className="keyword">if</span> (isLoading){" "}
          <span className="keyword">return</span> &lt;p&gt;Loading...&lt;/p&gt;;
          <br />
          {"  "}
          <span className="keyword">if</span> (error){" "}
          <span className="keyword">return</span> &lt;p&gt;Error!&lt;/p&gt;;
          <br />
          {"  "}
          <span className="keyword">return</span> &lt;ul&gt;{"{"}data.map(t
          =&gt; &lt;li&gt;{"{"}t.title{"}"}&lt;/li&gt;){"}"}&lt;/ul&gt;;
          <br />
          {"}"}
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://tanstack.com/query/latest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      {/* Zustand */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h4>Zustand</h4>
        <p>
          <strong>What:</strong> Lightweight global state management — a simpler
          alternative to Redux or Context API.
        </p>
        <p>
          <strong>Why:</strong> Minimal boilerplate (no providers, no reducers),
          works outside of React components, tiny bundle size (~1KB). Perfect
          when Context gets unwieldy but Redux is overkill.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install zustand
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="comment">{"// Create a store"}</span>
          <br />
          <span className="keyword">import</span> {"{ create }"}{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"zustand"</span>;
          <br />
          <br />
          <span className="keyword">const</span> useCartStore ={" "}
          <span className="hook">create</span>((set) =&gt; ({"{"}
          <br />
          {"  "}items: [],
          <br />
          {"  "}addItem: (item) =&gt; set((state) =&gt; ({"{"}
          <br />
          {"    "}items: [...state.items, item]
          <br />
          {"  "}
          {"}"})),
          <br />
          {"  "}clearCart: () =&gt; set({"{ items: [] }"}),
          <br />
          {"}"}));
          <br />
          <br />
          <span className="comment">
            {"// Use in any component — no Provider needed"}
          </span>
          <br />
          <span className="keyword">function</span>{" "}
          <span className="component">CartBadge</span>() {"{"}
          <br />
          {"  "}
          <span className="keyword">const</span> count = useCartStore((s) =&gt;
          s.items.length);
          <br />
          {"  "}
          <span className="keyword">return</span> &lt;span&gt;Cart ({"{"}count
          {"}"}
          )&lt;/span&gt;;
          <br />
          {"}"}
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://zustand-demo.pmnd.rs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      {/* Axios */}
      <div className="card">
        <h4>Axios</h4>
        <p>
          <strong>What:</strong> Promise-based HTTP client with interceptors,
          automatic JSON transforms, and request cancellation.
        </p>
        <p>
          <strong>Why:</strong> Cleaner API than <code>fetch()</code> —
          automatic error handling for non-2xx responses, request/response
          interceptors (great for auth tokens), and built-in timeout support.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install axios
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="keyword">import</span> axios{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"axios"</span>;
          <br />
          <br />
          <span className="comment">{"// Create a configured instance"}</span>
          <br />
          <span className="keyword">const</span> api = axios.create({"{"}
          <br />
          {"  "}baseURL:{" "}
          <span className="string">"https://api.example.com"</span>,
          <br />
          {"  "}timeout: 5000,
          <br />
          {"}"});
          <br />
          <br />
          <span className="comment">{"// Use it"}</span>
          <br />
          <span className="keyword">const</span> {"{ data }"} ={" "}
          <span className="keyword">await</span> api.get(
          <span className="string">"/users"</span>);
          <br />
          <span className="keyword">await</span> api.post(
          <span className="string">"/users"</span>, {"{ name, email }"});
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://axios-http.com/docs/intro"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      <div className="demo-practical">
        <h3>How these work together</h3>
        <ul>
          <li>
            <strong>TanStack Query + Axios:</strong> Use Axios as the{" "}
            <code>queryFn</code> in TanStack Query for clean data fetching with
            caching.
          </li>
          <li>
            <strong>
              Zustand for client state, TanStack Query for server state:
            </strong>{" "}
            Keep them separate — Zustand for UI state (modals, filters),
            TanStack Query for API data.
          </li>
        </ul>
      </div>
    </div>
  );
}
