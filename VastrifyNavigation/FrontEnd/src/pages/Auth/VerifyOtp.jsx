import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function VerifyOtp() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const email = location.state?.email;

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/auth/verify-otp", { ...data, email });
      setUser(res.data.user);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-900 via-indigo-900 to-blue-900 px-4">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold mb-6 text-center">Verify OTP</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block mb-2 font-medium">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              placeholder="6-digit OTP"
              {...register("otp")}
              required
              maxLength={6}
              className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-md font-semibold transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
