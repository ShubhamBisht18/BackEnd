import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ForgotPassword() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const passedEmail = location.state?.email;

  useEffect(() => {
    if (passedEmail) {
      setValue("email", passedEmail);
    }
  }, [passedEmail, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.post("/auth/forgot-password", data);
      alert("OTP sent to your email");
      navigate("/verify-reset-otp", { state: { email: data.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              required
              disabled={!!passedEmail}
              className={`w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                passedEmail ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-md font-semibold transition"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

