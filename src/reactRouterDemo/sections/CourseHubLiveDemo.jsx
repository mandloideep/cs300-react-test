import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import About from "../components/About";
import CourseList from "../components/CourseList";
import CourseDetail from "../components/CourseDetail";
import NotFound from "../components/NotFound";

function RouteIndicator() {
  const location = useLocation();
  const fullPath = location.pathname + (location.search ? location.search : "");

  return (
    <div className="route-indicator">
      <span className="route-indicator-label">Current Route:</span>
      <code className="route-indicator-path">{fullPath}</code>
    </div>
  );
}

function CourseHubLiveDemo() {
  return (
    <div className="router-demo-container">
      <p className="demo-note">
        This is a fully interactive demo running inside a{" "}
        <code>MemoryRouter</code>. Click around — the navigation, search, course
        details, and 404 page all work. Watch the route indicator bar and the
        browser console for lifecycle logs.
      </p>
      <MemoryRouter initialEntries={["/"]}>
        <RouteIndicator />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </div>
  );
}

export default CourseHubLiveDemo;
