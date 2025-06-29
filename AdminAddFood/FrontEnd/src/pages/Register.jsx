import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../axios'

function Register({setUser}){

    const {
        register,
        handleSubmit
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = async(data) =>{
        try {
            const res = await axios.post('/auth/register',data)
            setUser(res.data.user)
            alert("Register Successfully!!")
            navigate('/')
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed!")
        }
    }

    return(
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <h3>Register</h3>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id='name' {...register('name',{
                        required: true
                    })} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id='email'  {...register('email',{
                        required: true
                    })} />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" name="mobile" id='mobile'  {...register('mobile',{
                        required: true
                    })} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id='password'  {...register('password',{
                        required: true
                    })} />
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}

export default Register