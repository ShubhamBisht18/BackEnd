import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to the home page, {user?.name}</h2>

      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        <Link to="/men">
          <button>Men</button>
        </Link>
        <Link to="/women">
          <button>Women</button>
        </Link>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
