import React from "react";
import axios from "../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useEffect } from "react";

export default function VerifyResetOTP() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const location = useLocation()

    const email = location.state?.email || "";

    useEffect(() => {
        if (email) {
            setValue("email", email);
        }
    }, [email, setValue]);

    const onSubmit = async (data) => {
        try {
            await axios.post("/auth/verify-reset-otp", data)
            alert("Verifyed Successfully!!")
            navigate('/reset-password', { state: { email: data.email } })
        } catch (error) {
            console.log("OTP is wrong!!", error.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register('email')} readOnly  />
                    <input type="text" id="otp" {...register('otp', {
                        required: "OTP is required"
                    })} />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}