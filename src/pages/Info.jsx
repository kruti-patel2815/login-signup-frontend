import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Info() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/info",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                setUser(res.data.user);
            } catch (error) {
                navigate("/");
            }
        };
        fetchUser();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    if (!user) return <h3>loading...</h3>;

    return (
        <div>
            <h3>Info</h3>

            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Dob: {user.dob}</p>
            <p>Role: {user.role}</p>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Info;