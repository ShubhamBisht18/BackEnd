import React from "react";
import axios from "../../utils/axios";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthPracContext";

export default function Login() {
    
    const { setUser } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const email = watch("email")

    const onSubmit = async (data) => {
        try {
            await axios.post('/auth/login', data)
            alert("Login Successfully!!")
            setUser(res.data.user);
            navigate('/home')
        } catch (error) {
            alert("Invalid email or password")
            console.log("Login failed!!", error.message)
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" {...register('email', {
                        required: "Email is required"
                    })} />
                </div>
                {errors.email && <p>{errors.email.message}</p>}
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" {...register('password', {
                        required: "Password required"
                    })} />
                </div>
                {errors.password && <p>{errors.password.message}</p>}
                <div>
                    <button type="submit">Login</button>
                </div>
                <p><Link to="/forgot-password" state={{ email }}>Forgot Password?</Link></p>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    )
}