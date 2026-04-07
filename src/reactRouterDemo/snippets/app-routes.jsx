// App.jsx — Nested route structure with Layout
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      {/* Parent route — no path, just wraps children in Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
