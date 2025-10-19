import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.webp';
import API from '../api/axios';

function ViewLecturers() {
  const [collapsed, setCollapsed] = useState(false);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/lecturers');
      setLecturers(response.data);
    } catch (error) {
      console.error('Error fetching lecturers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar - Consistent with other pages */}
      <div
        className="sidebar d-flex flex-column bg-black text-white vh-100 position-fixed"
        style={{ width: collapsed ? "80px" : "250px", transition: "width 0.3s" }}
      >
        <button
          className="btn btn-light m-2"
          onClick={toggleSidebar}
          style={{ alignSelf: collapsed ? "center" : "flex-end" }}
        >
          <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"}`}></i>
        </button>
        <div className="px-3 mt-2 d-flex align-items-center">
          <Link to="/" className="d-flex align-items-center text-white text-decoration-none">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: collapsed ? "40px" : "50px",
                height: collapsed ? "40px" : "50px",
                transition: "width 0.3s, height 0.3s",
              }}
            />
            {!collapsed && <span className="fs-4 fw-bold ms-2">LIMKOKWING</span>}
          </Link>
        </div>

        <hr className="text-white mt-2" />

        <ul className="nav nav-pills flex-column mt-2 px-2 flex-grow-1">
          <li className="nav-item my-1">
            <Link
              to="/"
              className="d-flex align-items-center p-2 text-white text-decoration-none"
            >
              <i className="bi bi-door-open fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Back</span>}
            </Link>
          </li>
          <li className="nav-item my-1">
            <Link
              to="/prl-dashboard"
              className="d-flex align-items-center p-2 text-white text-decoration-none"
            >
              <i className="bi bi-journals fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Classes</span>}
            </Link>
          </li>
          <li className="nav-item my-1">
            <Link
              to="/prl-dashboard?tab=courses"
              className="d-flex align-items-center p-2 text-white text-decoration-none"
            >
              <i className="bi bi-file-spreadsheet fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Courses</span>}
            </Link>
          </li>
          <li className="nav-item my-1">
            <Link
              to="/view-lecturers"
              className="d-flex align-items-center p-2 text-white text-decoration-none active"
            >
              <i className="bi bi-people fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">View Lecturers</span>}
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
            {!collapsed && <span className="fs-5 fw-bold">PRL</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: collapsed ? "80px" : "250px",
          transition: "margin-left 0.3s",
          width: `calc(100% - ${collapsed ? "80px" : "250px"})`,
        }}
        className="p-3 bg-light min-vh-100"
      >
        <div className="container-fluid">
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="text-dark mb-1">View Lecturers</h2>
              <p className="text-muted mb-0">Manage and view all lecturer information</p>
            </div>
            <div className="text-end">
              <span className="badge bg-dark fs-6">Total: {lecturers.length}</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="row mb-4">
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-people fs-1 text-info"></i>
                <div>
                  <span>Total Lecturers</span>
                  <h2>{lecturers.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-person-check fs-1 text-success"></i>
                <div>
                  <span>Active</span>
                  <h2>{lecturers.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-envelope fs-1 text-primary"></i>
                <div>
                  <span>Contact</span>
                  <h2>{lecturers.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-building fs-1 text-warning"></i>
                <div>
                  <span>Departments</span>
                  <h2>4</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Lecturers Table */}
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                <i className="bi bi-people me-2"></i>
                Lecturers List
              </h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading lecturers...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lecturers.map((lecturer) => (
                        <tr key={lecturer.id}>
                          <td>
                            <span className="badge bg-secondary">#{lecturer.id}</span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                                   style={{width: '40px', height: '40px'}}>
                                <span className="text-white fw-bold">
                                  {lecturer.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <strong>{lecturer.name}</strong>
                              </div>
                            </div>
                          </td>
                          <td>
                            <a href={`mailto:${lecturer.email}`} className="text-decoration-none">
                              {lecturer.email}
                            </a>
                          </td>
                          <td>
                            <span className="badge bg-primary">{lecturer.role}</span>
                          </td>
                          <td>
                            <span className="badge bg-success">
                              <i className="bi bi-check-circle me-1"></i>
                              Active
                            </span>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <button 
                                className="btn btn-outline-dark btn-sm"
                                title="View Profile"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button 
                                className="btn btn-outline-primary btn-sm"
                                title="Edit Lecturer"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button 
                                className="btn btn-outline-info btn-sm"
                                title="Contact"
                              >
                                <i className="bi bi-envelope"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!loading && lecturers.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-people display-1 text-muted"></i>
                  <h4 className="text-muted mt-3">No Lecturers Found</h4>
                  <p className="text-muted">There are currently no lecturers in the system.</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">
                  <h6 className="mb-0">Quick Actions</h6>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-dark text-start">
                      <i className="bi bi-plus-circle me-2"></i>
                      Add New Lecturer
                    </button>
                    <button className="btn btn-outline-dark text-start">
                      <i className="bi bi-envelope me-2"></i>
                      Send Bulk Email
                    </button>
                    <button className="btn btn-outline-dark text-start">
                      <i className="bi bi-download me-2"></i>
                      Export List
                    </button>
                    <button className="btn btn-outline-dark text-start">
                      <i className="bi bi-printer me-2"></i>
                      Print Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">
                  <h6 className="mb-0">Department Overview</h6>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <small className="text-muted">FICT</small>
                    <div className="progress mb-2">
                      <div className="progress-bar bg-primary" style={{width: '60%'}}>
                        3 lecturers
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <small className="text-muted">FABE</small>
                    <div className="progress mb-2">
                      <div className="progress-bar bg-success" style={{width: '40%'}}>
                        2 lecturers
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <small className="text-muted">FBMG</small>
                    <div className="progress mb-2">
                      <div className="progress-bar bg-warning" style={{width: '20%'}}>
                        1 lecturer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewLecturers;