function DynamicRoutes() {
  return (
    <div className="demo-practical">
      <h3>Dynamic Routes with useParams</h3>
      <p>
        Dynamic routes let you use a single component for many different URLs.
        Instead of creating a separate route for each course, you define a
        pattern:
      </p>
      <pre className="demo-code-block">{`// The :id part is a URL parameter — it matches any value
<Route path="/courses/:id" element={<CourseDetail />} />`}</pre>

      <p>
        Inside the component, use the <code>useParams</code> hook to read the
        parameter:
      </p>
      <pre className="demo-code-block">{`import { useParams } from "react-router-dom";

function CourseDetail() {
  const { id } = useParams();
  // id is always a string! Convert if needed:
  const course = courses.find(c => c.id === Number(id));

  if (!course) return <p>Course not found!</p>;

  return <h2>{course.title}</h2>;
}`}</pre>

      <h4>Important Details</h4>
      <ul>
        <li>
          <code>useParams()</code> returns an object with all URL parameters
        </li>
        <li>
          Parameters are always <strong>strings</strong> — convert with{" "}
          <code>Number(id)</code> if your data uses numbers
        </li>
        <li>Always handle the case where the item isn't found (invalid ID)</li>
        <li>
          You can have multiple parameters:{" "}
          <code>/users/:userId/posts/:postId</code>
        </li>
      </ul>

      <p className="demo-note">
        Check the code panel to see <code>CourseDetail.jsx</code> — it reads the
        course ID from the URL, finds the matching course, and displays its
        details. It also shows Previous/Next navigation between courses.
      </p>
    </div>
  );
}

export default DynamicRoutes;
