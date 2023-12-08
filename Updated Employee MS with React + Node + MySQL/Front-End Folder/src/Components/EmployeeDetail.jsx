import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const EmployeeDetail = () => {
    const [employee, setEmployee] = useState({});
    const [jeep_id, setJeepId] = useState([]);
    const [selectedJeepId, setSelectedJeepId] = useState("");
    const [remittance, setRemittance] = useState({
        jeep_id: "",
        trip_no: "",
        date_time: "",
        p_1000s: "",
        p_500s: "",
        p_200s: "",
        p_100s: "",
        p_50s: "",
        p_20s: "",
        p_10s: "",
        p_5s: "",
        p_1s: "",
        p_0_25s: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeeResult = await axios.get(`http://localhost:3000/employee/detail/${id}`);
                setEmployee(employeeResult.data[0]);

                const jeepIdResult = await axios.get('http://localhost:3000/employee/jeepneys');
                if (jeepIdResult.data.Status) {
                    setJeepId(jeepIdResult.data.Result);
                    setSelectedJeepId(jeepIdResult.data.Result[0]?.id || ""); // Set the default value
                } else {
                    alert(jeepIdResult.data.Error);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const handleJeepIdChange = (e) => {
        setSelectedJeepId(e.target.value);
    };

    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid");
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // formData.append('employee', remittance.employee);
        formData.append('jeep_id', remittance.jeep_id);
        formData.append('trip_no', remittance.trip_no);
        formData.append('date_time', remittance.date_time);
        formData.append('p_1000s', remittance.p_1000s);
        formData.append('p_500s', remittance.p_500s);
        formData.append('p_200s', remittance.p_200s);
        formData.append('p_100s', remittance.p_100s);
        formData.append('p_50s', remittance.p_50s);
        formData.append('p_20s', remittance.p_20s);
        formData.append('p_10s', remittance.p_10s);
        formData.append('p_5s', remittance.p_5s);
        formData.append('p_1s', remittance.p_1s);
        formData.append('p_0_25s', remittance.p_0_25s);


        const data = Object.fromEntries(formData.entries());


        axios.post('http://localhost:3000/employee/add_remittance', data)
            .then(result => {
                if (result.data.Status) {
                    alert("Successfully added remittance!");
                    // navigate('/dashboard/employee')
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>JeepHeap</h4>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Cashier Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Salary: Php {employee.salary}</h3>
                </div>
                <div>
                    <button className='btn btn-primary me-2'>Edit</button>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div>
                <h3 className="text-center">Add Remittance:</h3>
                <form onSubmit={handleSubmit}>
                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="jeep_id" className="form-label">
                            Jeepney Number
                        </label>
                        <select
                            name="jeep_id"
                            id="jeep_id"
                            className="form-select"
                            onChange={handleJeepIdChange}
                            value={selectedJeepId}
                        >
                            {jeep_id.map((c) => {
                                return <option value={c.id}>{c.route_code}</option>;
                            })}
                        </select>
                    </div>

                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="trip_no" className="form-label">Trip Number</label>
                        <input
                            type="text"
                            id="trip_no"
                            name="trip_no"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, trip_no: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="date_time" className="form-label">Date and Time</label>
                        <input
                            type="datetime-local"
                            id="date_time"
                            name="date_time"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, date_time: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="p_1000s" className="form-label">P 1000s</label>
                        <input
                            type="text"
                            id="p_1000s"
                            name="p_1000s"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, p_1000s: e.target.value })}
                            required
                        />
                    </div>
                    {/* Similar input fields for other denominations */}
                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="p_500s" className="form-label">P 500s</label>
                        <input
                            type="text"
                            id="p_500s"
                            name="p_500s"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, p_500s: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="p_200s" className="form-label">P 200s</label>
                        <input
                            type="text"
                            id="p_200s"
                            name="p_200s"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, p_200s: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="p_100s" className="form-label">P 100s</label>
                        <input
                            type="text"
                            id="p_100s"
                            name="p_100s"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, p_100s: e.target.value })}
                            required
                        />
                    </div>


                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="p_50s" className="form-label">P 50s</label>
                        <input
                            type="text"
                            id="p_50s"
                            name="p_50s"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, p_50s: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="p_20s" className="form-label">P 20s</label>
                        <input
                            type="text"
                            id="p_20s"
                            name="p_20s"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, p_20s: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="p_10s" className="form-label">P 10s</label>
                        <input
                            type="text"
                            id="p_10s"
                            name="p_10s"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, p_10s: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="p_5s" className="form-label">P 5s</label>
                        <input
                            type="text"
                            id="p_5s"
                            name="p_5s"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, p_5s: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="p_1s" className="form-label">P 1s</label>
                        <input
                            type="text"
                            id="p_1s"
                            name="p_1s"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, p_1s: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3 offset-md-4">
                        <label htmlFor="p_0_25s" className="form-label">P 0.25s</label>
                        <input
                            type="text"
                            id="p_0_25s"
                            name="p_0_25s"
                            className="form-control"
                            onChange={(e) => setRemittance({ ...remittance, p_0_25s: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3 offset-md-4">
                        <button type="submit" className="btn btn-primary w-100">
                            Add Remittance
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmployeeDetail