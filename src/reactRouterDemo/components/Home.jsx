import { useEffect } from "react";
import { Link } from "react-router-dom";
import courses from "../data/courses";

function Home() {
  useEffect(() => {
    console.log("HOME: mounted");
    return () => console.log("HOME: unmounted");
  }, []);

  const featured = courses.slice(0, 3);

  return (
    <div>
      <section className="hero">
        <h2>Welcome to CourseHub</h2>
        <p>
          Explore our catalog of web development courses. Learn HTML, CSS,
          JavaScript, React, and more.
        </p>
        <Link to="/courses" className="btn btn-primary">
          Browse All Courses
        </Link>
      </section>

      <section>
        <h3>Featured Courses</h3>
        <div className="course-grid">
          {featured.map((course) => (
            <div key={course.id} className="course-card">
              <span className="course-badge">{course.level}</span>
              <h4>{course.title}</h4>
              <p>{course.description.slice(0, 80)}...</p>
              <Link to={`/courses/${course.id}`} className="card-link">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
