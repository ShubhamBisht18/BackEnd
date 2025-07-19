import React from "react";
import axios from "../../utils/axios.js";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post('/auth/register', data);
      alert('Registration successful! Please verify your OTP.');
      navigate('/verify-otp');
    } catch (error) {
      console.log("Data not sent:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: "Name is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register('email', { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            {...register('mobile', { required: "Mobile is required" })}
          />
          {errors.mobile && <p>{errors.mobile.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
         <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
