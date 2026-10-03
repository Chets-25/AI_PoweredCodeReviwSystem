import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="notfound-page">
      <section className="notfound-card">
        <div className="notfound-code">404</div>

        <h1>
          Page <span>Not Found</span>
        </h1>

        <p>
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link to="/" className="notfound-button">
          Back to Home
          <span>→</span>
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
