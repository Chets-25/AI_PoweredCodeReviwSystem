import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./History.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://autoshield-ai-backend.onrender.com/api/reviews", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Review History:", data);
        setHistory(data.reviews);
      })
      .catch((error) => {
        console.error("Error fetching review history:", error);
      });
  }, []);

  async function deleteReview(id) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://autoshield-ai-backend.onrender.com/api/reviews/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.status === "success") {
        setHistory(history.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }

  return (
    <main className="history-page">
      <section className="history-hero">
        <div>
          <div className="history-badge">
            <span></span>
            YOUR ANALYSIS HISTORY
          </div>

          <h1>
            Review <span>History</span>
          </h1>

          <p>
            View and manage your previous AI-powered code reviews in one place.
          </p>
        </div>

        <Link to="/review" className="new-review-button">
          <span>+</span>
          New Review
        </Link>
      </section>

      {history.length === 0 ? (
        <section className="empty-history">
          <div className="empty-icon">⌬</div>

          <span className="empty-label">NO REVIEWS FOUND</span>

          <h2>Your review history is empty</h2>

          <p>
            Upload your first code file and let AutoShield AI analyze it for
            bugs, security, performance, and quality.
          </p>

          <Link to="/review" className="start-review-button">
            Start Your First Review
            <span>→</span>
          </Link>
        </section>
      ) : (
        <section className="history-content">
          <div className="history-summary">
            <div>
              <span className="summary-label">TOTAL REVIEWS</span>
              <strong>{history.length}</strong>
            </div>

            <div className="summary-divider"></div>

            <div>
              <span className="summary-label">AI ANALYSIS</span>
              <strong>Completed</strong>
            </div>
          </div>

          <div className="history-list">
            {history.map((item, index) => (
              <article key={item._id} className="history-card">
                <div className="history-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="history-file-icon">&lt;/&gt;</div>

                <div className="history-card-content">
                  <div className="file-heading">
                    <h3>{item.fileName}</h3>

                    <span className="completed-badge">
                      <span></span>
                      Completed
                    </span>
                  </div>

                  <div className="history-meta">
                    <span>
                      <small>LANGUAGE</small>
                      {item.language}
                    </span>

                    <span>
                      <small>TYPE</small>
                      AI Code Review
                    </span>
                  </div>
                </div>

                <div className="history-actions">
                  <Link
                    to="/review"
                    state={{
                      review: {
                        message: item.message,
                        status: item.status,
                        code: item.uploadedCode,
                        aiReview: item.reviewResult,
                      },
                    }}
                    className="view-review-button"
                  >
                    View Review
                    <span>→</span>
                  </Link>

                  <button
                    onClick={() => deleteReview(item._id)}
                    className="delete-button"
                    title="Delete review"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default History;
