import { useForm } from "react-hook-form";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const emailValue = watch("email");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/auth/login", data);
      setUser(res.data.user);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" type="email" {...register("email")} required /> <br />
        <input placeholder="Password" type="password" {...register("password")} required /> <br />
        <button type="submit">Login</button>
      </form>

      {/* ✅ Correct Link with state */}
      <p>
        <Link
          to="/forgot-password"
          state={{ email: emailValue }}
        >
          Forgot Password?
        </Link>
      </p>

      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
