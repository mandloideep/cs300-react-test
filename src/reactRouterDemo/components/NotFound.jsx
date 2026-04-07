import { useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound() {
  useEffect(() => {
    console.log("NOT FOUND: mounted (user hit an invalid URL)");
    return () => console.log("NOT FOUND: unmounted");
  }, []);

  return (
    <div className="not-found">
      <h2>404 — Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
