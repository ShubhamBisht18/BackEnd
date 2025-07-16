import { useForm } from "react-hook-form";
import axios from "../utils/axios";
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
    <div>
      <h2>Verify OTP to Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="OTP" {...register("otp")} required /> <br />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default VerifyResetOtp;
