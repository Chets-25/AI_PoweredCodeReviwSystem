import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">⌬</span>

            <span>
              AutoShield <strong>AI</strong>
            </span>
          </Link>

          <p>
            AI-powered code analysis built to help developers write better,
            safer, and cleaner code.
          </p>
        </div>

        <div className="footer-links">
          <span>Platform</span>

          <Link to="/">Home</Link>
          <Link to="/review">Review</Link>
          <Link to="/history">History</Link>
          <Link to="/interview-questions">Interview</Link>
        </div>

        <div className="footer-links">
          <span>Account</span>

          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 AutoShield AI. All rights reserved.</p>

        <span>AI Code Intelligence Platform</span>
      </div>
    </footer>
  );
}

export default Footer;
