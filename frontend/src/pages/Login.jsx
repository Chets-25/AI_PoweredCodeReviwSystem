import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://autoshield-ai-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      navigate("/");
    } catch {
      alert("Server error. Please try again.");
    }
  };

  return (
    <main className="login-page">
      <div className="login-background">
        <div className="login-glow login-glow-one"></div>
        <div className="login-glow login-glow-two"></div>
      </div>

      <section className="login-card">
        <div className="login-brand">
          <div className="login-logo">⌬</div>

          <span>
            AutoShield <strong>AI</strong>
          </span>
        </div>

        <div className="login-header">
          <div className="login-badge">
            <span></span>
            SECURE ACCESS
          </div>

          <h1>
            Welcome <span>Back</span>
          </h1>

          <p>Sign in to continue your AI-powered code analysis journey.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>

            <div className="input-wrapper">
              <span className="input-icon">@</span>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <div className="input-wrapper">
              <span className="input-icon">•••</span>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button">
            <span>Login to AutoShield</span>
            <span className="button-arrow">→</span>
          </button>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <p className="register-link">
            New to AutoShield AI?
            <Link to="/register"> Create an account</Link>
          </p>
        </form>

        <div className="login-security">
          <span>✓</span>
          <p>Your account information is securely protected.</p>
        </div>
      </section>
    </main>
  );
}

export default Login;
