import React from "react";
import axios from "../../utils/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthPracContext";


export default function VerifyOTP() {

     const { setUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            await axios.post('/auth/verify-otp', data)
            alert("Registeration Succesfull!!")
            setUser(res.data.user);
            navigate('/home')
        } catch (error) {
            console.log("OTP verification failed:", error.response?.data?.message || error.message);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="otp">OTP</label>
                    <input type="text" name="otp" id="otp" {...register('otp', {
                        required: "OTP is Required"
                    })} />
                    <button type="submit">Verify</button>
                </div>
                {errors.otp && <p>{errors.otp.message}</p>}
            </form>
        </div>
    )
}