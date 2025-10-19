import { useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import logo from '../images/logo.webp';

function Reports() {
    const [collapsed, setCollapsed] = useState(false)
    const toggleSidebar = () => setCollapsed(!collapsed);
    const [formData, setFormData] = useState({
        class_id: '',
        week: '',
        date: '',
        student_present: '',
        topic: '',
        outcomes: '',
        recommendations: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await API.post('/api/reports', {
                class_id: parseInt(formData.class_id),
                week: parseInt(formData.week),
                date: formData.date,
                student_present: parseInt(formData.student_present),
                topic: formData.topic,
                outcomes: formData.outcomes,
                recommendations: formData.recommendations
            });

            setMessage('Report submitted successfully!');
            
            setFormData({
                class_id: '',
                week: '',
                date: '',
                student_present: '',
                topic: '',
                outcomes: '',
                recommendations: ''
            });

            setTimeout(() => {
                navigate('/lecturer');
            }, 2000);

        } catch (error) {
            console.error('Error submitting report:', error);
            setError('Failed to submit report. Please try again.');
        }
    };

    return (
        <div className='d-flex vh-100'>
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
                    {!collapsed && <span className="fs-5 fw-bold">Lecturer</span>}
                    </Link>
                </div>
            </div>
        <div
        style={{
            marginLeft: collapsed ? "80px": "250px",
            transition: "margin-left 0.3s",
            width: `calc(100% - ${collapsed ? "80px" : "250px"})`,
        }}
        className='p-3 bg-light min-vh-100'
        >
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white">
                            <h4 className="mb-0">Lecturer Reporting Form</h4>
                            <small>FICT</small>
                        </div>
                        <div className="card-body p-4">
                            {message && (
                                <div className="alert alert-success">{message}</div>
                            )}
                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Class ID *</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="class_id"
                                                value={formData.class_id}
                                                onChange={handleChange}
                                                placeholder="Enter class ID"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Week *</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="week"
                                                value={formData.week}
                                                onChange={handleChange}
                                                placeholder="Enter week number"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Date *</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Students Present *</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="student_present"
                                                value={formData.student_present}
                                                onChange={handleChange}
                                                min="0"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Topic Taught *</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        placeholder="Describe the topic covered in this lecture..."
                                        maxLength="30"
                                        required
                                    ></textarea>
                                    <small className="text-muted">Maximum 30 characters</small>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Learning Outcomes *</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="outcomes"
                                        value={formData.outcomes}
                                        onChange={handleChange}
                                        placeholder="List the learning outcomes achieved..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Recommendations</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="recommendations"
                                        value={formData.recommendations}
                                        onChange={handleChange}
                                        placeholder="Any recommendations for improvement..."
                                        maxLength="100"
                                    ></textarea>
                                    <small className="text-muted">Maximum 100 characters</small>
                                </div>

                                <div className="d-flex gap-2 justify-content-end">
                                    <button 
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/lecturer')}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-dark">
                                        Submit Report
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Reports;