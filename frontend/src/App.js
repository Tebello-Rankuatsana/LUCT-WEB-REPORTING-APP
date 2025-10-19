import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './pages/sharedPages/login';
import Student from './pages/StudentDashboard';
import Lecturer from './pages/LecturerDashboard';
import Principal from './pages/PrlDashboard';
import ProgramLeader from './pages/PlDashboard';
import Report from './pages/Reports';
import Classes from './pages/Classes';
import Ratings from './pages/Ratings';
import Lecturers from './pages/Lecturers';
import ViewLecturers from './pages/ViewLecturers';
import StudentRateLecturer from './pages/Student_Ratings';
import Courses from './pages/Courses';

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
            <Route path='/Classes' element={<Classes/>}/>
            <Route path='/Ratings' element={<Ratings/>}/>
            <Route path='/Classes' element={<Classes/>}/>
            <Route path='/Ratings' element={<Ratings/>}/>
            <Route path='/Lecturers' element={<Lecturers/>}/>
            <Route path='/ViewLecturers' element={<ViewLecturers/>}/>
            <Route path='/rate-lecturer' element={<StudentRateLecturer/>}/>
            <Route path='/Courses' element={<Courses/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
