import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../axios'

function Register(){

    const {
        register,
        handleSubmit
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = async(data) =>{
        try {
            await axios.post('/register',data)
            alert("Register Successfully!!")
            navigate('/profile')
        } catch (error) {
            alert("Registration Failed!!",error)
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
                    <input type="text" name="password" id='password'  {...register('password',{
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