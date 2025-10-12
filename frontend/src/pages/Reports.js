// src/pages/Reports.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Reports() {
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

    const user = JSON.parse(localStorage.getItem('user'));

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
            await axios.post('http://localhost:5000/api/reports', {
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
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white">
                            <h4 className="mb-0">LUCT Lecturer Reporting Form</h4>
                            <small>Faculty of Information Communication Technology</small>
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
                                        onClick={() => navigate('/dashboard')}
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
    );
}

export default Reports;