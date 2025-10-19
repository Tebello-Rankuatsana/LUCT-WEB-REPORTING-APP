import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from '../api/axios';
import logo from '../images/logo.webp';

function Classes(){
    const [collapsed, setCollapsed] = useState(false);
    
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleSidebar = () => setCollapsed(!collapsed);

    useEffect(()=>{
        getClasses();
    },[]);

    const getClasses = async () => {
        try {
            setLoading(true);
            const reponse = await API.get('/api/classes');
            setClasses(reponse.data);
        }catch(error){
            console.log('Error:',error);
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="d-flex">
            {/* <div className="w-auto h-auto"> */}
            <div 
                className="sidebar d-flex flex-column bg-black text-white vh-100 position-fixed"
                style={{ width: collapsed ? '80px' : '250px', transition: 'width 0.3s' }}>        
                    <button
                        className="btn btn-light m-2"
                        onClick={toggleSidebar}
                        style={{ alignSelf: collapsed ? 'center' : 'flex-end' }}
                    >
                        <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
                    </button>   
    
                    <div className="px-3 mt-2">
                        <Link to="/" className="d-flex align-items-center text-white text-decoration-none">
                            <img
                                src={logo} 
                                alt="limkokwing Logo"
                                width='60px'
                                style={{
                                    width: collapsed ? '40px' : '50px',
                                    height: collapsed ? '40px' : '50px',
                                    transition: 'width 0.3s, height 0.3s',
                                }}
                            />
                            {!collapsed && <span className="fs-4 fw-bold">LIMKOKWING</span>}
                        </Link>
                        <hr className="text-white mt-2" />
                    </div>
                    
                    <ul className="nav nav-pills flex-column mt-2 px-2 flex-grow-1">
                        <li className="nav-item my-1">
                            <Link
                                to="/lecturer"
                                className="d-flex align-items-center p-2 text-white text-decoration-none"
                            >
                                <i className="bi bi-door-open fs-4 me-3"></i>
                                {!collapsed && <span className="fs-5 fw-bold">Back</span>}
                            </Link>
                        </li>
                        <li className="nav-item my-1">
                            <Link
                                to="/Report"
                                className="d-flex align-items-center p-2 text-white text-decoration-none"
                            >
                                <i className="bi bi-file-earmark-plus-fill fs-4 me-3"></i>
                                {!collapsed && <span className="fs-5 fw-bold">Report</span>}
                            </Link>
                        </li>
                        <li className="nav-item my-1">
                            <Link
                                to="/Classes"
                                className="d-flex align-items-center p-2 text-white text-decoration-none"
                            >
                                <i className="bi bi-people fs-4 me-3"></i>
                                {!collapsed && <span className="fs-5 fw-bold">Classes</span>}
                            </Link>
                        </li>
                        <li className="nav-item my-1">
                            <Link
                                to="/Ratings"
                                className="d-flex align-items-center p-2 text-white text-decoration-none"
                            >
                                <i className="bi bi-star fs-4 me-3"></i>
                                {!collapsed && <span className="fs-5 fw-bold">Ratings</span>}
                            </Link>
                        </li>
                    </ul>
                <div className="px-2 mb-3">
                    <hr className="text-white" />
                    <Link
                    to="/Profile"
                    className="d-flex align-items-center p-2 text-white text-decoration-none"
                    >
                    <i className="bi bi-person-circle fs-4 me-3"></i>
                    {!collapsed && <span className="fs-5 fw-bold">Classes</span>}
                    </Link>
                </div>
            </div>
            <div style={{
                marginLeft: collapsed ? "80px" : "250px", // matchinng the Sidebar width
                transition: "margin-left 0.3s",
                width: `calc(100% - ${collapsed ? "80px" : "250px"})`,
                }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-3 p-2">
                        <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                            <i className="bi bi-journals fs-1 text-info"></i>
                            <div>
                            <span>Total Classes</span>
                            <h2>{classes.length}</h2>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 p-2">
                        <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                            <i className="bi bi-people fs-1 text-primary"></i>
                            <div>
                            <span>Total Students</span>
                            <h2>{classes.reduce((total, cls) => total + (cls.registered_students || 0), 0)}</h2>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 p-2">
                        <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                            <i className="bi bi-building fs-1 text-success"></i>
                            <div>
                            <span>Venues Used</span>
                            <h2>{new Set(classes.map(cls => cls.venue)).size}</h2>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 p-2">
                        <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                            <i className="bi bi-clock fs-1 text-warning"></i>
                            <div>
                            <span>Time Slots</span>
                            <h2>{new Set(classes.map(cls => cls.time)).size}</h2>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Classes Table */}
                    <div className="row mt-3">
                        <div className="col-12 p-2">
                            <div className="bg-white p-3 border shadow-sm">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">All Classes</h5>
                                <button className="btn btn-dark" onClick={getClasses}>
                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                    Refresh
                                </button>
                                </div>
                                
                                {loading ? (
                                <div className="text-center p-4">
                                    <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">Loading classes...</p>
                                </div>
                                ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>Class Name</th>
                                        <th>Faculty ID</th>
                                        <th>Course ID</th>
                                        {/* <th>Lecture ID</th> */}
                                        <th>Students</th>
                                        <th>Venue</th>
                                        <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classes.length > 0 ? (
                                        classes.map((cls) => (
                                            <tr key={cls.id}>
                                            <td>{cls.id}</td>
                                            <td className="fw-bold">{cls.class_name}</td>
                                            <td>{cls.faculty_id}</td>
                                            <td>{cls.course_id}</td>
                                            {/* <td>{cls.lecture_id}</td> */}
                                            <td>{cls.registered_students}</td>
                                            <td>{cls.venue}</td>
                                            <td>{cls.time}</td>
                                            </tr>
                                        ))
                                        ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center text-muted py-4">
                                            No classes found in the database
                                            </td>
                                        </tr>
                                        )}
                                    </tbody>
                                    </table>
                                </div>
                                )}
                            </div>
                    </div>
                </div> 
            </div>
        </div>
        </div>
    )
}
export default Classes;
