import { useEffect, useState } from "react";
import "./InterviewQuestions.css";

function InterviewQuestions() {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openHistory, setOpenHistory] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://autoshield-ai-backend.onrender.com/api/interview-questions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch history");
        }

        setHistory(data.questions || []);
      } catch (error) {
        console.error("Failed to fetch interview question history:", error);
      }
    }

    fetchHistory();
  }, []);

  async function handleGenerateQuestions() {
    if (!file) {
      alert("Please select a code file first.");
      return;
    }

    const formData = new FormData();
    formData.append("codeFile", file);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://autoshield-ai-backend.onrender.com/api/interview-questions",
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
        if (response.status === 429) {
          throw new Error("AI request limit reached. Please try again later.");
        }

        throw new Error(data.message || "Something went wrong");
      }

      const generatedQuestions = data.questions.questions;

      setQuestions(generatedQuestions);

      setHistory((prev) => [
        {
          fileName: file.name,
          questions: generatedQuestions,
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleHistory(index) {
    setOpenHistory((current) => (current === index ? null : index));
  }

  return (
    <main className="interview-page">
      <section className="interview-container">
        {/* Hero */}
        <div className="interview-header">
          <div className="interview-badge">
            <span className="badge-dot"></span>
            AI INTERVIEW PREP
          </div>

          <h1>
            Turn Your Code Into
            <span> Interview Questions.</span>
          </h1>

          <p>
            Upload your source code and let AutoShield AI create personalized
            interview questions based on your actual implementation.
          </p>
        </div>

        {/* Upload */}
        <section className="interview-upload-card">
          <div className="upload-content">
            <div className="upload-icon-wrapper">
              <div className="upload-icon">&lt;/&gt;</div>
            </div>

            <div className="upload-text">
              <span className="upload-label">STEP 01</span>

              <h2>Upload your source code</h2>

              <p>Supported files: Java, JavaScript, Python, C and C++.</p>
            </div>
          </div>

          <div className="upload-controls">
            <label htmlFor="codeFile" className="file-select-button">
              <span>+</span>
              {file ? "Change File" : "Choose Code File"}
            </label>

            <input
              id="codeFile"
              type="file"
              className="file-input"
              accept=".java,.js,.py,.cpp,.c"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file && (
              <div className="selected-file">
                <div className="selected-file-icon">&lt;/&gt;</div>

                <div className="selected-file-info">
                  <span>SELECTED FILE</span>
                  <strong>{file.name}</strong>
                </div>

                <div className="file-check">✓</div>
              </div>
            )}

            <button
              className="generate-button"
              onClick={handleGenerateQuestions}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Generating Questions...
                </>
              ) : (
                <>
                  Generate Questions
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Generated Questions */}
        {questions && (
          <section className="questions-section">
            <div className="questions-heading">
              <div>
                <div className="section-label">
                  <span></span>
                  AI GENERATED
                </div>

                <h2>Interview Questions</h2>

                <p>Questions generated from your uploaded source code.</p>
              </div>

              <div className="question-count">
                <strong>{questions.length}</strong>
                <span>QUESTIONS</span>
              </div>
            </div>

            <div className="questions-list">
              {questions.map((item, index) => (
                <article className="question-card" key={index}>
                  <div className="question-card-header">
                    <div className="question-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <span
                      className={`difficulty ${item.difficulty
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {item.difficulty}
                    </span>
                  </div>

                  <h3>{item.question}</h3>

                  <div className="answer-box">
                    <div className="answer-title">
                      <span>✦</span>
                      Suggested Answer
                    </div>

                    <p>{item.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Interview History */}
        {history.length > 0 && (
          <section className="questions-section history-section">
            <div className="questions-heading">
              <div>
                <div className="section-label">
                  <span></span>
                  SAVED SESSIONS
                </div>

                <h2>Interview History</h2>

                <p>
                  Your previous AI-generated interview preparation sessions.
                </p>
              </div>

              <div className="question-count">
                <strong>{history.length}</strong>
                <span>SESSIONS</span>
              </div>
            </div>

            <div className="history-list">
              {history.map((item, index) => {
                const isOpen = openHistory === index;

                return (
                  <article
                    className={`history-session ${
                      isOpen ? "history-session-open" : ""
                    }`}
                    key={item._id || index}
                  >
                    <button
                      className="history-session-header"
                      onClick={() => toggleHistory(index)}
                    >
                      <div className="history-session-left">
                        <div className="history-file-icon">&lt;/&gt;</div>

                        <div className="history-session-info">
                          <span>CODE FILE</span>
                          <h3>{item.fileName}</h3>

                          <div className="history-meta">
                            <span>{item.questions.length} Questions</span>
                            <span>•</span>
                            <span>AI Generated</span>
                          </div>
                        </div>
                      </div>

                      <div className="history-session-right">
                        <span className="history-session-number">
                          #{String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="history-toggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="history-session-content">
                        {item.questions.map((question, questionIndex) => (
                          <div className="history-question" key={questionIndex}>
                            <div className="history-question-top">
                              <span>
                                Question{" "}
                                {String(questionIndex + 1).padStart(2, "0")}
                              </span>

                              <span
                                className={`difficulty ${question.difficulty
                                  ?.toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                {question.difficulty}
                              </span>
                            </div>

                            <h4>{question.question}</h4>

                            <div className="answer-box">
                              <div className="answer-title">
                                <span>✦</span>
                                Suggested Answer
                              </div>

                              <p>{question.answer}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default InterviewQuestions;
