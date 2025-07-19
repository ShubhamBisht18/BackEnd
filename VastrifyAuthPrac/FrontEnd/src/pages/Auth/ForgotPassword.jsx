import React from "react";
import axios from "../../utils/axios";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";


function ForgotPassword() {

  const {register, handleSubmit, setValue, formState: {errors}} = useForm()
  const location  = useLocation();
  const navigate = useNavigate()

  const email = location.state?.email || "";

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  
  const sendOTP = async(data) =>{
    try {
      await axios.post('/auth/forgot-password',data)
      alert("Verify the OTP!!")
      navigate('/verify-reset-otp',{state: {email: data.email}})
    } catch (error) {
      console.log("Cant Verify: ",error.messasge)
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit(sendOTP)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })} readOnly 
        />
        {errors.email && <p>{errors.email.message}</p>}
        <button type="submit">OTP</button>
      </form>
    </div>
  );
}

export default ForgotPassword;