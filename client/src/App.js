import './App.css';
import Navbar from './Components/Navbar';
import Homepage from './Components/Homepage';
import Footer from './Components/Footer';
import DoctorSubmitDetails from './Components/DoctorSubmitDetails';
import { Route,Routes } from 'react-router-dom';
import PatientSignin from './Components/PatientSignin';
import PatientSignup from './Components/PatientSignup';
import DoctorSignin from './Components/DoctorSignin';
import DoctorSignup from './Components/DoctorSignup';
import DoctorMenu from './Components/DoctorMenu';
import DoctorAccessRecord from './Components/DoctorAccessRecord';
import DoctorSignup2 from "./Components/DoctorSignup2";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/patientsignin" element={<PatientSignin />} />
        <Route path="/patientsignup" element={<PatientSignup />} />
        <Route path="/doctorsignin" element={<DoctorSignin />} />
        <Route path="/doctorsignup" element={<DoctorSignup />} />
        <Route path="/doctorsignup2" element={<DoctorSignup2 />} />
        <Route path="/doctorsubmitdetails" element={<DoctorSubmitDetails />} />
        <Route path="/doctormenu" element={<DoctorMenu />} />
        <Route path="/doctoraccessrecord" element={<DoctorAccessRecord />} />
        <Route path="*" element={<h1 style={{fontSize:100,textAlign:'center',paddingTop:'18%',paddingBottom:'17.5%'}}>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;