import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import RegistrationForm from './pages/registration';
import TaxpayerDashboard from './componenets/taxpayerDashboard';
import ConsultantDashboard from './componenets/ConsultantDashboard';
import IRSLandingPage from './pages/landing';
import ETaxDashboard from './componenets/CorporateDashboard';
import ETaxAdminDashboard from './componenets/StaffDashboard';

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IRSLandingPage />} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path='/taxpayer-dashboard' element={<TaxpayerDashboard/>}>
            <Route index element={<TaxpayerDashboard />} />
            <Route path='profile-management' element={<TaxpayerDashboard />} />
            <Route path='view-profile' element={<TaxpayerDashboard />} />
            <Route path='update-info' element={<TaxpayerDashboard />} />
            <Route path='upload-documents' element={<TaxpayerDashboard />} />
            <Route path='family-relations' element={<TaxpayerDashboard />} />
          </Route>
          <Route path='/corporate-dashboard' element={<ETaxDashboard/>} />
          <Route path='/consultant-dashboard' element={<ConsultantDashboard/>} />
          <Route path='/staff-dashboard' element={<ETaxAdminDashboard/>} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;
