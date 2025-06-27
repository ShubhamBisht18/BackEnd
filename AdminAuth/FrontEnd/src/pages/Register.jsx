import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post('/auth/register', data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Name" {...register('name')} />
      <input placeholder="Email" {...register('email')} />
      <input placeholder="Mobile" {...register('mobile')} />
      <input type="password" placeholder="Password" {...register('password')} />
      <button type="submit">Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}

export default Register;
