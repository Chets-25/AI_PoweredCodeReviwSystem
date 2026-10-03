import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <h1>
          Smarter Code. <span>Better Software.</span>
        </h1>

        <p>
          AutoShield AI is an AI-powered code analysis platform designed to help
          developers identify issues, improve code quality, and prepare for
          technical interviews.
        </p>

        <div className="about-actions">
          <Link to="/review" className="about-primary-button">
            Review Your Code
            <span>→</span>
          </Link>

          <Link to="/interview-questions" className="about-secondary-button">
            Practice Interviews
          </Link>
        </div>
      </section>

      <section className="about-features">
        <article className="about-feature-card">
          <div className="about-feature-icon">&lt;/&gt;</div>

          <h2>AI Code Review</h2>

          <p>
            Analyze your code for bugs, security concerns, performance issues,
            and overall code quality.
          </p>
        </article>

        <article className="about-feature-card">
          <div className="about-feature-icon">✓</div>

          <h2>Developer Focused</h2>

          <p>
            Get practical suggestions that help you understand problems and
            improve your implementation.
          </p>
        </article>

        <article className="about-feature-card">
          <div className="about-feature-icon">?</div>

          <h2>Interview Preparation</h2>

          <p>
            Generate technical interview questions from your uploaded code and
            practice explaining your implementation.
          </p>
        </article>
      </section>

      <section className="about-platform">
        <div>
          <h2>
            Everything you need for <span>better development.</span>
          </h2>
        </div>

        <p>
          From code analysis to interview preparation, AutoShield AI brings
          useful developer tools together in one platform.
        </p>
      </section>
    </main>
  );
}

export default About;
