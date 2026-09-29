import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="feature-badge">
            <span className="badge-dot"></span>
            AI-Powered Code Intelligence
          </div>

          <h1>
            Write Better Code.
            <span> Ship With Confidence.</span>
          </h1>

          <p className="home-description">
            AutoShield AI analyzes your code for bugs, security risks,
            performance issues, and code quality — helping you write cleaner and
            more reliable software.
          </p>

          <div className="hero-actions">
            <Link to="/review" className="primary-action">
              Review My Code
              <span>→</span>
            </Link>

            <Link to="/interview-questions" className="secondary-action">
              Practice Interviews
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>AI</strong>
              <span>Powered Analysis</span>
            </div>

            <div className="stat-divider"></div>

            <div>
              <strong>8+</strong>
              <span>Analysis Areas</span>
            </div>

            <div className="stat-divider"></div>

            <div>
              <strong>24/7</strong>
              <span>Available</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-window">
            <div className="window-header">
              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span className="window-title">code-review.js</span>
            </div>

            <div className="code-content">
              <p>
                <span className="line-number">01</span>
                <span className="keyword">function</span>{" "}
                <span className="function-name">reviewCode</span>() {"{"}
              </p>

              <p>
                <span className="line-number">02</span>
                &nbsp;&nbsp;<span className="keyword">const</span> result ={" "}
                <span className="string">"analyzing..."</span>;
              </p>

              <p>
                <span className="line-number">03</span>
                &nbsp;&nbsp;<span className="keyword">return</span> result;
              </p>

              <p>
                <span className="line-number">04</span>
                {"}"}
              </p>

              <div className="ai-result">
                <div className="result-icon">✓</div>

                <div>
                  <strong>AI Analysis Complete</strong>
                  <span>Code quality: Excellent</span>
                </div>

                <div className="score">92</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span>POWERFUL ANALYSIS</span>
          <h2>Everything your code needs</h2>
          <p>
            Get intelligent feedback across the most important areas of software
            quality.
          </p>
        </div>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">⌁</div>
            <h2>Bug Detection</h2>
            <p>
              Find logical errors and potential bugs before they become real
              problems.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">◇</div>
            <h2>Security Analysis</h2>
            <p>
              Identify potential vulnerabilities and security risks in your
              code.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">↗</div>
            <h2>Performance</h2>
            <p>
              Discover performance issues and practical ways to make your code
              more efficient.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h2>AI Suggestions</h2>
            <p>
              Receive practical recommendations to improve readability,
              maintainability, and quality.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
