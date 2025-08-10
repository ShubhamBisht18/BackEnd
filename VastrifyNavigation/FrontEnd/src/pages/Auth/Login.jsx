import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black px-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-md hover:bg-yellow-500 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center space-y-2 text-sm text-gray-400">
          <p>
            <Link
              to="/forgot-password"
              state={{ email: emailValue }}
              className="hover:text-yellow-400 transition"
            >
              Forgot Password?
            </Link>
          </p>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-yellow-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

