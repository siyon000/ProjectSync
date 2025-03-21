import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectContext';

// New Modal Component for Project Details
const ProjectDetailModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <div className="flex justify-between items-center border-b pb-3 mb-4">
                                    <h3 className="text-2xl leading-6 font-bold text-primary" id="modal-title">
                                        {project.title}
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500"
                                        onClick={onClose}
                                    >
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800 mb-2">{project.subTitle}</h4>
                                        <p className="text-sm text-gray-500 mb-4">{project.shortDescription}</p>

                                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                            <h5 className="font-medium text-gray-700 mb-2">Abstract</h5>
                                            <p className="text-gray-600">{project.abstract}</p>
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="font-medium text-gray-700 mb-2">Keywords</h5>
                                            <div className="flex flex-wrap gap-2">
                                                {project.keywords.split(',').map((keyword, index) => (
                                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                        {keyword.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                            <h5 className="font-medium text-gray-700 mb-3">Project Details</h5>
                                            <table className="w-full text-sm">
                                                <tbody>
                                                    <tr>
                                                        <td className="py-1 font-medium text-gray-500">Author:</td>
                                                        <td className="py-1 text-gray-700">{project.author}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-1 font-medium text-gray-500">Faculty:</td>
                                                        <td className="py-1 text-gray-700">{project.faculty}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-1 font-medium text-gray-500">Batch:</td>
                                                        <td className="py-1 text-gray-700">{project.batch}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-1 font-medium text-gray-500">Medium:</td>
                                                        <td className="py-1 text-gray-700">{project.medium}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-1 font-medium text-gray-500">Supervisor:</td>
                                                        <td className="py-1 text-gray-700">{project.supervisor}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-1 font-medium text-gray-500">External Examiner:</td>
                                                        <td className="py-1 text-gray-700">{project.externalExaminer}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h5 className="font-medium text-gray-700 mb-3">Timeline</h5>
                                            <div className="flex flex-col space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-xs font-medium text-gray-500">Issue Date:</span>
                                                    <span className="text-xs text-gray-700">{project.issueDate}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-xs font-medium text-gray-500">Submission Date:</span>
                                                    <span className="text-xs text-gray-700">{project.submissionDate}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-xs font-medium text-gray-500">Viva Date:</span>
                                                    <span className="text-xs text-gray-700">{project.vivaDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectReportList = () => {
    const { projects, loading, getProject } = useProjects();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const projectsPerPage = 4;

    const handleAddProject = () => {
        navigate('/submit-project');
    };

    const handleViewProject = (projectId) => {
        const project = getProject(projectId);
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    // Get unique faculties and batches for filter dropdowns
    const faculties = [...new Set(projects.map(project => project.faculty))];
    const batches = [...new Set(projects.map(project => project.batch))];

    // Filter projects based on selected filters
    const filteredProjects = projects.filter(project =>
        (selectedFaculty === '' || project.faculty === selectedFaculty) &&
        (selectedBatch === '' || project.batch === selectedBatch)
    );

    // Pagination logic
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">Project Report List</h2>

            {/* Filters */}
            <div className="space-y-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <select
                        onChange={(e) => setSelectedFaculty(e.target.value)}
                        value={selectedFaculty}
                        className="form-select border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">Select Faculty</option>
                        {faculties.map(faculty => (
                            <option key={faculty} value={faculty}>{faculty}</option>
                        ))}
                    </select>

                    <select
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        value={selectedBatch}
                        className="form-select border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">Select Batch</option>
                        {batches.map(batch => (
                            <option key={batch} value={batch}>{batch}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleAddProject}
                        className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ml-auto"
                    >
                        Add Project
                    </button>
                </div>
            </div>

            {/* Loading state */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <>
                    {/* Project list - Responsive table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentProjects.length > 0 ? (
                                    currentProjects.map(project => (
                                        <tr key={project.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{project.id}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                <div className="max-w-xs">
                                                    <div className="truncate font-medium">{project.title}</div>
                                                    <div className="truncate text-xs text-gray-500 mt-1">{project.subTitle}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{project.author}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{project.batch}</td>
                                            <td className="px-4 py-3 text-sm font-medium">
                                                <button
                                                    className="text-primary hover:text-blue-700 mr-3"
                                                    onClick={() => handleViewProject(project.id)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                            No projects found. {selectedFaculty || selectedBatch ? 'Try changing your filters.' : 'Add your first project!'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-end mt-6">
                            <nav>
                                <ul className="flex items-center">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => setCurrentPage(index + 1)}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === index + 1
                                                    ? 'bg-primary text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                                    } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    )}

                    {/* Project Detail Modal */}
                    {selectedProject && (
                        <ProjectDetailModal project={selectedProject} onClose={closeModal} />
                    )}
                </>
            )}
        </div>
    );
};

export default ProjectReportList;