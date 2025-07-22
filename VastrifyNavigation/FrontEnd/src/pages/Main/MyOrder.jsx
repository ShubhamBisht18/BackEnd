import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MyOrder() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to MyOrder page, {user?.name}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MyOrder;
