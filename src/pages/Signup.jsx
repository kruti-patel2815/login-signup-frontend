import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const editData = location.state?.editData;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        dob: "",
        role: ""
    });

    useEffect(() => {

        if (editData) {
            setFormData({
                _id: editData._id,
                name: editData.name,
                email: editData.email,
                password: "",
                dob: editData.dob ? editData.dob.split("T")[0] : "",
                role: editData.role
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const token = localStorage.getItem("token");
            const config = token ? {
                headers: { Authorization: `Bearer ${token}` }
            } : {};

            if (formData._id) {

                const submitData = { ...formData };
                if (!submitData.password) {
                    delete submitData.password;
                }

                await axios.put(
                    `http://localhost:5000/user/${formData._id}`,
                    submitData,
                    config
                );

                navigate("/info");

            } else {
                await axios.post("http://localhost:5000/signup", formData);
                navigate("/");   
            }

        } catch (error) {
            alert("Operation Failed");
        }
    };
    return (
        <div>
            <h3>{editData ? "Edit User" : "Signup"}</h3>

            <form onSubmit={handleSubmit}>
                Name: <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br></br>

                Email: <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br></br>

                Password: <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required={!formData._id} /><br></br>

                Dob: <input type="date" name="dob" placeholder="DOB" value={formData.dob} onChange={handleChange} required /><br></br>

                Role: <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select><br /><br />

                <button type="submit">{editData ? "Update" : "Signup"}</button>

            </form>

        </div>


    );
}

export default Signup;