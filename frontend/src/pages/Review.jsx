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
      <section className="review-hero">
        <div className="review-heading">
          <div className="review-badge">
            <span className="badge-dot"></span>
            AI Code Intelligence
          </div>

          <h1>
            Review Your Code.
            <span> Improve With AI.</span>
          </h1>

          <p>
            Upload your source code and let AutoShield AI analyze bugs,
            security, performance, and code quality.
          </p>
        </div>
      </section>

      <section className="review-container">
        <div className="upload-card">
          <div className="card-header">
            <div>
              <span className="card-label">CODE ANALYZER</span>
              <h2>Start a new review</h2>
              <p>
                Select your programming language and upload your source file.
              </p>
            </div>

            <div className="card-icon">⌬</div>
          </div>

          <div className="form-grid">
            <div className="input-group">
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
            </div>

            <div className="input-group">
              <label htmlFor="codeFile">Upload Your Code</label>

              <div className="file-upload">
                <input
                  id="codeFile"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <label htmlFor="codeFile" className="file-upload-label">
                  <span className="upload-icon">↑</span>

                  <span>
                    <strong>{file ? file.name : "Choose a code file"}</strong>

                    <small>
                      {file
                        ? "File selected successfully"
                        : "Click to browse your files"}
                    </small>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <button
            className="review-button"
            onClick={handleReview}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Analyzing Code...
              </>
            ) : (
              <>
                Analyze Code
                <span>→</span>
              </>
            )}
          </button>

          <div className="analysis-info">
            <span>✦</span>
            AI analysis checks bugs, security, performance and quality.
          </div>
        </div>

        {reviewResult && (
          <div className="review-result">
            <div className="result-header">
              <div>
                <span className="card-label">ANALYSIS REPORT</span>
                <h2>AI Code Review</h2>
                <p>Detailed feedback generated by AutoShield AI.</p>
              </div>

              <div className="result-status">
                <span className="status-dot"></span>
                Analysis Complete
              </div>
            </div>

            <div className="score-overview">
              <div className="score-circle">
                <div>
                  <strong>{reviewResult.aiReview.score}</strong>
                  <span>/100</span>
                </div>
              </div>

              <div className="score-info">
                <span className="score-label">CODE QUALITY SCORE</span>

                <h3>
                  {reviewResult.aiReview.score >= 80
                    ? "Strong Code Quality"
                    : reviewResult.aiReview.score >= 60
                      ? "Good, With Improvements Needed"
                      : "Needs Improvement"}
                </h3>

                <p>{reviewResult.aiReview.reason}</p>
              </div>

              <div className="language-badge">
                <span>Language</span>
                <strong>{reviewResult.aiReview.language}</strong>
              </div>
            </div>

            <div className="result-grid">
              <div className="result-section">
                <div className="section-title">
                  <span className="section-icon bug-icon">!</span>
                  <div>
                    <span>CODE ANALYSIS</span>
                    <h3>Bugs</h3>
                  </div>
                </div>

                {reviewResult.aiReview.bugs.length === 0 ? (
                  <div className="success-message">
                    <span>✓</span>
                    <p>No bugs found. Your code looks good.</p>
                  </div>
                ) : (
                  <div className="bug-list">
                    {reviewResult.aiReview.bugs.map((bug, index) => (
                      <div className="bug-card" key={index}>
                        <div className="bug-top">
                          <span className="bug-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="severity-badge">{bug.severity}</span>
                        </div>

                        <p>
                          <strong>Issue</strong>
                          {bug.issue}
                        </p>

                        <p>
                          <strong>Why it matters</strong>
                          {bug.whyItMatters}
                        </p>

                        <p>
                          <strong>Beginner explanation</strong>
                          {bug.beginnerExplanation}
                        </p>

                        <div className="solution-box">
                          <strong>Solution</strong>
                          <p>{bug.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="result-section">
                <div className="section-title">
                  <span className="section-icon">✦</span>
                  <div>
                    <span>QUALITY</span>
                    <h3>Code Quality</h3>
                  </div>
                </div>

                <p>{reviewResult.aiReview.codeQuality}</p>
              </div>

              <div className="result-section">
                <div className="section-title">
                  <span className="section-icon security-icon">◇</span>
                  <div>
                    <span>PROTECTION</span>
                    <h3>Security</h3>
                  </div>
                </div>

                <p>{reviewResult.aiReview.security}</p>
              </div>

              <div className="result-section">
                <div className="section-title">
                  <span className="section-icon performance-icon">↗</span>
                  <div>
                    <span>OPTIMIZATION</span>
                    <h3>Performance</h3>
                  </div>
                </div>

                <p>{reviewResult.aiReview.performance}</p>
              </div>

              <div className="result-section">
                <div className="section-title">
                  <span className="section-icon">✦</span>
                  <div>
                    <span>RECOMMENDATIONS</span>
                    <h3>Suggestions</h3>
                  </div>
                </div>

                <ul className="suggestion-list">
                  {reviewResult.aiReview.suggestions.map(
                    (suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ),
                  )}
                </ul>
              </div>

              <div className="result-section">
                <div className="section-title">
                  <span className="section-icon">✓</span>
                  <div>
                    <span>DEVELOPMENT</span>
                    <h3>Best Practices</h3>
                  </div>
                </div>

                <ul className="practice-list">
                  {reviewResult.aiReview.bestPractices.map(
                    (practice, index) => (
                      <li key={index}>{practice}</li>
                    ),
                  )}
                </ul>
              </div>

              <div className="result-section">
                <div className="section-title">
                  <span className="section-icon">★</span>
                  <div>
                    <span>POSITIVE FINDINGS</span>
                    <h3>What Was Done Well</h3>
                  </div>
                </div>

                <ul className="practice-list">
                  {reviewResult.aiReview.whatWasDoneWell.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="result-section overall-section">
                <div className="section-title">
                  <span className="section-icon">◈</span>
                  <div>
                    <span>AI SUMMARY</span>
                    <h3>Overall Assessment</h3>
                  </div>
                </div>

                <p>{reviewResult.aiReview.overallAssessment}</p>
              </div>
            </div>

            <div className="download-section">
              <div>
                <span className="card-label">REPORT EXPORT</span>
                <h3>Save your analysis</h3>
                <p>Download a PDF report of this code review.</p>
              </div>

              <button className="download-button" onClick={downloadPDF}>
                📄 Download PDF Report
              </button>
            </div>

            <div className="technical-details">
              <div>
                <span>MESSAGE</span>
                <p>{reviewResult.message}</p>
              </div>

              <div>
                <span>STATUS</span>
                <p>{reviewResult.status}</p>
              </div>

              <div className="uploaded-code">
                <span>UPLOADED CODE</span>
                <pre>{reviewResult.code || reviewResult.uploadedCode}</pre>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Review;
