import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import courses from "../data/courses";

function CourseList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    console.log("COURSE LIST: mounted");
    return () => console.log("COURSE LIST: unmounted");
  }, []);

  const filtered = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase()),
  );

  function handleSearch(e) {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div>
      <h2>All Courses</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search courses..."
          value={query}
          onChange={handleSearch}
        />
        {query && (
          <span className="search-count">
            {filtered.length} of {courses.length} courses
          </span>
        )}
      </div>

      <div className="course-grid">
        {filtered.map((course) => (
          <div key={course.id} className="course-card">
            <span className="course-badge">{course.level}</span>
            <span className="course-category">{course.category}</span>
            <h3>{course.title}</h3>
            <p>{course.description.slice(0, 100)}...</p>
            <p className="course-instructor">Instructor: {course.instructor}</p>
            <Link to={`/courses/${course.id}`} className="card-link">
              View Details →
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="no-results">No courses found matching "{query}"</p>
      )}
    </div>
  );
}

export default CourseList;
