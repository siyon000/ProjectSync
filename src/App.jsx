import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
        <Router basename="/ProjectSync">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/submit-project" element={<ProjectSubmissionPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;