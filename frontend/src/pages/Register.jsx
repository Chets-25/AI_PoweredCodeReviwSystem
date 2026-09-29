import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://autoshield-ai-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
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

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch {
      alert("Server error. Please try again.");
    }
  };

  return (
    <main className="register-page">
      <div className="register-background">
        <div className="register-glow register-glow-one"></div>
        <div className="register-glow register-glow-two"></div>
      </div>

      <section className="register-card">
        <div className="register-brand">
          <div className="register-logo">⌬</div>

          <span>
            AutoShield <strong>AI</strong>
          </span>
        </div>

        <div className="register-header">
          <div className="register-badge">
            <span></span>
            GET STARTED
          </div>

          <h1>
            Create <span>Account</span>
          </h1>

          <p>Join AutoShield AI and start analyzing your code with AI.</p>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>

            <div className="input-wrapper">
              <span className="input-icon">✦</span>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="register-button">
            <span>Create AutoShield Account</span>
            <span className="button-arrow">→</span>
          </button>

          <p className="login-link">
            Already have an account?
            <Link to="/login"> Login here</Link>
          </p>
        </form>

        <div className="register-security">
          <span>✓</span>
          <p>Your account information is securely protected.</p>
        </div>
      </section>
    </main>
  );
}

export default Register;
