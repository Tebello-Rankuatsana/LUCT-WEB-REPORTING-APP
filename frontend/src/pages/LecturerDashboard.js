import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
import Content from '../components/ContentOne';
import { useState } from 'react';

function Lecturer(){
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);


    return(
        <div className="d-flex">
            <div className="w-auto h-auto">
                <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar}/>
            </div>
            <div style={{
                marginLeft: collapsed ? "80px" : "250px", // matchinng the Sidebar width
                transition: "margin-left 0.3s",
                width: `calc(100% - ${collapsed ? "80px" : "250px"})`,
                }}>
                {/* <Navbar/> */}
                <Content/>
            </div>
        </div>
    )
}
export default Lecturer;