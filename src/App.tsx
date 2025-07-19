import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LIRSLandingPage from './pages/landing';
import LoginPage from './pages/login';
import RegistrationForm from './pages/registration';
import TaxpayerDashboard from './componenets/taxpayerDashboard';
import CorporateDashboard from './componenets/CorporateDashboard';
import ConsultantDashboard from './componenets/ConsultantDashboard';
import StaffDashboard from './componenets/StaffDashboard';

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LIRSLandingPage />} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path='/taxpayer-dashboard' element={<TaxpayerDashboard/>} />
          <Route path='/corporate-dashboard' element={<CorporateDashboard/>} />
          <Route path='/consultant-dashboard' element={<ConsultantDashboard/>} />
          <Route path='/staff-dashboard' element={<StaffDashboard/>} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;
