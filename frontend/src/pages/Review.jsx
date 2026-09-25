import { useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./Review.css";

function Review() {
  const location = useLocation();

  const [language, setLanguage] = useState("javascript");
  const [file, setFile] = useState(null);
  const [reviewResult, setReviewResult] = useState(
    location.state?.review || null,
  );
  const [loading, setLoading] = useState(false);

  function downloadPDF() {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("AutoShield AI", 20, 20);

    doc.setFontSize(16);
    doc.text("Code Review Report", 20, 30);

    doc.setFontSize(12);
    doc.text("AI-powered code analysis report", 20, 40);

    doc.text(`Code Quality Score: ${reviewResult.aiReview.score}/100`, 20, 55);
    doc.text(`Programming Language: ${reviewResult.aiReview.language}`, 20, 65);
    doc.text("Overall Assessment:", 20, 80);

    const assessment = doc.splitTextToSize(
      reviewResult.aiReview.overallAssessment,
      170,
    );

    doc.text(assessment, 20, 90);

    let y = 120;

    doc.setFontSize(14);
    doc.text("Bugs", 20, y);

    y += 10;

    doc.setFontSize(11);

    reviewResult.aiReview.bugs.forEach((bug, index) => {
      const bugText = `${index + 1}. ${bug.issue} - ${bug.solution}`;

      const lines = doc.splitTextToSize(bugText, 170);

      doc.text(lines, 20, y);

      y += lines.length * 7 + 5;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    // Security
    doc.setFontSize(14);
    doc.text("Security", 20, y);

    y += 10;

    doc.setFontSize(11);

    const securityLines = doc.splitTextToSize(
      reviewResult.aiReview.security,
      170,
    );

    doc.text(securityLines, 20, y);

    y += securityLines.length * 7 + 10;

    // Performance
    doc.setFontSize(14);
    doc.text("Performance", 20, y);

    y += 10;

    doc.setFontSize(11);

    const performanceLines = doc.splitTextToSize(
      reviewResult.aiReview.performance,
      170,
    );

    doc.text(performanceLines, 20, y);

    y += performanceLines.length * 7 + 10;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    // Suggestions
    doc.setFontSize(14);
    doc.text("Suggestions", 20, y);

    y += 10;

    doc.setFontSize(11);

    reviewResult.aiReview.suggestions.forEach((suggestion, index) => {
      const suggestionText = `${index + 1}. ${suggestion}`;

      const lines = doc.splitTextToSize(suggestionText, 170);

      doc.text(lines, 20, y);

      y += lines.length * 7 + 5;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    // Best Practices
    doc.setFontSize(14);
    doc.text("Best Practices", 20, y);

    y += 10;

    doc.setFontSize(11);

    reviewResult.aiReview.bestPractices.forEach((practice, index) => {
      const practiceText = `${index + 1}. ${practice}`;

      const lines = doc.splitTextToSize(practiceText, 170);

      doc.text(lines, 20, y);

      y += lines.length * 7 + 5;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    // What Was Done Well
    doc.setFontSize(14);
    doc.text("What Was Done Well", 20, y);

    y += 10;

    doc.setFontSize(11);

    reviewResult.aiReview.whatWasDoneWell.forEach((item, index) => {
      const itemText = `${index + 1}. ${item}`;

      const lines = doc.splitTextToSize(itemText, 170);

      doc.text(lines, 20, y);

      y += lines.length * 7 + 5;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("AutoShield-Code-Review.pdf");
  }

  async function handleReview() {
    if (!file) {
      alert("Please select a code file first.");
      return;
    }

    const formData = new FormData();
    formData.append("codeFile", file);
    formData.append("language", language);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://autoshield-ai-backend.onrender.com/api/review",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setReviewResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="review-page">
      <section className="review-container">
        <h1>Code Review</h1>

        <p>Upload your code and get AI-powered code analysis.</p>

        <div className="review-card">
          <label htmlFor="language">Programming Language</label>

          <select
            id="language"
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <label htmlFor="codeFile">Upload Your Code</label>

          <input
            id="codeFile"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            className="review-button"
            onClick={handleReview}
            disabled={loading}
          >
            {loading ? "Reviewing..." : "Review Code"}
          </button>

          {reviewResult && (
            <div className="review-result">
              <h2>AI Code Review 🤖</h2>

              {/* Code Quality Score */}
              <div className="result-section score-section">
                <h3>Code Quality Score</h3>

                <div className="score-value">
                  {reviewResult.aiReview.score}/100
                </div>

                <p>{reviewResult.aiReview.reason}</p>
              </div>

              {/* Language */}
              <div className="result-section">
                <h3>Programming Language</h3>
                <p>{reviewResult.aiReview.language}</p>
              </div>

              {/* Bugs */}
              <div className="result-section">
                <h3>Bugs</h3>

                {reviewResult.aiReview.bugs.length === 0 ? (
                  <p>No bugs found. Your code looks good.</p>
                ) : (
                  reviewResult.aiReview.bugs.map((bug, index) => (
                    <div className="bug-card" key={index}>
                      <p>
                        <strong>Severity:</strong> {bug.severity}
                      </p>

                      <p>
                        <strong>Issue:</strong> {bug.issue}
                      </p>

                      <p>
                        <strong>Why it matters:</strong> {bug.whyItMatters}
                      </p>

                      <p>
                        <strong>Beginner Explanation:</strong>{" "}
                        {bug.beginnerExplanation}
                      </p>

                      <p>
                        <strong>Solution:</strong> {bug.solution}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Code Quality */}
              <div className="result-section">
                <h3>Code Quality</h3>
                <p>{reviewResult.aiReview.codeQuality}</p>
              </div>

              {/* Security */}
              <div className="result-section security-section">
                <h3>Security</h3>
                <p>{reviewResult.aiReview.security}</p>
              </div>

              {/* Performance */}
              <div className="result-section performance-section">
                <h3>Performance</h3>
                <p>{reviewResult.aiReview.performance}</p>
              </div>

              {/* Suggestions */}
              <div className="result-section">
                <h3>Suggestions</h3>

                <ul className="suggestion-list">
                  {reviewResult.aiReview.suggestions.map(
                    (suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ),
                  )}
                </ul>
              </div>

              {/* Best Practices */}
              <div className="result-section">
                <h3>Best Practices</h3>

                <ul className="practice-list">
                  {reviewResult.aiReview.bestPractices.map(
                    (practice, index) => (
                      <li key={index}>{practice}</li>
                    ),
                  )}
                </ul>
              </div>

              {/* What Was Done Well */}
              <div className="result-section">
                <h3>What Was Done Well</h3>

                <ul className="practice-list">
                  {reviewResult.aiReview.whatWasDoneWell.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Overall Assessment */}
              <div className="result-section overall-section">
                <h3>Overall Assessment</h3>
                <p>{reviewResult.aiReview.overallAssessment}</p>
              </div>

              {/* Download PDF */}
              <div className="result-section">
                <button className="review-button" onClick={downloadPDF}>
                  📄 Download PDF Report
                </button>
              </div>

              {/* Backend Response */}
              <div className="result-section">
                <h3>Message</h3>
                <p>{reviewResult.message}</p>
              </div>

              <div className="result-section">
                <h3>Status</h3>
                <p>{reviewResult.status}</p>
              </div>

              {/* Uploaded Code */}
              <div className="result-section">
                <h3>Uploaded Code</h3>
                <pre>{reviewResult.code || reviewResult.uploadedCode}</pre>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Review;
