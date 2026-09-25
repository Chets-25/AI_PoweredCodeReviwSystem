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
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>Failed to load profile.</p>;
  }

  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1>{user.name}</h1>
          <p>AutoShield AI User</p>
        </div>

        <div className="profile-info">
          <div className="profile-item">
            <span>Full Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-item">
            <span>Email Address</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-item">
            <span>Member Since</span>
            <strong>{new Date(user.createdAt).toLocaleDateString()}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
