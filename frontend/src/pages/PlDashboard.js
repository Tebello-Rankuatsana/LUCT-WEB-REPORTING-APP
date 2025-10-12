import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.webp';

function PlDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="d-flex">
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
              <i className="bi bi-speedometer2 fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Dashboard</span>}
            </Link>
          </li>
          <li className="nav-item my-1">
            <Link
              to="/Report"
              className="d-flex align-items-center p-2 text-white text-decoration-none"
            >
              <i className="bi bi-grid fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Report</span>}
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

      <div
        style={{
          marginLeft: collapsed ? "80px" : "250px",
          transition: "margin-left 0.3s",
          width: `calc(100% - ${collapsed ? "80px" : "250px"})`,
        }}
        className="p-3 bg-light"
      >
        <div className="container-fluid">
          {/* Stats Row */}
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-journals fs-1 text-primary"></i>
                <div>
                  <span>Total Courses</span>
                  <h2>15</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-person-check fs-1 text-success"></i>
                <div>
                  <span>Assigned Lecturers</span>
                  <h2>25</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-clipboard-data fs-1 text-info"></i>
                <div>
                  <span>Reports from PRLs</span>
                  <h2>8</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-plus-circle fs-1 text-warning"></i>
                <div>
                  <span>Modules to Assign</span>
                  <h2>2</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Course Management Row */}
          <div className="row mt-3">
            <div className="col-12 col-md-8 p-2">
              <div className="bg-white p-3 border shadow-sm">
                <h5>Course Management</h5>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Principal Lecturer</th>
                        <th>Assigned Lecturers</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>BIWD2110</td>
                        <td>Web Design</td>
                        <td>Dr. Smith</td>
                        <td>3</td>
                        <td>
                          <span className="badge bg-success">Active</span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-dark">Manage</button>
                        </td>
                      </tr>
                      <tr>
                        <td>BIDS2111</td>
                        <td>Database Systems</td>
                        <td>Prof. Johnson</td>
                        <td>2</td>
                        <td>
                          <span className="badge bg-success">Active</span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-dark">Manage</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="btn btn-dark mt-2">Add New Course</button>
              </div>
            </div>

            <div className="col-12 col-md-4 p-2">
              {/* Quick Actions */}
              <div className="bg-white p-3 border shadow-sm">
                <h5>Quick Actions</h5>
                <button className="btn btn-dark w-100 mb-2">Add Course</button>
                <button className="btn btn-outline-dark w-100 mb-2">Assign Modules</button>
                <button className="btn btn-outline-dark w-100 mb-2">View PRL Reports</button>
                <button className="btn btn-outline-dark w-100 mb-2">Monitor Classes</button>
                <button className="btn btn-outline-dark w-100">Manage Lecturers</button>
              </div>

              {/* Recent PRL Reports */}
              <div className="bg-white p-3 border shadow-sm mt-3">
                <h5>Recent PRL Reports</h5>
                <div className="alert alert-info p-2">
                  <small>
                    <strong>Dr. Smith:</strong> Submitted Web Design program review
                  </small>
                </div>
                <div className="alert alert-info p-2">
                  <small>
                    <strong>Prof. Johnson:</strong> Database Systems attendance report
                  </small>
                </div>
                <div className="alert alert-info p-2">
                  <small>
                    <strong>Dr. Brown:</strong> Software Engineering curriculum update
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlDashboard;
