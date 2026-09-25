import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      <section className="home-container">
        <span className="feature-badge">🤖 AI Powered Code Review</span>

        <h1>Review Your Code with AI</h1>

        <p className="home-description">
          Upload your code and get AI-powered bug detection, security analysis,
          performance suggestions, code quality feedback, and interview
          questions.
        </p>

        <Link to="/review">
          <button className="review-button">🚀 Review Code</button>
        </Link>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">🐛</div>
            <h2>Bug Detection</h2>
            <p>Find potential bugs and problems in your code.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h2>Security Analysis</h2>
            <p>Identify possible security issues and vulnerabilities.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h2>AI Suggestions</h2>
            <p>Get useful suggestions to improve your code quality.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
