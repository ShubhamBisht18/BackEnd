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
    return (
        <div>
            {user && (
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Mobile: {user.mobile}</p>
                </div>
            )}
        </div>
    )
}

export default Profile