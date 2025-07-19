import { useForm } from "react-hook-form";
import axios from "../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ForgotPassword() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const passedEmail = location.state?.email;

  useEffect(() => {
    if (passedEmail) {
      setValue("email", passedEmail); // set email field if passed
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
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email")}
          required
          disabled
        />
        <br />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
