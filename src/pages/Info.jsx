import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Info() {
    const [user, setUser] = useState(null);
    const [extraData, setExtraData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "http://localhost:5000/info",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setUser(res.data.user);
                setExtraData(res.data.extraData);
            } catch (error) {
                navigate("/");
            }
        };
        fetchUser();
    }, [navigate]);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    const handleEdit = () => {
        if (!user || !user._id) {
            alert("User ID not found!");
            return;
        }
        const editData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            dob: user.dob,
            role: user.role,
            rollno: extraData?.rollno || "",
            remark: extraData?.remark || ""
        };

        console.log("Sending to edit:", editData);
        navigate("/signup", { state: { editData } });
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login again");
                navigate("/");
                return;
            }

            if (!user || !user._id) {
                alert("User ID not found!");
                return;
            }

            if (window.confirm("Are you sure you want to delete?")) {
                await axios.delete(
                    `http://localhost:5000/user/${user._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`  
                        }
                    }
                );
                localStorage.removeItem("token");
                alert("User deleted successfully!");
                navigate("/");
            }
        } catch (error) {
            console.error("Delete error:", error);
            if (error.response?.status === 401) {
                alert("Session expired! Please login again.");
                localStorage.removeItem("token");
                navigate("/");
            } else {
                alert("Delete Failed: " + (error.response?.data?.message || error.message));
            }
        }
    };

    if (!user) return <h3>loading...</h3>;

    return (
        <div>
            <h3>Info</h3>
            <p><strong>User ID:</strong> {user._id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Dob: {user.dob?.split("T")[0]}</p>
            <p>Role: {user.role}</p>

            {user.role === "teacher" && extraData && (
                <>
                    <h4>Teacher Details</h4>
                    <p>Name: {extraData.name}</p>
                    <p>Roll No: {extraData.rollno}</p>
                    <p>Dob: {extraData.dob}</p>
                    <p>Remark: {extraData.remark}</p>
                </>
            )}

            {user.role === "employee" && extraData && (
                <>
                    <h4>Employee Details</h4>
                    <p>Name: {extraData.name}</p>
                    <p>Roll No: {extraData.rollno}</p>
                    <p>Dob: {extraData.dob}</p>
                    <p>Remark: {extraData.remark}</p>
                </>
            )}

            {user.role === "admin" && extraData && (
                <>
                    <h3>Teacher</h3>
                    {extraData.teachers.map((t) => (
                        <div key={t._id}>
                            {t.name} - {t.rollno} - {t.dob?.split("T")[0]} - {t.remark}
                        </div>
                    ))}
                    <h3>Employee</h3>
                    {extraData.employees.map((t) => (
                        <div key={t._id}>
                            {t.name} - {t.rollno} - {t.dob?.split("T")[0]} - {t.remark}
                        </div>
                    ))}
                </>
            )}

            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleLogout}>Logout</button>

        </div>
    );
}

export default Info;