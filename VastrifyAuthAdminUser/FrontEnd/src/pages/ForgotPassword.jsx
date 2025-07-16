import { useForm } from "react-hook-form";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

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
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          type="email"
          {...register("email")}
          required
        />
        <br />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}

export default ForgotPassword;

