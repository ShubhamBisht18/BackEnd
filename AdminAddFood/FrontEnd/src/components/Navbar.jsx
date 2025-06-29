import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

function Navbar({user,setUser}){
    const navigate = useNavigate();
    const handleLogout = async() =>{
        try {
            await axios.post('/auth/logout')
            setUser(null)
            navigate('/login')
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (
        <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/contact'}>Contact</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/menu'}>Menu</Link>
            {user?.role === 'admin' && (
            <div>
                <Link to={'/addfood'}>AddFood</Link>
                <Link to={'/dashboard'}>Dashboard</Link>
            </div>
            )
            }
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar