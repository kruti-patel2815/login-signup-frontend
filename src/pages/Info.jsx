// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Form from "./Form";

// function Info() {
//     const [user, setUser] = useState(null);
//     const [extraData, setExtraData] = useState({ teachers: [], employees: [] });
//     const [showForm, setShowForm] = useState(false);
//     const [editData, setEditData] = useState(null);
//     const email = localStorage.getItem("email");
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     };

//     useEffect(() => {
//         const fetchUser = async () => {
//             const res = await axios.get("http://localhost:5000/info", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             setUser(res.data.user);
//             setExtraData({
//                 teachers: res.data.teachers,
//                 employees: res.data.employees
//             });
//         };

//         fetchUser();
//     }, []);

//     const handleDelete = async (id, role) => {
//         await axios.delete(`http://localhost:5000/${role}/${id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//         });

//         setExtraData((prev) => ({
//             ...prev,
//             [role + "s"]: prev[role + "s"].filter((item) => item._id !== id)
//         }));
//     };

//     if (!user) return <h2>Loading...</h2>;

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

//                     <button onClick={() => {
//                         setShowForm(true);
//                         setEditData(null);
//                     }}>
//                         Add
//                     </button>

//                     {showForm && (
//                         <Form
//                             user={user}
//                             editData={editData}
//                             onSuccess={(newData) => {
//                                 setExtraData((prev) => ({
//                                     ...prev,
//                                     teachers: editData
//                                         ? prev.teachers.map((t) =>
//                                             t._id === newData._id ? newData : t
//                                         )
//                                         : [...prev.teachers, newData]
//                                 }));
//                                 setShowForm(false);
//                                 setEditData(null);
//                             }}
//                         />
//                     )}

//                     <table border="1">
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Roll No</th>
//                                 <th>Remark</th>
//                                 <th>Address</th>
//                                 <th>Action</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {extraData.teachers.map((t) => (
//                                 <tr key={t._id}>
//                                     <td>{t.name}</td>
//                                     <td>{t.rollno}</td>
//                                     <td>{t.remark}</td>
//                                     <td>{t.address}</td>
//                                     <td>
//                                         <button onClick={() => {
//                                             setEditData({ ...t, role: "teacher" });
//                                             setShowForm(true);
//                                         }}>Edit</button>
//                                     </td>
//                                     <td>
//                                         <button onClick={() => handleDelete(t._id, "teacher")}>
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </>
//             )}

//             {user.role === "employee" && (
//                 <>
//                     <h3>Employee Details</h3>

//                     <button onClick={() => {
//                         setShowForm(true);
//                         setEditData(null);
//                     }}>
//                         Add
//                     </button>

//                     {showForm && (
//                         <Form
//                             user={user}
//                             editData={editData}
//                             onSuccess={(newData) => {
//                                 setExtraData((prev) => ({
//                                     ...prev,
//                                     employees: editData
//                                         ? prev.employees.map((e) =>
//                                             e._id === newData._id ? newData : e
//                                         )
//                                         : [...prev.employees, newData]
//                                 }));
//                                 setShowForm(false);
//                                 setEditData(null);
//                             }}
//                         />
//                     )}

//                     <table border="1">
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Roll No</th>
//                                 <th>Remark</th>
//                                 <th>Address</th>
//                                 <th>Action</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {extraData.employees.map((e) => (
//                                 <tr key={e._id}>
//                                     <td>{e.name}</td>
//                                     <td>{e.rollno}</td>
//                                     <td>{e.remark}</td>
//                                     <td>{e.address}</td>
//                                     <td>
//                                         <button onClick={() => {
//                                             setEditData({ ...e, role: "employee" });
//                                             setShowForm(true);
//                                         }}>Edit</button>
//                                     </td>
//                                     <td>
//                                         <button onClick={() => handleDelete(e._id, "employee")}>
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </>
//             )}

//             {user.role === "admin" && (
//                 <>
//                     <h3>Admin</h3>

//                     <button onClick={() => {
//                         setShowForm(true);
//                         setEditData(null);
//                     }}>
//                         Add
//                     </button>

//                     {showForm && (
//                         <Form
//                             user={user}
//                             editData={editData}
//                             onSuccess={(newData) => {
//                                 if (newData.role === "teacher") {
//                                     setExtraData((prev) => ({
//                                         ...prev,
//                                         teachers: editData
//                                             ? prev.teachers.map((t) =>
//                                                 t._id === newData._id ? newData : t
//                                             )
//                                             : [...prev.teachers, newData]
//                                     }));
//                                 } else {
//                                     setExtraData((prev) => ({
//                                         ...prev,
//                                         employees: editData
//                                             ? prev.employees.map((e) =>
//                                                 e._id === newData._id ? newData : e
//                                             )
//                                             : [...prev.employees, newData]
//                                     }));
//                                 }

//                                 setShowForm(false);
//                                 setEditData(null);
//                             }}
//                         />
//                     )}

//                     <h3>Teacher Details</h3>
//                     <table border="1">
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Roll No</th>
//                                 <th>Remark</th>
//                                 <th>Address</th>
//                                 <th>Action</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {extraData.teachers.map((t) => (
//                                 <tr key={t._id}>
//                                     <td>{t.name}</td>
//                                     <td>{t.rollno}</td>
//                                     <td>{t.remark}</td>
//                                     <td>{t.address}</td>
//                                     <td>
//                                         <button onClick={() => {
//                                             setEditData({ ...t, role: "teacher" });
//                                             setShowForm(true);
//                                         }}>Edit</button>
//                                     </td>
//                                     <td>
//                                         <button onClick={() => handleDelete(t._id, "teacher")}>
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     <h3>Employee Details</h3>
//                     <table border="1">
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Roll No</th>
//                                 <th>Remark</th>
//                                 <th>Address</th>
//                                 <th>Action</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {extraData.employees.map((e) => (
//                                 <tr key={e._id}>
//                                     <td>{e.name}</td>
//                                     <td>{e.rollno}</td>
//                                     <td>{e.remark}</td>
//                                     <td>{e.address}</td>
//                                     <td>
//                                         <button onClick={() => {
//                                             setEditData({ ...e, role: "employee" });
//                                             setShowForm(true);
//                                         }}>Edit</button>
//                                     </td>
//                                     <td>
//                                         <button onClick={() => handleDelete(e._id, "employee")}>
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                 </>
//             )}
//             <br></br>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// }

// export default Info;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./Form";

function Info() {
    const [user, setUser] = useState(null);
    const [extraData, setExtraData] = useState({ teachers: [], employees: [] });
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [tab, setTab] = useState(""); // ✅ NEW

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email"); // ✅ NEW
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

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

    // 🔥 ADMIN UI
    if (email === "admin@gmail.com") {
        return (
            <div style={{ display: "flex", height: "100vh" }}>

                {/* LEFT NAVBAR */}
                <div style={{ width: "200px", background: "#fff", color: "#000", borderRight: "1px solid #ccc" }}>
                    <h3>Admin Panel</h3>

                    <button onClick={() => setTab("teacher")}>Teacher</button><br /><br />
                    <button onClick={() => setTab("employee")}>Employee</button><br /><br />
                    <button onClick={handleLogout}>Logout</button>
                </div>

                {/* RIGHT SIDE */}
                <div style={{ flex: 1, padding: "20px" }}>

                    <button onClick={() => {
                        setShowForm(true);
                        setEditData(null);
                    }}>
                        Add {tab}
                    </button>

                    {showForm && (
                        <Form
                            user={user}
                            editData={editData}
                            onSuccess={(newData) => {
                                setExtraData((prev) => ({
                                    ...prev,
                                    [tab + "s"]: editData
                                        ? prev[tab + "s"].map((item) =>
                                            item._id === newData._id ? newData : item
                                        )
                                        : [...prev[tab + "s"], newData]
                                }));

                                setShowForm(false);
                                setEditData(null);
                            }}
                        />
                    )}

                    {/* TABLE */}
                    {tab === "teacher" && (
                        <Table
                            data={extraData.teachers}
                            role="teacher"
                            setEditData={setEditData}
                            setShowForm={setShowForm}
                            handleDelete={handleDelete}
                        />
                    )}

                    {tab === "employee" && (
                        <Table
                            data={extraData.employees}
                            role="employee"
                            setEditData={setEditData}
                            setShowForm={setShowForm}
                            handleDelete={handleDelete}
                        />
                    )}

                </div>
            </div>
        );
    }

    // 🔵 NORMAL USER UI (same as before)
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

                    <Table
                        data={extraData.teachers}
                        role="teacher"
                        setEditData={setEditData}
                        setShowForm={setShowForm}
                        handleDelete={handleDelete}
                    />
                </>
            )}

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

                    <Table
                        data={extraData.employees}
                        role="employee"
                        setEditData={setEditData}
                        setShowForm={setShowForm}
                        handleDelete={handleDelete}
                    />
                </>
            )}

            <br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

// 🔁 REUSABLE TABLE
function Table({ data, role, setEditData, setShowForm, handleDelete }) {
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>Remark</th>
                    <th>Address</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.rollno}</td>
                        <td>{item.remark}</td>
                        <td>{item.address}</td>

                        <td>
                            <button onClick={() => {
                                setEditData({ ...item, role });
                                setShowForm(true);
                            }}>
                                Edit
                            </button>
                        </td>

                        <td>
                            <button onClick={() => handleDelete(item._id, role)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Info;