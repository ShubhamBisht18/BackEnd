import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function About() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to about page, {user?.name}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default About;
