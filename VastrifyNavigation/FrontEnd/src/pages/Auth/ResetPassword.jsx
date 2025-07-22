import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const onSubmit = async (data) => {
    try {
      await axios.post("/auth/reset-password", { ...data, email });
      alert("Password reset successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="New Password"
          type="password"
          {...register("newPassword")}
          required
        />
        <br />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
}

export default ResetPassword;

