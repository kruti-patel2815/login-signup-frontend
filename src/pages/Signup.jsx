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
        role: "",
        rollno: "",
        remark: ""
    });

    useEffect(() => {
        console.log("Edit Data in Signup:", editData);

        if (editData && editData._id) {
            setFormData({
                _id: editData._id,
                name: editData.name || "",
                email: editData.email || "",
                password: "",
                dob: editData.dob ? editData.dob.split("T")[0] : "",
                role: editData.role || "",
                rollno: editData.rollno || "",
                remark: editData.remark || ""
            });
        } else {

            setFormData({
                name: "",
                email: "",
                password: "",
                dob: "",
                role: "",
                rollno: "",
                remark: ""
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
            console.log("Submitting Data:", formData); 

            const token = localStorage.getItem("token");
            const config = token ? {
                headers: { Authorization: `Bearer ${token}` }
            } : {};

            if (formData._id) {
       
                console.log("Updating user with ID:", formData._id); 

                const submitData = { ...formData };
                if (!submitData.password) {
                    delete submitData.password;
                }

                const response = await axios.put(
                    `http://localhost:5000/user/${formData._id}`,
                    submitData,  
                    config
                );
                console.log("Update Response:", response.data);
                alert("User updated successfully!");
            } else {
        
                await axios.post("http://localhost:5000/signup", formData);
                alert("User created successfully!");
            }
            navigate("/info");
        } catch (error) {
            console.error("Submit Error:", error);
            console.error("Error Response:", error.response); 

            if (error.response?.status === 401) {
                alert("Session expired! Please login again.");
                navigate("/");
            } else {
                alert("Operation Failed: " + (error.response?.data?.message || error.message));
            }
        }
    };
    return (
        <div>
            <h3>{formData._id ? "Edit User" : "Signup"}</h3>

            <form onSubmit={handleSubmit}>
                Name: <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br></br>

                Email: <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br></br>

                Password: <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required={!formData._id} /><br></br>

                Dob: <input type="date" name="dob" placeholder="DOB" value={formData.dob} onChange={handleChange} required /><br></br>

                Role: <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="employee">Employee</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select><br /><br />
                {(formData.role === "teacher" || formData.role === "employee") && (
                    <>
                        Roll No:<input type="text" name="rollno" value={formData.rollno} placeholder="Roll No" onChange={handleChange} required /><br />
                        Remark:<input type="text" name="remark" value={formData.remark} placeholder="Remark" onChange={handleChange} required /><br />
                    </>
                )}

                <button type="submit">{editData ? "Update" : "Signup"}</button>

            </form>

        </div>


    );
}

export default Signup;