import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectSubmissionPage from './pages/ProjectSubmissionPage';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import './App.css';

// Fix: Redirect from root (/) or "/ProjectSync/" to "/#/login"
function RedirectToLogin() {
  const location = useLocation();
  if (location.pathname === "/") {
    return <Navigate to="/login" replace />;
  }
  return null;
}

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          <RedirectToLogin />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/submit-project" element={<ProjectSubmissionPage />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Catch-all redirect */}
          </Routes>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
