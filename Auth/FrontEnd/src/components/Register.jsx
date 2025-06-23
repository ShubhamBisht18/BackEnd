import React from "react";
import axios from "../axios";
import { useForm } from 'react-hook-form'
import { useNavigate ,Link } from "react-router-dom";

function Register(){

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = async(data) =>{
        console.log("Form submitted:", data); 
        try {
            await axios.post('/register',data)
            alert("Register Successfully!!")
            navigate('/profile')
        } catch (error) {
            alert(error?.response?.data?.message || "Registration Failed!");
            console.log("Registration Failed!!", error)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" {...register('name',{
                        required: "Name is required!!"
                    })} />
                    <p>{errors.name?.message}</p>
                </div>
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
                    <label htmlFor="mobile">Mobile: </label>
                    <input type="text" name="mobile" id="mobile" {...register('mobile',{
                        required: "Mobile number is required",
                        minLength: {
                            value: 10,
                            message: "Minimum 10 digits required"
                        }
                    })} />
                    <p>{errors.mobile?.message}</p>
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
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}

export default Register