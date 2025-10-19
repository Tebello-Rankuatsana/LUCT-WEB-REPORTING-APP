import '../styles/sidebar.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo.webp';

function Sidebar({ collapsed, toggleSidebar }){

    return(
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
    )
}
export default Sidebar;