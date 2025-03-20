import React, { createContext, useState, useContext, useEffect } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load initial sample data
    useEffect(() => {
        setTimeout(() => {
            // Initial sample data
            const initialProjects = [
                { id: 1, title: 'E-commerce Platform', subTitle: 'Online Shopping Solution', shortDescription: 'A comprehensive e-commerce solution', abstract: 'This project implements a full-featured e-commerce platform with user authentication, product management, and payment processing.', keywords: 'ecommerce, web development', supervisor: 'Dr. Pravash Sharma', externalExaminer: 'Prof. Lisa Tamang', author: 'Ram Rai', faculty: 'Engineering', batch: '2023-A', medium: 'English', issueDate: '2023-01-15', vivaDate: '2023-04-10', submissionDate: '2023-03-25' },
                { id: 2, title: 'Inventory System', subTitle: 'Stock Management Tool', shortDescription: 'A system to track inventory in real-time', abstract: 'An inventory management system designed to help businesses track stock levels, orders, sales, and deliveries in real-time to optimize inventory levels.', keywords: 'inventory, management, database', supervisor: 'Dr. Siru Rai', externalExaminer: 'Prof. James Rai', author: 'Siyon Rai', faculty: 'CSIT', batch: '2023-B', medium: 'English', issueDate: '2023-02-20', vivaDate: '2023-05-15', submissionDate: '2023-04-30' },
            ];
            setProjects(initialProjects);
            setLoading(false);
        }, 1000);
    }, []);

    // Add a new project
    const addProject = (projectData) => {
        const newProject = {
            ...projectData,
            id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1
        };
        setProjects([...projects, newProject]);
        return newProject;
    };

    // Get project by ID
    const getProject = (id) => {
        return projects.find(project => project.id === id);
    };

    return (
        <ProjectContext.Provider value={{
            projects,
            loading,
            addProject,
            getProject
        }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectContext);