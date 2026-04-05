import { useState, useEffect } from "react";
import axios from "axios";

function Form({ user, editData, onSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        rollno: "",
        remark: "",
        address: "",
        role: ""
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (editData) {
            setFormData(editData);
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

        const finalRole = formData.role || user.role;

        const res = await axios.post(
            `http://localhost:5000/add-data`,
            { ...formData, role: finalRole },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        onSuccess(res.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            Name:-<input name="name" placeholder="Name" value={formData.name} onChange={handleChange} /><br></br>
            Roll no:-<input name="rollno" placeholder="Roll No" value={formData.rollno} onChange={handleChange} /><br></br>
            Remark:-<input name="remark" placeholder="Remark" value={formData.remark} onChange={handleChange} /><br></br>
            Address:-<input name="address" placeholder="Address" value={formData.address} onChange={handleChange} /><br></br>

            {user.role === "admin" && (
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                </select>
            )}<br></br>

            <button type="submit">Save</button>
        </form>
    );
}

export default Form;