import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.webp';

function StudentDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="sidebar d-flex flex-column bg-black text-white vh-100 position-fixed"
        style={{ width: collapsed ? "80px" : "250px", transition: "width 0.3s" }}
      >
        {/* Toggle button */}
        <button
          className="btn btn-light m-2"
          onClick={toggleSidebar}
          style={{ alignSelf: collapsed ? "center" : "flex-end" }}
        >
          <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"}`}></i>
        </button>

        {/* Logo */}
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

        {/* Navigation */}
        <ul className="nav nav-pills flex-column mt-2 px-2 flex-grow-1">
          <li className="nav-item my-1">
            <Link
              to="/student-dashboard"
              className="d-flex align-items-center p-2 text-white text-decoration-none"
            >
              <i className="bi bi-speedometer2 fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Dashboard</span>}
            </Link>
          </li>
          <li className="nav-item my-1">
            <Link
              to="/grades"
              className="d-flex align-items-center p-2 text-white text-decoration-none"
            >
              <i className="bi bi-journal-check fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Grades</span>}
            </Link>
          </li>
          <li className="nav-item my-1">
            <Link
              to="/timetable"
              className="d-flex align-items-center p-2 text-white text-decoration-none"
            >
              <i className="bi bi-calendar-week fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Timetable</span>}
            </Link>
          </li>
          <li className="nav-item my-1">
            <Link
              to="/rate-lecturer"
              className="d-flex align-items-center p-2 text-white text-decoration-none"
            >
              <i className="bi bi-star fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Rate Lecturers</span>}
            </Link>
          </li>
        </ul>

        {/* Profile Section */}
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
                <i className="bi bi-mortarboard fs-1 text-primary"></i>
                <div>
                  <span>Total Courses</span>
                  <h2>6</h2>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-clipboard-check fs-1 text-success"></i>
                <div>
                  <span>Pending Assignments</span>
                  <h2>2</h2>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-graph-up fs-1 text-info"></i>
                <div>
                  <span>Current GPA</span>
                  <h2>3.48</h2>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-clock-history fs-1 text-warning"></i>
                <div>
                  <span>Upcoming Exams</span>
                  <h2>1</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 col-md-8 p-2">
              <div className="bg-white p-3 border shadow-sm">
                <h5>Grades</h5>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Code</th>
                        <th>Grade</th>
                        <th>Lecturer</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Web Design</td>
                        <td>BIWD2110</td>
                        <td>A</td>
                        <td>Ntate Mahoasha</td>
                        <td>
                          <button className="btn btn-sm btn-outline-dark">Rate Lecturer</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Calculus 2</td>
                        <td>BIDS2111</td>
                        <td>A+</td>
                        <td>Ntate K</td>
                        <td>
                          <button className="btn btn-sm btn-outline-dark">Rate Lecturer</button>
                        </td>
                      </tr>
                      <tr>
                        <td>OOP 1 (Java)</td>
                        <td>BOP2101</td>
                        <td>A-</td>
                        <td>Dr. Linaoa</td>
                        <td>
                          <button className="btn btn-sm btn-outline-dark">Rate Lecturer</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 p-2">
              <div className="bg-white p-3 border shadow-sm mb-3">
                <h5>Timetable</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Mon 8-10 AM: Web Design</li>
                  <li className="list-group-item">Tue 10-12 AM: Calculus 2</li>
                  <li className="list-group-item">Wed 1-3 PM: OOP 1 (Java)</li>
                  <li className="list-group-item">Thu 9-11 AM: Multimedia Technology</li>
                </ul>
              </div>

              <div className="bg-white p-3 border shadow-sm">
                <h5>Quick Actions</h5>
                <button className="btn btn-dark w-100 mb-2">Rate All Lecturers</button>
                <button className="btn btn-outline-dark w-100 mb-2">View Assignments</button>
                <button className="btn btn-outline-dark w-100 mb-2">Download Timetable</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
