import { useEffect, useState } from "react";
import "./InterviewQuestions.css";

function InterviewQuestions() {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch saved interview question history from MongoDB
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

      // Show newly generated questions
      setQuestions(data.questions.questions);

      // Add newly generated questions to history immediately
      setHistory((prev) => [
        {
          fileName: file.name,
          questions: data.questions.questions,
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

  return (
    <main className="interview-page">
      <section className="interview-container">
        {/* Header */}
        <div className="interview-header">
          <span className="feature-badge">🤖 AI Powered</span>

          <h1>AI Interview Question Generator</h1>

          <p>
            Upload your code and let AI generate interview questions based on
            your actual code.
          </p>
        </div>

        {/* Upload Card */}
        <div className="upload-card">
          <div className="upload-icon">📄</div>

          <h2>Upload Your Code</h2>

          <p>Upload a Java, JavaScript, Python, or C++ file.</p>

          <label htmlFor="codeFile" className="file-label">
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
              <span>📎</span>
              <span>{file.name}</span>
            </div>
          )}

          <button
            className="generate-button"
            onClick={handleGenerateQuestions}
            disabled={loading}
          >
            {loading ? "⏳ Generating..." : "✨ Generate Questions"}
          </button>
        </div>

        {/* Newly Generated Questions */}
        {questions && (
          <section className="questions-section">
            <div className="questions-heading">
              <div>
                <span className="section-label">AI ANALYSIS</span>
                <h2>Generated Interview Questions</h2>
              </div>

              <span className="question-count">
                {questions.length} Questions
              </span>
            </div>

            <div className="questions-list">
              {questions.map((item, index) => (
                <article className="question-card" key={index}>
                  <div className="question-top">
                    <span className="question-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

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
                    <div className="answer-title">💡 Answer</div>

                    <p>{item.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* MongoDB History */}
        {history.length > 0 && (
          <section className="questions-section">
            <div className="questions-heading">
              <div>
                <span className="section-label">MONGODB HISTORY</span>
                <h2>Previous Interview Questions</h2>
              </div>

              <span className="question-count">{history.length} Sessions</span>
            </div>

            <div className="questions-list">
              {history.map((item, index) => (
                <article className="question-card" key={item._id || index}>
                  <div className="question-top">
                    <span className="question-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="difficulty">{item.fileName}</span>
                  </div>

                  {item.questions.map((question, questionIndex) => (
                    <div key={questionIndex}>
                      <h3>{question.question}</h3>

                      <div className="answer-box">
                        <div className="answer-title">💡 Answer</div>

                        <p>{question.answer}</p>

                        <span
                          className={`difficulty ${question.difficulty
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {question.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default InterviewQuestions;
