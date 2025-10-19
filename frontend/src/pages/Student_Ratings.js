import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from '../api/axios';
import logo from '../images/logo.webp';

function Student_Ratings() {
  const [collapsed, setCollapsed] = useState(false);
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleLecturerChange = (e) => {
    setSelectedLecturer(e.target.value);
    setRating(5); // Reset to default when lecturer changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedLecturer) {
      alert("Please select a lecturer first");
      return;
    }

    setSubmitting(true);
    try {
      await API.post('/api/ratings', {
        lecturer_id: selectedLecturer,
        rating: rating
      });

      setShowSuccess(true);
      setSelectedLecturer("");
      setRating(5);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting rating:', error);
      alert("Failed to submit rating. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getSelectedLecturer = () => {
    return lecturers.find(lecturer => lecturer.id === selectedLecturer);
  };

  const selectedLecturerData = getSelectedLecturer();

  return (
    <div className="d-flex vh-100">
      <div 
        className="sidebar d-flex flex-column bg-black text-white vh-100 position-fixed"
        style={{ width: collapsed ? '80px' : '250px', transition: 'width 0.3s' }}
      >        
        <button
          className="btn btn-light m-2"
          onClick={toggleSidebar}
          style={{ alignSelf: collapsed ? 'center' : 'flex-end' }}
        >
          <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
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

        {/* Navigation */}
        <ul className="nav nav-pills flex-column mt-2 px-2 flex-grow-1">
          <li className="nav-item my-1">
            <Link
              to="/Student"
              className="d-flex align-items-center p-2 text-white text-decoration-none"
            >
              <i className="bi bi-door-open fs-4 me-3"></i>
              {!collapsed && <span className="fs-5 fw-bold">Back</span>}
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

        <div className="px-2 mb-3">
          <hr className="text-white" />
          <Link
            to="/Profile"
            className="d-flex align-items-center p-2 text-white text-decoration-none"
          >
            <i className="bi bi-person-circle fs-4 me-3"></i>
            {!collapsed && <span className="fs-5 fw-bold">Lecturer Rating</span>}
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
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-person-standing fs-1 text-info"></i>
                <div>
                  <span>Total Lecturers</span>
                  <h2>{lecturers.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 p-2">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-star fs-1 text-warning"></i>
                <div>
                  <span>Your Rating</span>
                  <h2>{rating}/10</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Success Popup */}
          {showSuccess && (
            <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
              <i className="bi bi-check-circle-fill me-2"></i>
              Rating submitted successfully!
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowSuccess(false)}
              ></button>
            </div>
          )}

          {/* Ratings Form */}
          <div className="row mt-3 justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 p-2">
              <div className="bg-white p-4 border shadow-sm">
                <h5 className="mb-4">Rate Lecturer Performance</h5>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Select Lecturer</label>
                    <select
                      className="form-select"
                      value={selectedLecturer}
                      onChange={handleLecturerChange}
                    >
                      <option value="">Choose a lecturer...</option>
                      {lecturers.map(lecturer => (
                        <option key={lecturer.id} value={lecturer.id}>
                          {lecturer.name} - {lecturer.course}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedLecturer && (
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        Overall Lecturer Rating: <span className="text-primary">{rating}/10</span>
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min="1"
                        max="10"
                        step="1"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                      />
                      <div className="d-flex justify-content-between text-muted small">
                        <span>1 (Poor)</span>
                        <span>5 (Average)</span>
                        <span>10 (Excellent)</span>
                      </div>
                      
                      <div className="mt-3 p-3 bg-light rounded">
                        <small className="text-muted">
                          <i className="bi bi-info-circle me-1"></i>
                          Rating for: <strong>{selectedLecturerData?.name}</strong>
                          {selectedLecturerData?.course && (
                            <> - {selectedLecturerData.course}</>
                          )}
                        </small>
                      </div>
                    </div>
                  )}

                  <div className="d-flex gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-dark"
                      disabled={submitting || !selectedLecturer}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-star-fill me-2"></i>
                          Submit Rating
                        </>
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setSelectedLecturer("");
                        setRating(5);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student_Ratings;