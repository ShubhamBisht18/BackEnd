import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyResetOtp() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const onSubmit = async (data) => {
    try {
      await axios.post("/auth/verify-reset-otp", { ...data, email });
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 px-4">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Verify OTP to Reset Password
        </h2>
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
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyResetOtp;



