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
      <div className="history-container">
        <h1>Review History</h1>

        <p className="history-description">
          View your previous AI code reviews.
        </p>

        {history.length === 0 ? (
          <div className="empty-history">
            <div className="empty-icon">📋</div>
            <h2>No Reviews Yet</h2>
            <p>No previous reviews found.</p>

            <Link to="/review" className="start-review-button">
              🚀 Start a Review
            </Link>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div key={item._id} className="history-card">
                <div className="history-card-content">
                  <h3>{item.fileName}</h3>

                  <p>
                    <strong>Language:</strong> {item.language}
                  </p>

                  <p className="success-message">
                    ✓ Review generated successfully
                  </p>
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
                  </Link>

                  <button
                    onClick={() => deleteReview(item._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default History;
