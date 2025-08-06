// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import IRSLandingPage from './pages/landing';
import LoginPage from './pages/login';
import RegistrationForm from './pages/registration';

import TaxpayerDashboard from './componenets/taxpayerDashboard';
import ConsultantDashboard from './componenets/ConsultantDashboard';
import ETaxDashboard from './componenets/CorporateDashboard';
import ETaxAdminDashboard from './componenets/StaffDashboard';

/**
 * Simple auth-check helper.
 * Replace `isAuthenticated()` with your real logic (AuthContext or Redux).
 */
const isAuthenticated = (): boolean => {
  // Example: check for presence of token in localStorage
  return Boolean(localStorage.getItem('token'));
};

/**
 * RequireAuth wrapper component: if not authenticated, redirect to /login
 * You can also pass a `redirectTo` prop if you want dynamic behaviour.
 */
const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<IRSLandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm />} />

        {/* Protected dashboard routes - wrap in RequireAuth */}
        <Route
          path="/taxpayer-dashboard/*"
          element={
            <RequireAuth>
              <TaxpayerDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/corporate-dashboard"
          element={
            <RequireAuth>
              <ETaxDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/consultant-dashboard"
          element={
            <RequireAuth>
              <ConsultantDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/staff-dashboard"
          element={
            <RequireAuth>
              <ETaxAdminDashboard />
            </RequireAuth>
          }
        />

        {/* Catch-all: redirect unknown routes to landing (or to 404 page if you add one) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
