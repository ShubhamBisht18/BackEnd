import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Men() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to men page, {user?.name}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Men;
