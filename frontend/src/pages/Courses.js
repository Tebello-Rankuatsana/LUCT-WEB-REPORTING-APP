import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";
import logo from '../images/logo.webp';

function Courses() {
  const [collapsed, setCollapsed] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await API.get("/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
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
                        to="/Principal"
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
                        {!collapsed && <span className="fs-5 fw-bold">Reports</span>}
                    </Link>
                </li>
                <li className="nav-item my-1">
                    <Link
                        to="/Ratin"
                        className="d-flex align-items-center p-2 text-white text-decoration-none"
                    >
                        <i className="bi bi-star fs-4 me-3"></i>
                        {!collapsed && <span className="fs-5 fw-bold">Ratings</span>}
                    </Link>
                </li>
                <li className="nav-item my-1">
                    <Link
                        to="/Courses"
                        className="d-flex align-items-center p-2 text-white text-decoration-none"
                    >
                        <i className="bi bi-ui-radios fs-4 me-3"></i>
                        {!collapsed && <span className="fs-5 fw-bold">Courses</span>}
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
            {!collapsed && <span className="fs-5 fw-bold">Profile</span>}
            </Link>
        </div>
    </div>

      <div style={{
          marginLeft: collapsed ? "80px" : "250px",
          transition: "margin-left 0.3s",
          width: `calc(100% - ${collapsed ? "80px" : "250px"})`,
        }}>
        <div className="container-fluid p-3">
          {/* Stats Row */}
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-journals fs-1 text-info"></i>
                <div>
                  <span>Total Courses</span>
                  <h2>{courses.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-person-standing fs-1 text-primary"></i>
                <div>
                  <span>Lecturers</span>
                  <h2>{new Set(courses.map(course => course.lecturer_id)).size}</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-building fs-1 text-success"></i>
                <div>
                  <span>Departments</span>
                  <h2>{new Set(courses.map(course => course.department)).size}</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-book fs-1 text-warning"></i>
                <div>
                  <span>Active Courses</span>
                  <h2>{courses.filter(course => course.status === 'active').length}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Table */}
          <div className="row mt-3">
            <div className="col-12 p-2">
              <div className="bg-white p-3 border shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">All Courses</h5>
                  <button className="btn btn-dark" onClick={fetchCourses}>
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Refresh
                  </button>
                </div>
                
                {loading ? (
                  <div className="text-center p-4">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading courses...</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Course Name</th>
                          <th>Course Code</th>
                          <th>Lecturer</th>
                          <th>Department</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.length > 0 ? (
                          courses.map((course) => (
                            <tr key={course.id}>
                              <td>{course.id}</td>
                              <td className="fw-bold">{course.course_name}</td>
                              <td>{course.code}</td>
                              <td>{course.lecturer_name}</td>
                              <td>{course.department}</td>
                              <td>
                                <span className={`badge ${course.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                  {course.status || 'active'}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center text-muted py-4">
                              No courses found in the database
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
  );
}

export default Courses;