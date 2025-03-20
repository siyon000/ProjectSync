import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectSubmissionPage from './pages/ProjectSubmissionPage';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/submit" element={<ProjectSubmissionPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </HashRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;