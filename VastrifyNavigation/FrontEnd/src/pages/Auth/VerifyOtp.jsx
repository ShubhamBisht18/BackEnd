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
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="OTP" {...register("otp")} required /> <br />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default VerifyOtp;