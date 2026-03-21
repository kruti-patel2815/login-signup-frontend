import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Info() {
    const [user, setUser] = useState(null);
    const [extraData, setExtraData] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const res = await axios.get(
                    "http://localhost:5000/info",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setUser(res.data.user);
                setExtraData({
                    teachers: res.data.teachers,
                    employees: res.data.employees
                });

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

    const handleEdit = (data) => {
        const editData = {
            _id: data.userId._id,
            name: data.userId.name,
            email: data.userId.email,
            dob: data.userId.dob,
            role: user.role,
            rollno: data.rollno,
            remark: data.remark
        };

        navigate("/signup", { state: { editData } });
    };

    const handleSave = async (data) => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/save-data",
                {
                    rollno: data.rollno,
                    remark: data.remark,
                    role: user.role,      
                    userId: data.userId._id 
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Saved Successfully");

        } catch (error) {
            console.log(error);
            alert("Save Failed");
        }
    };

    const handleDelete = async (id) => {
        try {

            const token = localStorage.getItem("token");

            if (user.role === "teacher") {
                await axios.delete(
                    `http://localhost:5000/teacher/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            if (user.role === "employee") {
                await axios.delete(
                    `http://localhost:5000/employee/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            const updatedData = extraData.filter((item) => item._id !== id);
            setExtraData(updatedData);

        } catch (error) {
            alert("Delete Failed");
        }
    };
    if (!user) {
        return <h2>Loading...</h2>;
    }
    return (
        <div>
            <h3>Info</h3>
            <p><strong>User ID:</strong> {user._id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Dob: {user.dob?.split("T")[0]}</p>
            <p>Role: {user.role}</p>

            {user.role === "teacher" && (

                <>
                    <h3>Teacher Details</h3>

                    {extraData.teachers?.map((t) => (
                        <div key={t._id}>

                            <p>
                                Name: {t.userId.name} ,
                                Dob: {t.userId.dob?.split("T")[0]}
                            </p>

                            Rollno:
                            <input
                                type="text"
                                value={t.rollno}
                                onChange={(e) => {
                                    const updated = { ...extraData };
                                    updated.teachers = updated.teachers.map((item) =>
                                        item._id === t._id ? { ...item, rollno: e.target.value } : item
                                    );
                                    setExtraData(updated);
                                }}
                            />
                            Remark:
                            <input
                                type="text"
                                value={t.remark}
                                onChange={(e) => {
                                    const updated = { ...extraData };
                                    updated.teachers = updated.teachers.map((item) =>
                                        item._id === t._id ? { ...item, remark: e.target.value } : item
                                    );
                                    setExtraData(updated);
                                }}
                            />
                            <button onClick={() => handleSave(t)}>Save</button>
                            <button onClick={() => handleEdit(t)}>
                                Edit
                            </button>

                            <button onClick={() => handleDelete(t._id)}>
                                Delete
                            </button>

                        </div>
                    ))}

                </>

            )}
            {user.role === "employee" && (
                <>
                    <h4>Employee Details</h4>
                    {extraData.employees?.map((t) => (
                        <div key={t._id}>

                            <p>
                                Name: {t.userId.name} ,
                                Dob: {t.userId.dob?.split("T")[0]}
                            </p>

                            Rollno:
                            <input
                                type="text"
                                value={t.rollno}
                                onChange={(e) => {
                                    const updated = { ...extraData };
                                    updated.employees = updated.employees.map((item) =>
                                        item._id === t._id ? { ...item, rollno: e.target.value } : item
                                    );
                                    setExtraData(updated);
                                }}
                            />
                            Remark:
                            <input
                                type="text"
                                value={t.remark}
                                onChange={(e) => {
                                    const updated = { ...extraData };
                                    updated.employees = updated.employees.map((item) =>
                                        item._id === t._id ? { ...item, remark: e.target.value } : item
                                    );
                                    setExtraData(updated);
                                }}
                            />
                            <button onClick={() => handleSave(t)}>Save</button>
                            <button onClick={() => handleEdit(t)}>
                                Edit
                            </button>

                            <button onClick={() => handleDelete(t._id)}>
                                Delete
                            </button>

                        </div>
                    ))}

                </>
            )}

            {user.role === "admin" && extraData && (
                <>
                    <h3>Teacher</h3>
                    {extraData.teachers?.map((t) => (

                        <div key={t._id}>

                            {t.userId.name} -
                            {t.rollno} -
                            {t.userId.dob?.split("T")[0]} -
                            {t.remark}

                        </div>

                    ))}
                    <h3>Employee</h3>
                    {extraData.employees?.map((t) => (

                        <div key={t._id}>

                            {t.userId.name} -
                            {t.rollno} -
                            {t.userId.dob?.split("T")[0]} -
                            {t.remark}

                        </div>

                    ))}
                </>
            )}
            <button onClick={handleLogout}>Logout</button>

        </div>
    );
}

export default Info;
