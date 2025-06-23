import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

function Profile() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/user')
            .then((res) => setUser(res.data))
            .catch(() => navigate('/login'))
    }, [])

    const handleLogout = async() =>{
        try {
            await axios.post('/logout',{},{withCredentials: true})
            navigate('/login')
        } catch (error) {
            console.error("Logout failed", error);
        }
    }
    return (
        <div>
            {user && (
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Mobile: {user.mobile}</p>
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile