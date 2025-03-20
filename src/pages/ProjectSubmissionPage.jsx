import React from 'react';
import NavBar from '../components/common/NavBar';
import ProjectReportForm from '../components/project/ProjectReportForm';

const ProjectSubmissionPage = () => {
    return (
        <div className="project-submission-page">
            <NavBar />
            <div className="container">
                <ProjectReportForm />
            </div>
        </div>
    );
};

export default ProjectSubmissionPage;