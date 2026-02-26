import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        dob: "",
        role: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/signup",
                formData
            );
            navigate("/Login");
        } catch (error) {
            alert("Signup Fail")
        }
    };

    return (
        <div>
            <h3>Signup</h3>

            <form onSubmit={handleSubmit}>
                Name: <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br></br>

                Email: <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br></br>

                Password: <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br></br>

                Dob: <input type="date" name="dob" placeholder="DOB" onChange={handleChange} required /><br></br>

                Role: <select name="role" onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="employee">Employee</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select><br /><br />

                <button type="submit">Signup</button>

            </form>
            {/* <button onClick={() => navigate("/")}>
                Go to Login
            </button> */}
        </div>


    );
}

export default Signup;