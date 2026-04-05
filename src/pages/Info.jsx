// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Form from "./Form";

// function Info() {
//     const [user, setUser] = useState(null);
//     const [extraData, setExtraData] = useState([]);
//     const [showTeacherForm, setShowTeacherForm] = useState(false);
//     const [showEmployeeForm, setShowEmployeeForm] = useState(false);
//     const navigate = useNavigate();
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {

//                 const res = await axios.get(
//                     "http://localhost:5000/info",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );
//                 setUser(res.data.user);
//                 setExtraData({
//                     teachers: res.data.teachers,
//                     employees: res.data.employees
//                 });

//             } catch (error) {
//                 navigate("/");
//             }
//         };

//         fetchUser();

//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     };

//     const handleEdit = (data) => {
//         const editData = {
//             _id: data.userId._id,
//             name: data.userId.name,
//             email: data.userId.email,
//             dob: data.userId.dob,
//             role: user.role,
//             rollno: data.rollno,
//             remark: data.remark
//         };

//         navigate("/signup", { state: { editData } });
//     };

//     const handleDelete = async (id) => {
//         try {

//             const token = localStorage.getItem("token");

//             if (user.role === "teacher") {
//                 await axios.delete(
//                     `http://localhost:5000/teacher/${id}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );
//             }

//             if (user.role === "employee") {
//                 await axios.delete(
//                     `http://localhost:5000/employee/${id}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );
//             }

//             if (user.role === "teacher") {
//                 setExtraData((prev) => ({
//                     ...prev,
//                     teachers: prev.teachers.filter((item) => item._id !== id)
//                 }));
//             }

//             if (user.role === "employee") {
//                 setExtraData((prev) => ({
//                     ...prev,
//                     employees: prev.employees.filter((item) => item._id !== id)
//                 }));
//             }

//             if (user.role === "admin") {
//                 setExtraData((prev) => ({
//                     ...prev,
//                     teachers: prev.teachers.filter((item) => item._id !== id),
//                     employees: prev.employees.filter((item) => item._id !== id)
//                 }));
//             }

//         } catch (error) {
//             alert("Delete Failed");
//         }
//     };
//     if (!user) {
//         return <h2>Loading...</h2>;
//     }
//     return (
//         <div>
//             <h3>Info</h3>
//             <p><strong>User ID:</strong> {user._id}</p>
//             <p>Name: {user.name}</p>
//             <p>Email: {user.email}</p>
//             <p>Dob: {user.dob?.split("T")[0]}</p>
//             <p>Role: {user.role}</p>

//             {user.role === "teacher" && (

//                 <>
//                     <h3>Teacher Details</h3>
//                     <button onClick={() => setShowTeacherForm(!showTeacherForm)}>Add</button>

//                     {showTeacherForm && (
//                         <Form
//                             role="teacher"
//                             onSuccess={(newData) => {
//                                 setExtraData((prev) => ({
//                                     ...prev,
//                                     teachers: [...(prev.teachers || []), newData]
//                                 }));
//                                 setShowTeacherForm(false);
//                             }}
//                         />
//                     )}
//                     {extraData.teachers?.map((t) => (
//                         <div key={t._id}>

//                             <p>
//                                 <strong>Name:</strong> {t.name || t.userId.name} <br />
//                                 <strong>DOB:</strong> {t.userId.dob?.split("T")[0]} <br />
//                                 <strong>Roll No:</strong> {t.rollno} <br />
//                                 <strong>Remark:</strong> {t.remark} <br />
//                                 <strong>Address:</strong> {t.address}
//                             </p>

//                             <button onClick={() => handleEdit(t)}>
//                                 Edit
//                             </button>

//                             <button onClick={() => handleDelete(t._id)}>
//                                 Delete
//                             </button>

//                         </div>
//                     ))}

//                 </>

//             )}
//             {user.role === "employee" && (
//                 <>
//                     <h4>Employee Details</h4>
//                     <button onClick={() => setShowEmployeeForm(!showEmployeeForm)}>Add</button>

//                     {showEmployeeForm && (
//                         <Form
//                             role="employee"
//                             onSuccess={(newData) => {
//                                 setExtraData((prev) => ({
//                                     ...prev,
//                                     employees: [...(prev.employees || []), newData]
//                                 }));
//                                 setShowEmployeeForm(false);
//                             }}
//                         />
//                     )}

//                     {extraData.employees?.map((t) => (
//                         <div key={t._id}>
//                             <table>
//                                 <tr>
//                                     <td>
//                                         <strong>Name:</strong> {t.name || t.userId.name} <br />
//                                         <strong>DOB:</strong> {t.userId.dob?.split("T")[0]} <br />
//                                         <strong>Roll No:</strong> {t.rollno} <br />
//                                         <strong>Remark:</strong> {t.remark} <br />
//                                         <strong>Address:</strong> {t.address}
//                                     </td>
//                                 </tr>
//                             </table>
//                             {/* <p>

//                                 <strong>Name:</strong> {t.name || t.userId.name} <br />
//                                 <strong>DOB:</strong> {t.userId.dob?.split("T")[0]} <br />
//                                 <strong>Roll No:</strong> {t.rollno} <br />
//                                 <strong>Remark:</strong> {t.remark} <br />
//                                 <strong>Address:</strong> {t.address}
//                             </p> */}

//                             <button onClick={() => handleEdit(t)}>
//                                 Edit
//                             </button>

//                             <button onClick={() => handleDelete(t._id)}>
//                                 Delete
//                             </button>

//                         </div>
//                     ))}

//                 </>
//             )}

//             {user.role === "admin" && extraData && (
//                 <>
//                     <h3>Teacher Details</h3>
//                     <button onClick={() => setShowTeacherForm(!showTeacherForm)}>Add</button>

//                     {showTeacherForm && (
//                         <Form
//                             role="teacher"
//                             onSuccess={(newData) => {
//                                 setExtraData((prev) => ({
//                                     ...prev,
//                                     teachers: [...(prev.teachers || []), newData]
//                                 }));
//                                 setShowTeacherForm(false);
//                             }}
//                         />
//                     )}
//                     {extraData.teachers?.map((t) => (
//                         <div key={t._id}>

//                             <p>
//                                 Name: {t.userId.name} ,
//                                 Dob: {t.userId.dob?.split("T")[0]}
//                             </p>

//                             Rollno:
//                             <input
//                                 type="text"
//                                 value={t.rollno}
//                                 onChange={(e) => {
//                                     const updated = { ...extraData };
//                                     updated.teachers = updated.teachers.map((item) =>
//                                         item._id === t._id ? { ...item, rollno: e.target.value } : item
//                                     );
//                                     setExtraData(updated);
//                                 }}
//                             />
//                             Remark:
//                             <input
//                                 type="text"
//                                 value={t.remark}
//                                 onChange={(e) => {
//                                     const updated = { ...extraData };
//                                     updated.teachers = updated.teachers.map((item) =>
//                                         item._id === t._id ? { ...item, remark: e.target.value } : item
//                                     );
//                                     setExtraData(updated);
//                                 }}
//                             />

//                             <button onClick={() => handleEdit(t)}>
//                                 Edit
//                             </button>

//                             <button onClick={() => handleDelete(t._id)}>
//                                 Delete
//                             </button>

//                         </div>
//                     ))}

//                     <h4>Employee Details</h4>
//                     <button onClick={() => setShowEmployeeForm(!showEmployeeForm)}>Add</button>

//                     {showEmployeeForm && (
//                         <Form
//                             role="employee"
//                             onSuccess={(newData) => {
//                                 setExtraData((prev) => ({
//                                     ...prev,
//                                     employees: [...(prev.employees || []), newData]
//                                 }));
//                                 setShowEmployeeForm(false);
//                             }}
//                         />
//                     )}
//                     {extraData.employees?.map((t) => (
//                         <div key={t._id}>

//                             <p>
//                                 Name: {t.userId.name} ,
//                                 Dob: {t.userId.dob?.split("T")[0]}
//                             </p>

//                             Rollno:
//                             <input
//                                 type="text"
//                                 value={t.rollno}
//                                 onChange={(e) => {
//                                     const updated = { ...extraData };
//                                     updated.employees = updated.employees.map((item) =>
//                                         item._id === t._id ? { ...item, rollno: e.target.value } : item
//                                     );
//                                     setExtraData(updated);
//                                 }}
//                             />
//                             Remark:
//                             <input
//                                 type="text"
//                                 value={t.remark}
//                                 onChange={(e) => {
//                                     const updated = { ...extraData };
//                                     updated.employees = updated.employees.map((item) =>
//                                         item._id === t._id ? { ...item, remark: e.target.value } : item
//                                     );
//                                     setExtraData(updated);
//                                 }}
//                             />

//                             <button onClick={() => handleEdit(t)}>
//                                 Edit
//                             </button>

//                             <button onClick={() => handleDelete(t._id)}>
//                                 Delete
//                             </button>

//                         </div>
//                     ))}

//                 </>
//             )}
//             <button onClick={handleLogout}>Logout</button>

//         </div>
//     );
// }

// export default Info;

import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";

function Info() {
    const [user, setUser] = useState(null);
    const [extraData, setExtraData] = useState({ teachers: [], employees: [] });
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get("http://localhost:5000/info", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUser(res.data.user);
            setExtraData({
                teachers: res.data.teachers,
                employees: res.data.employees
            });
        };

        fetchUser();
    }, []);

    const handleDelete = async (id, role) => {
        await axios.delete(`http://localhost:5000/${role}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setExtraData((prev) => ({
            ...prev,
            [role + "s"]: prev[role + "s"].filter((item) => item._id !== id)
        }));
    };

    if (!user) return <h2>Loading...</h2>;

    return (
        <div>
            <h3>Info</h3>

            <p><strong>User ID:</strong> {user._id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Dob: {user.dob?.split("T")[0]}</p>
            <p>Role: {user.role}</p>

            {/* ================= TEACHER ================= */}
            {user.role === "teacher" && (
                <>
                    <h3>Teacher Details</h3>

                    <button onClick={() => {
                        setShowForm(true);
                        setEditData(null);
                    }}>
                        Add
                    </button>

                    {showForm && (
                        <Form
                            user={user}
                            editData={editData}
                            onSuccess={(newData) => {
                                setExtraData((prev) => ({
                                    ...prev,
                                    teachers: editData
                                        ? prev.teachers.map((t) =>
                                            t._id === newData._id ? newData : t
                                        )
                                        : [...prev.teachers, newData]
                                }));
                                setShowForm(false);
                                setEditData(null);
                            }}
                        />
                    )}

                    <table border="1" style={{ width: "100%", marginTop: "10px" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Remark</th>
                                <th>Address</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {extraData.teachers.map((t) => (
                                <tr key={t._id}>
                                    <td>{t.name}</td>
                                    <td>{t.rollno}</td>
                                    <td>{t.remark}</td>
                                    <td>{t.address}</td>
                                    <td>
                                        <button onClick={() => {
                                            setEditData({ ...t, role: "teacher" });
                                            setShowForm(true);
                                        }}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(t._id, "teacher")}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* ================= EMPLOYEE ================= */}
            {user.role === "employee" && (
                <>
                    <h3>Employee Details</h3>

                    <button onClick={() => {
                        setShowForm(true);
                        setEditData(null);
                    }}>
                        Add
                    </button>

                    {showForm && (
                        <Form
                            user={user}
                            editData={editData}
                            onSuccess={(newData) => {
                                setExtraData((prev) => ({
                                    ...prev,
                                    employees: editData
                                        ? prev.employees.map((e) =>
                                            e._id === newData._id ? newData : e
                                        )
                                        : [...prev.employees, newData]
                                }));
                                setShowForm(false);
                                setEditData(null);
                            }}
                        />
                    )}

                    <table border="1" style={{ width: "100%", marginTop: "10px" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Remark</th>
                                <th>Address</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {extraData.employees.map((e) => (
                                <tr key={e._id}>
                                    <td>{e.name}</td>
                                    <td>{e.rollno}</td>
                                    <td>{e.remark}</td>
                                    <td>{e.address}</td>
                                    <td>
                                        <button onClick={() => {
                                            setEditData({ ...e, role: "employee" });
                                            setShowForm(true);
                                        }}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(e._id, "employee")}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* ================= ADMIN ================= */}
            {user.role === "admin" && (
                <>
                    <h3>Admin Panel</h3>

                    <button onClick={() => {
                        setShowForm(true);
                        setEditData(null);
                    }}>
                        Add
                    </button>

                    {showForm && (
                        <Form
                            user={user}
                            editData={editData}
                            onSuccess={(newData) => {
                                if (newData.role === "teacher") {
                                    setExtraData((prev) => ({
                                        ...prev,
                                        teachers: editData
                                            ? prev.teachers.map((t) =>
                                                t._id === newData._id ? newData : t
                                            )
                                            : [...prev.teachers, newData]
                                    }));
                                } else {
                                    setExtraData((prev) => ({
                                        ...prev,
                                        employees: editData
                                            ? prev.employees.map((e) =>
                                                e._id === newData._id ? newData : e
                                            )
                                            : [...prev.employees, newData]
                                    }));
                                }

                                setShowForm(false);
                                setEditData(null);
                            }}
                        />
                    )}

                    <h3>Teacher Details</h3>
                    <table border="1" style={{ width: "100%", marginTop: "10px" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Remark</th>
                                <th>Address</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {extraData.teachers.map((t) => (
                                <tr key={t._id}>
                                    <td>{t.name}</td>
                                    <td>{t.rollno}</td>
                                    <td>{t.remark}</td>
                                    <td>{t.address}</td>
                                    <td>
                                        <button onClick={() => {
                                            setEditData({ ...t, role: "teacher" });
                                            setShowForm(true);
                                        }}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(t._id, "teacher")}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3>Employee Details</h3>
                    <table border="1" style={{ width: "100%", marginTop: "10px" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Remark</th>
                                <th>Address</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {extraData.employees.map((e) => (
                                <tr key={e._id}>
                                    <td>{e.name}</td>
                                    <td>{e.rollno}</td>
                                    <td>{e.remark}</td>
                                    <td>{e.address}</td>
                                    <td>
                                        <button onClick={() => {
                                            setEditData({ ...e, role: "employee" });
                                            setShowForm(true);
                                        }}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(e._id, "employee")}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Info;