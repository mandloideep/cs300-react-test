import { useEffect } from "react";

function About() {
  useEffect(() => {
    console.log("ABOUT: mounted");
    return () => console.log("ABOUT: unmounted");
  }, []);

  return (
    <div>
      <h2>About CourseHub</h2>
      <p>
        CourseHub is a demo application built to learn React Router. It
        demonstrates client-side routing, navigation, dynamic routes, and nested
        layouts.
      </p>

      <h3>What This Demo Covers</h3>
      <ul>
        <li>BrowserRouter for enabling client-side routing</li>
        <li>Routes and Route for mapping URLs to components</li>
        <li>Link and NavLink for navigation without page reloads</li>
        <li>Nested routes with Layout and Outlet</li>
        <li>Dynamic routes with useParams</li>
        <li>Programmatic navigation with useNavigate</li>
        <li>404 catch-all routes</li>
      </ul>

      <h3>Built With</h3>
      <ul>
        <li>React 18</li>
        <li>React Router v7</li>
        <li>Vite</li>
      </ul>
    </div>
  );
}

export default About;
