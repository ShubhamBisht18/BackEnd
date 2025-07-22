import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("/auth/register", data);
      navigate("/verify-otp", { state: { email: data.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Name" {...register("name")} required /> <br />
        <input placeholder="Email" type="email" {...register("email")} required /> <br />
        <input placeholder="Mobile" {...register("mobile")} required /> <br />
        <input placeholder="Password" type="password" {...register("password")} required /> <br />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;