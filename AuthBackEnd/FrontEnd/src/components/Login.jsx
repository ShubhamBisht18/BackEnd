import { useForm } from 'react-hook-form'
import axios from '../axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const {
        register,
        handleSubmit
    } = useForm()
    const navigate = useNavigate()


    const onSubmit = async (data) => {
        try {
            await axios.post('/login', data)
            alert("Login Successfully!!")
            navigate('/profile')
        } catch (error) {
            alert("Login Failed!!", error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email:</label>
                <input name='email' id='email' {...register('email', {
                    required: true
                })} />
            </div>
            <div>
                <label htmlFor="password"></label>
                <input name='password' id='password' type="text" {...register('password', {
                    required: true
                })} />
            </div>
            <button type="submit">Login</button>
            <p>Don't have an account? <Link to="/">Register</Link></p>
        </form>
    )
}

export default Login