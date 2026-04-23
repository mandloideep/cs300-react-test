export default function TablesRouting() {
  return (
    <div className="demo-subsection">
      <h3>C. Tables & Routing</h3>
      <p className="demo-note">
        Data tables and routing are two of the most complex UI problems. These
        headless libraries handle the logic while you control the UI.
      </p>

      {/* TanStack Table */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h4>TanStack Table</h4>
        <p>
          <strong>What:</strong> Headless, type-safe data table with sorting,
          filtering, pagination, grouping, and column resizing.
        </p>
        <p>
          <strong>Why:</strong> Building a data table from scratch is one of the
          hardest UI challenges. TanStack Table gives you all the logic
          (sorting, filtering, pagination) but zero UI — you render your own{" "}
          <code>&lt;table&gt;</code> or cards. Works with any styling approach.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install @tanstack/react-table
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="keyword">import</span> {"{"}
          <br />
          {"  "}useReactTable,
          <br />
          {"  "}getCoreRowModel,
          <br />
          {"  "}getSortedRowModel,
          <br />
          {"  "}flexRender,
          <br />
          {"}"} <span className="keyword">from</span>{" "}
          <span className="string">"@tanstack/react-table"</span>;
          <br />
          <br />
          <span className="keyword">const</span> columns = [
          <br />
          {"  "}
          {'{ accessorKey: "name", header: "Name" }'},
          <br />
          {"  "}
          {'{ accessorKey: "email", header: "Email" }'},
          <br />
          {"  "}
          {'{ accessorKey: "role", header: "Role" }'},
          <br />
          ];
          <br />
          <br />
          <span className="keyword">const</span> table ={" "}
          <span className="hook">useReactTable</span>({"{"}
          <br />
          {"  "}data,
          <br />
          {"  "}columns,
          <br />
          {"  "}getCoreRowModel: getCoreRowModel(),
          <br />
          {"  "}getSortedRowModel: getSortedRowModel(),
          <br />
          {"}"});
          <br />
          <br />
          <span className="comment">
            {
              "// Render your own <table> using table.getHeaderGroups() and table.getRowModel()"
            }
          </span>
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://tanstack.com/table/latest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      {/* TanStack Router */}
      <div className="card">
        <h4>TanStack Router</h4>
        <p>
          <strong>What:</strong> Fully type-safe routing with built-in search
          param validation, data loading, and code splitting.
        </p>
        <p>
          <strong>Why:</strong> React Router is great for most projects (and
          what we've used in this course). TanStack Router takes it further with
          full TypeScript safety — your route params, search params, and loader
          data are all type-checked. Best for larger TypeScript projects.
        </p>
        <div className="code-block" style={{ fontSize: "0.82rem" }}>
          <span className="comment">{"// Install"}</span>
          <br />
          npm install @tanstack/react-router
        </div>
        <div
          className="code-block"
          style={{ marginTop: 8, fontSize: "0.82rem" }}
        >
          <span className="keyword">import</span> {"{ createFileRoute }"}{" "}
          <span className="keyword">from</span>{" "}
          <span className="string">"@tanstack/react-router"</span>;
          <br />
          <br />
          <span className="comment">
            {"// File-based routing (like Next.js)"}
          </span>
          <br />
          <span className="keyword">export const</span> Route = createFileRoute(
          <span className="string">"/users/$userId"</span>)({"{"}
          <br />
          {"  "}loader: ({"{ params }"}) =&gt;
          <br />
          {"    "}fetchUser(params.userId),{" "}
          <span className="comment">{"// ← userId is typed!"}</span>
          <br />
          {"  "}component: <span className="component">UserPage</span>,
          <br />
          {"}"});
          <br />
          <br />
          <span className="keyword">function</span>{" "}
          <span className="component">UserPage</span>() {"{"}
          <br />
          {"  "}
          <span className="keyword">const</span> user = Route.useLoaderData();{" "}
          <span className="comment">{"// ← fully typed"}</span>
          <br />
          {"  "}
          <span className="keyword">return</span> &lt;h1&gt;{"{"}user.name{"}"}
          &lt;/h1&gt;;
          <br />
          {"}"}
        </div>
        <p style={{ marginTop: 8, fontSize: "0.85rem" }}>
          <a
            href="https://tanstack.com/router/latest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </p>
      </div>

      <div className="demo-practical">
        <h3>When to use what</h3>
        <ul>
          <li>
            <strong>TanStack Table:</strong> Any time you need sortable,
            filterable, paginated data — user lists, product catalogs, admin
            dashboards, analytics.
          </li>
          <li>
            <strong>React Router (what you know):</strong> Great for most
            projects. Widely adopted, huge community, simpler mental model.
          </li>
          <li>
            <strong>TanStack Router:</strong> Best when you're already using
            TypeScript and want end-to-end type safety for routes, params, and
            data loading.
          </li>
        </ul>
      </div>
    </div>
  );
}
