import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './pages/sharedPages/login';
import Student from './pages/StudentDashboard';
import Lecturer from './pages/LecturerDashboard';
import Principal from './pages/PrlDashboard';
import ProgramLeader from './pages/PlDashboard';
import Report from './pages/Reports';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          {/* the primary page(first thing you see.) */}
            <Route path='/' element={<Login/>}/>
            <Route path='/lecturer' element={<Lecturer/>}/>
            <Route path='/Student' element={<Student/>}/>
            <Route path='/Principal' element={<Principal/>}/>
            <Route path='/Program-leader' element={<ProgramLeader/>}/>
            <Route path='/Report' element={<Report/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
