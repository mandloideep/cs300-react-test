function NavigateAndSearch() {
  return (
    <div className="demo-practical">
      <h3>Programmatic Navigation with useNavigate</h3>
      <p>
        Sometimes you need to navigate in response to an event (button click,
        form submit) rather than a link click. Use <code>useNavigate</code>:
      </p>
      <pre className="demo-code-block">{`import { useNavigate } from "react-router-dom";

function CourseDetail() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Go back to previous page */}
      <button onClick={() => navigate(-1)}>← Back</button>

      {/* Navigate to a specific route */}
      <button onClick={() => navigate("/courses")}>
        All Courses
      </button>
    </div>
  );
}`}</pre>

      <h4>Common navigate() Patterns</h4>
      <table className="demo-table">
        <thead>
          <tr>
            <th>Call</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>navigate("/courses")</code>
            </td>
            <td>Go to /courses</td>
          </tr>
          <tr>
            <td>
              <code>navigate(-1)</code>
            </td>
            <td>Go back one page (like browser back button)</td>
          </tr>
          <tr>
            <td>
              <code>navigate(1)</code>
            </td>
            <td>Go forward one page</td>
          </tr>
          <tr>
            <td>
              <code>{`navigate("/login", { replace: true })`}</code>
            </td>
            <td>Replace current entry in history (can't go back)</td>
          </tr>
        </tbody>
      </table>

      <h3>Query Strings with useSearchParams</h3>
      <p>
        Query strings are the <code>?key=value</code> part of a URL. They're
        great for search, filters, and pagination:
      </p>
      <pre className="demo-code-block">{`import { useSearchParams } from "react-router-dom";

function CourseList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  function handleSearch(e) {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });  // URL becomes /courses?q=react
    } else {
      setSearchParams({});            // URL becomes /courses
    }
  }

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return <input value={query} onChange={handleSearch} />;
}`}</pre>

      <p className="demo-note">
        <code>useSearchParams</code> works like <code>useState</code> but syncs
        with the URL. This means the search state is shareable — you can send
        someone a link like <code>/courses?q=react</code> and they'll see the
        filtered results. Check the code panel to see the full implementation.
      </p>
    </div>
  );
}

export default NavigateAndSearch;
