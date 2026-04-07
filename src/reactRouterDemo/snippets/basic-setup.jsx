// main.jsx — Step 1: Wrap your app in BrowserRouter
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

// App.jsx — Step 2: Define your routes
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import CourseList from "./components/CourseList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<CourseList />} />
    </Routes>
  );
}
