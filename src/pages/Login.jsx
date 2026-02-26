import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:5000/login", { email, password }
            );
            localStorage.setItem("token", res.data.token);
            navigate("/info");
        } catch (error) {
            alert("Login Fail")
        }
    };

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <input type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required></input><br></br>

                <input type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required></input><br></br>

                <button type="submit">Login</button>
            </form>
            {/* <button onClick={() => navigate("/signup")}>
                Go to Signup
            </button> */}
        </div>
    );
}
export default Login;