import React from "react";
import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

function Profile(){

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(()=>{
        axios.get('/user')
        .then((res) => setUser(res.data))
        .catch(() => navigate('/login'))
    },[])

    const handleLogout = async() =>{
        try {
            await axios.post('/logout',{},{withCredentials:true})
            navigate('/login')
        } catch (error) {
             console.error("Logout failed", error);
        }
    }
    return(
        <div>
            {user && (
                <div>
                    <h3>Welcome: <strong>{user.name}</strong></h3>
                    <p>Email: <strong>{user.email}</strong></p>
                    <p>Mobile Number: <strong>{user.mobile}</strong></p>
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile