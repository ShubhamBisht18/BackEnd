import React from "react";
import axios from "../axios";
import { useForm } from 'react-hook-form'
import { useNavigate ,Link } from "react-router-dom";

function Login(){

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = async(data) =>{
        try {
            await axios.post('/login',data)
            alert("Login Successfully!!")
            navigate('/profile')
        } catch (error) {
            alert(error?.response?.data?.message || "Login Failed!");
            console.log("Login Failed!!", error)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" id="email" {...register('email',{
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address"
                        }
                    })} />
                    <p>{errors.email?.message}</p>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" id="password" {...register('password',{
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Minimum 6 characters required"
                        }
                    })} />
                    <p>{errors.password?.message}</p>
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    )
}

export default Login