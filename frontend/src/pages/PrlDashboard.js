import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.webp';
import API from '../api/axios';

function PrlDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/reports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

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
              <i className="bi bi-door-open fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Back</span>}
            </Link>
          </li>
          <li className="nav-item my-1">
            <Link
              to="/Report"
              className="d-flex align-items-center p-2 text-white text-decoration-none"
            >
              <i className="bi bi-file-text fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Reports</span>}
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
        className="p-3 bg-light"
      >
        <div className="container-fluid">
          {/* Stats Row */}
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-eye fs-1 text-info"></i>
                <div>
                  <span>Total Reports</span>
                  <h2>{reports.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-clipboard-check fs-1 text-success"></i>
                <div>
                  <span>This Week</span>
                  <h2>{reports.filter(report => {
                    const reportDate = new Date(report.date);
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    return reportDate >= oneWeekAgo;
                  }).length}</h2>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-book fs-1 text-primary"></i>
                <div>
                  <span>Courses</span>
                  <h2>10</h2>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-person-workspace fs-1 text-warning"></i>
                <div>
                  <span>Lecturers</span>
                  <h2>4</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 p-2">
              <div className="bg-white p-3 border shadow-sm">
                <h5>Lecturer Reports</h5>
                {loading ? (
                  <div className="text-center p-4">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading reports...</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Class ID</th>
                          <th>Week</th>
                          <th>Students Present</th>
                          <th>Topic</th>
                          <th>Learning Outcomes</th>
                          <th>Recommendations</th>
                          <th>Feedback</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reports.length > 0 ? (
                          reports.map((report) => (
                            <tr key={report.id}>
                              <td>{formatDate(report.date)}</td>
                              <td>{report.class_id}</td>
                              <td>Week {report.week}</td>
                              <td>{report.student_present}</td>
                              <td>{report.topic}</td>
                              <td>{report.outcomes}</td>
                              <td>{report.recommendations || "None"}</td>
                              <td><button className="text-white bg-dark">Send</button></td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center text-muted py-4">
                              No reports submitted yet
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

export default PrlDashboard;