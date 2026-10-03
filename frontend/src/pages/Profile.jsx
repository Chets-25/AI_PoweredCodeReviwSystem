import { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://autoshield-ai-backend.onrender.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setUser(data.user);
      } catch (error) {
        console.error("Profile error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          <span className="profile-spinner"></span>
          <p>Loading profile...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-error">
          <div className="error-icon">!</div>
          <h2>Unable to load profile</h2>
          <p>Please try refreshing the page.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <section className="profile-container">
        {/* Header */}
        <div className="profile-title">
          <h1>
            Your <span>Profile</span>
          </h1>

          <p>Manage and view your AutoShield AI account information.</p>
        </div>

        {/* Profile card */}
        <section className="profile-card">
          <div className="profile-top">
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="profile-heading">
              <h2>{user.name}</h2>
              <p>AutoShield AI User</p>
            </div>
          </div>

          <div className="profile-divider"></div>

          {/* Account information */}
          <div className="profile-section-header">
            <h3>Personal Information</h3>
          </div>

          <div className="profile-info">
            <div className="profile-item">
              <div className="profile-item-icon">@</div>

              <div>
                <span>Full Name</span>
                <strong>{user.name}</strong>
              </div>
            </div>

            <div className="profile-item">
              <div className="profile-item-icon">@</div>

              <div>
                <span>Email Address</span>
                <strong>{user.email}</strong>
              </div>
            </div>

            <div className="profile-item">
              <div className="profile-item-icon">◷</div>

              <div>
                <span>Member Since</span>
                <strong>{new Date(user.createdAt).toLocaleDateString()}</strong>
              </div>
            </div>

            <div className="profile-item">
              <div className="profile-item-icon">✓</div>

              <div>
                <span>Account Status</span>
                <strong className="status-text">Verified Account</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="profile-footer-card">
          <div className="footer-icon">&lt;/&gt;</div>

          <div>
            <h3>AutoShield AI</h3>
            <p>AI-powered code analysis and interview preparation platform.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
