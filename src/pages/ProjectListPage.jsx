import React from 'react';
import NavBar from '../components/common/NavBar';
import ProjectReportList from '../components/project/ProjectReportList';

const ProjectListPage = () => {
    return (
        <div className="project-list-page">
            <NavBar />
            <div className="container">
                <ProjectReportList />
            </div>
        </div>
    );
};

export default ProjectListPage;