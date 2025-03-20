import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectContext';

const ProjectReportList = () => {
    const { projects, loading } = useProjects();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const projectsPerPage = 4;

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleAddProject = () => {
        navigate('/submit-project');
    };

    // Get unique faculties and batches for filter dropdowns
    const faculties = [...new Set(projects.map(project => project.faculty))];
    const batches = [...new Set(projects.map(project => project.batch))];

    // Filter projects based on search term and selected filters
    const filteredProjects = projects.filter(project =>
        (searchTerm === '' || project.title.toLowerCase().includes(searchTerm.toLowerCase()) || project.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
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

            {/* Search and Filters */}
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
                    {/* Project list */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentProjects.length > 0 ? (
                                    currentProjects.map(project => (
                                        <tr key={project.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{project.id}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{project.title}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{project.author}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{project.batch}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{project.faculty}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    className="text-primary hover:text-blue-700 mr-3"
                                                    onClick={() => alert(`Project details: ${project.title}\nAuthor: ${project.author}\nAbstract: ${project.abstract}`)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                            No projects found. {searchTerm || selectedFaculty || selectedBatch ? 'Try changing your filters.' : 'Add your first project!'}
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
                </>
            )}
        </div>
    );
};

export default ProjectReportList;