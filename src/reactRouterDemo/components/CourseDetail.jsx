import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import courses from "../data/courses";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === Number(id));

  useEffect(() => {
    console.log(`COURSE DETAIL: mounted for course id=${id}`);
    return () => console.log(`COURSE DETAIL: unmounted for course id=${id}`);
  }, [id]);

  if (!course) {
    return (
      <div>
        <h2>Course Not Found</h2>
        <p>No course exists with ID "{id}".</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/courses")}
        >
          ← Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => navigate("/courses")}
      >
        ← Back to Courses
      </button>

      <div className="course-detail">
        <span className="course-badge">{course.level}</span>
        <span className="course-category">{course.category}</span>
        <h2>{course.title}</h2>
        <p className="course-description">{course.description}</p>
        <p className="course-instructor">
          <strong>Instructor:</strong> {course.instructor}
        </p>
      </div>

      <div className="course-nav">
        {course.id > 1 && (
          <Link to={`/courses/${course.id - 1}`} className="card-link">
            ← Previous Course
          </Link>
        )}
        {course.id < courses.length && (
          <Link to={`/courses/${course.id + 1}`} className="card-link">
            Next Course →
          </Link>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;
