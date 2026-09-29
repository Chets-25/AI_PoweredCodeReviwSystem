import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-glow notfound-glow-one"></div>
      <div className="notfound-glow notfound-glow-two"></div>

      <section className="notfound-card">
        <div className="notfound-code">404</div>

        <div className="notfound-badge">
          <span></span>
          PAGE NOT FOUND
        </div>

        <h1>
          Looks like you took a <span>wrong turn.</span>
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
