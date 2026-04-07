import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  console.log("LAYOUT: rendered (this stays on screen for every page)");

  return (
    <div className="app-container">
      <header>
        <h1>CourseHub</h1>
        <nav className="navbar">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>CourseHub Demo — CS300 Week 12</p>
      </footer>
    </div>
  );
}

export default Layout;
