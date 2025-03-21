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
                {
                    id: 1,
                    title: 'Hospital Management System',
                    subTitle: 'Healthcare Administration Platform',
                    shortDescription: 'A system for managing hospital operations',
                    abstract: 'This project provides an efficient hospital management solution with patient records, appointment scheduling, and billing management.',
                    keywords: 'healthcare, management, system',
                    supervisor: 'Dr. Nabin Shrestha',
                    externalExaminer: 'Prof. Aashish Karki',
                    author: 'Suman Gautam',
                    faculty: 'BCA',
                    batch: '2023-A',
                    medium: 'English',
                    issueDate: '2023-01-20',
                    vivaDate: '2023-04-15',
                    submissionDate: '2023-03-28'
                },
                {
                    id: 2,
                    title: 'Library Automation System',
                    subTitle: 'Digital Library Management',
                    shortDescription: 'An automated system for managing library resources',
                    abstract: 'A digital library system that helps in managing book records, borrower information, and automated issuing/returning processes.',
                    keywords: 'library, automation, database',
                    supervisor: 'Dr. Sujata Basnet',
                    externalExaminer: 'Prof. Rajendra Thapa',
                    author: 'Pratik Tamang',
                    faculty: 'BIT',
                    batch: '2023-B',
                    medium: 'Nepali',
                    issueDate: '2023-02-15',
                    vivaDate: '2023-05-10',
                    submissionDate: '2023-04-20'
                },
                {
                    id: 3,
                    title: 'Tourism Management System',
                    subTitle: 'Travel and Tour Booking Platform',
                    shortDescription: 'A web platform for travel and tour management',
                    abstract: 'A system to facilitate travel bookings, tour packages, and hotel reservations with a user-friendly interface.',
                    keywords: 'tourism, travel, booking',
                    supervisor: 'Dr. Ram Bahadur Rana',
                    externalExaminer: 'Prof. Milan Maharjan',
                    author: 'Bikash Lama',
                    faculty: 'CSIT',
                    batch: '2024-A',
                    medium: 'English',
                    issueDate: '2023-03-10',
                    vivaDate: '2023-06-05',
                    submissionDate: '2023-05-15'
                },
                {
                    id: 4,
                    title: 'Smart Farming System',
                    subTitle: 'IoT-based Agricultural Monitoring',
                    shortDescription: 'A smart solution for modern agriculture',
                    abstract: 'An IoT-based agricultural monitoring system that helps farmers track soil moisture, temperature, and weather conditions in real-time.',
                    keywords: 'agriculture, IoT, smart farming',
                    supervisor: 'Dr. Anisha Shakya',
                    externalExaminer: 'Prof. Ramesh K.C.',
                    author: 'Ramesh Magar',
                    faculty: 'BCA',
                    batch: '2024-B',
                    medium: 'Nepali',
                    issueDate: '2023-04-05',
                    vivaDate: '2023-07-12',
                    submissionDate: '2023-06-25'
                },
                {
                    id: 5,
                    title: 'E-Voting System',
                    subTitle: 'Secure Online Voting Platform',
                    shortDescription: 'A blockchain-based online voting system',
                    abstract: 'A secure and transparent online voting system leveraging blockchain technology for fair elections and reducing fraud.',
                    keywords: 'e-voting, blockchain, security',
                    supervisor: 'Dr. Pratiksha Rai',
                    externalExaminer: 'Prof. Mahesh Shrestha',
                    author: 'Santosh Gurung',
                    faculty: 'BIT',
                    batch: '2025-A',
                    medium: 'English',
                    issueDate: '2023-05-10',
                    vivaDate: '2023-08-20',
                    submissionDate: '2023-07-30'
                },
                {
                    id: 6,
                    title: 'AI Chatbot for Customer Support',
                    subTitle: 'AI-based Virtual Assistant',
                    shortDescription: 'A chatbot for automated customer support',
                    abstract: 'An AI-driven chatbot that can assist users with inquiries and provide automated customer support through natural language processing.',
                    keywords: 'AI, chatbot, customer service',
                    supervisor: 'Dr. Deepak Adhikari',
                    externalExaminer: 'Prof. Kabita Gurung',
                    author: 'Sunita Bhandari',
                    faculty: 'CSIT',
                    batch: '2023-A',
                    medium: 'Nepali',
                    issueDate: '2023-06-15',
                    vivaDate: '2023-09-10',
                    submissionDate: '2023-08-25'
                }
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