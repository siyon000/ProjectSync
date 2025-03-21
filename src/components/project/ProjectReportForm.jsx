import React, { useState } from 'react';
import {
    Upload, Save, Calendar, CheckCircle, AlertCircle,
    ArrowLeft, HelpCircle, Book, User,
    Briefcase, Tag, FileText, School, Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectContext';

function ProjectReportForm() {
    const navigate = useNavigate();
    const { addProject, projects } = useProjects();
    const [currentStep, setCurrentStep] = useState(1);
    const [projectData, setProjectData] = useState({
        title: '',
        subTitle: '',
        shortDescription: '',
        abstract: '',
        keywords: '',
        supervisor: '',
        externalExaminer: '',
        author: '',
        faculty: '',
        batch: '',
        medium: 'Online',
        issueDate: '',
        vivaDate: '',
        submissionDate: '',
        reportFile: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [fileUploadProgress, setFileUploadProgress] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showTooltip, setShowTooltip] = useState('');

    // Get unique options for dropdowns
    const facultyOptions = ['Engineering', 'CSIT', 'BIT', 'BCA'];
    const batchOptions = ['2023-A', '2023-B', '2024-A', '2024-B', '2025-A'];
    const mediumOptions = ["English", "Nepali"];

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Use functional update to ensure we're working with the latest state
        setProjectData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Clear error for this field if it exists
        if (formErrors[name]) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setFormErrors(prev => ({ ...prev, reportFile: 'File size exceeds 10MB limit' }));
                return;
            }

            setProjectData(prev => ({ ...prev, reportFile: file }));
            simulateFileUpload();
        }
    };

    const simulateFileUpload = () => {
        setFileUploadProgress(0);
        const interval = setInterval(() => {
            setFileUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    const validateStep = (step) => {
        const errors = {};

        if (step === 1) {
            const step1Fields = ['title', 'subTitle', 'shortDescription', 'abstract', 'keywords'];
            step1Fields.forEach(field => {
                if (field !== 'subTitle' && !projectData[field]) {
                    errors[field] = 'This field is required';
                }
            });
        } else if (step === 2) {
            const step2Fields = ['supervisor', 'externalExaminer', 'author', 'faculty', 'batch'];
            step2Fields.forEach(field => {
                if (!projectData[field]) {
                    errors[field] = 'This field is required';
                }
            });
        } else if (step === 3) {
            const step3Fields = ['medium', 'issueDate', 'vivaDate', 'submissionDate'];
            step3Fields.forEach(field => {
                if (!projectData[field]) {
                    errors[field] = 'This field is required';
                }
            });

            if (!projectData.reportFile) {
                errors.reportFile = 'Please upload a report file';
            }

            // Date validation
            if (projectData.issueDate && projectData.submissionDate) {
                const issueDate = new Date(projectData.issueDate);
                const submissionDate = new Date(projectData.submissionDate);

                if (submissionDate < issueDate) {
                    errors.submissionDate = 'Submission date cannot be before issue date';
                }
            }

            if (projectData.vivaDate && projectData.submissionDate) {
                const vivaDate = new Date(projectData.vivaDate);
                const submissionDate = new Date(projectData.submissionDate);

                if (submissionDate < vivaDate) {
                    errors.submissionDate = 'Submission date cannot be before viva date';
                }
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            // Focus on first error
            const firstErrorField = document.querySelector('.error-field');
            firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateStep(currentStep)) {
            // Focus on first error
            const firstErrorField = document.querySelector('.error-field');
            firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setIsSubmitting(true);

        // Simulate submission process
        setTimeout(() => {
            try {
                addProject(projectData);
                setShowSuccess(true);
                setTimeout(() => navigate('/projects'), 1500);
            } catch (error) {
                console.error('Error submitting project:', error);
                setFormErrors(prev => ({
                    ...prev,
                    general: 'Failed to submit project. Please try again.'
                }));
            } finally {
                setIsSubmitting(false);
            }
        }, 1000);
    };
    const Tooltip = ({ content, visible }) => {
        if (!visible) return null;

        return (
            <div className="absolute z-10 p-2 bg-gray-800 text-white text-xs rounded shadow-lg max-w-xs -mt-10 ml-6">
                {content}
                <div className="absolute -bottom-1 left-3 w-2 h-2 bg-gray-800 transform rotate-45"></div>
            </div>
        );
    };

    const ProgressIndicator = () => {
        return (
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex flex-col items-center">
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium 
                ${currentStep === step
                                        ? 'bg-blue-600 text-white'
                                        : currentStep > step
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-600'}`}
                            >
                                {currentStep > step ? <CheckCircle size={16} /> : step}
                            </div>
                            <div className="text-xs mt-1 font-medium text-gray-600">
                                {step === 1 ? 'Project Details' : step === 2 ? 'Team Info' : 'Documents & Dates'}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className={`h-1 rounded-full ${currentStep > 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    <div className={`h-1 rounded-full ${currentStep > 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                </div>
            </div>
        );
    };

    const renderField = (id, label, required = false, type = "text", options = null, rows = null, placeholder = "", icon = null, tooltip = null) => {
        const baseInputClasses = `w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${formErrors[id] ? 'border-red-500 error-field' : 'border-gray-300'}`;

        return (
            <div className="relative">
                <div className="flex items-center mb-1">
                    <label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center">
                        {icon && React.cloneElement(icon, { className: "w-4 h-4 mr-1" })}
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    {tooltip && (
                        <div className="relative ml-2">
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                onMouseEnter={() => setShowTooltip(id)}
                                onMouseLeave={() => setShowTooltip('')}
                                aria-label={`Help for ${label}`}
                            >
                                <HelpCircle className="w-4 h-4" />
                            </button>
                            <Tooltip content={tooltip} visible={showTooltip === id} />
                        </div>
                    )}
                </div>

                {options ? (
                    <select
                        id={id}
                        name={id}
                        value={projectData[id] || ''}
                        onChange={handleChange}
                        className={baseInputClasses}
                    >
                        <option value="">Select {label}</option>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                ) : rows ? (
                    <textarea
                        id={id}
                        name={id}
                        value={projectData[id] || ''}
                        onChange={handleChange}
                        rows={rows}
                        placeholder={placeholder}
                        className={baseInputClasses}
                    />
                ) : type === "file" ? (
                    <div className="space-y-2">
                        <div className="flex items-center w-full">
                            <label
                                htmlFor={id}
                                className={`flex items-center justify-center w-full px-4 py-2 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${formErrors[id] ? 'border-red-500 error-field' : 'border-blue-300'}`}
                            >
                                <div className="flex flex-col items-center space-y-2 py-4">
                                    <Upload className="w-8 h-8 text-blue-500" />
                                    <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                                    <span className="text-xs text-gray-500">PDF, DOC, DOCX, ZIP (max 10MB)</span>
                                </div>
                                <input
                                    type="file"
                                    id={id}
                                    name={id}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx,.zip"
                                />
                            </label>
                        </div>
                        {projectData.reportFile && fileUploadProgress < 100 && (
                            <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${fileUploadProgress}%` }}></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Uploading: {fileUploadProgress}%</p>
                            </div>
                        )}
                        {projectData.reportFile && fileUploadProgress === 100 && (
                            <div className="flex items-center mt-2 p-2 bg-green-50 rounded border border-green-100">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                <div className="overflow-hidden">
                                    <p className="text-sm text-green-700 truncate">{projectData.reportFile.name}</p>
                                    <p className="text-xs text-green-600">
                                        {(projectData.reportFile.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <input
                        type={type}
                        id={id}
                        name={id}
                        value={projectData[id] || ''}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={baseInputClasses}
                    />
                )}

                {formErrors[id] && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {formErrors[id]}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="bg-gray-50 p-4 md:p-8">
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center max-w-md mx-auto">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                            <CheckCircle className="text-green-500 w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">Success!</h3>
                        <p className="text-gray-600 mb-6 text-center">Your project has been submitted successfully.</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                            <div className="bg-green-500 h-1.5 rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-sm text-gray-500">Redirecting to projects list...</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Project Report Form</h2>
                    <p className="text-center text-gray-600 mb-4">Submit your project details and documentation</p>

                    {formErrors.general && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <div className="flex">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                <span>{formErrors.general}</span>
                            </div>
                        </div>
                    )}

                    <ProgressIndicator />
                </div>

                <div className="p-6">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="flex items-center p-3 bg-blue-50 rounded-md mb-4">
                                <Book className="w-5 h-5 text-blue-600 mr-2" />
                                <span className="text-sm text-blue-800">Fill in the basic information about your project</span>
                            </div>

                            {renderField(
                                "title",
                                "Project Title",
                                true,
                                "text",
                                null,
                                null,
                                "Enter the main title of your project",
                                <FileText />,
                                "The main title should be clear, concise, and reflective of your project's content"
                            )}
                            {renderField(
                                "subTitle",
                                "Sub Title",
                                false,
                                "text",
                                null,
                                null,
                                "Optional: Enter a subtitle for your project",
                                <FileText />
                            )}
                            {renderField(
                                "shortDescription",
                                "Short Description",
                                true,
                                "text",
                                null,
                                null,
                                "Provide a brief description (1-2 sentences)",
                                <FileText />,
                                "A concise summary that gives readers a quick understanding of your project"
                            )}
                            {renderField(
                                "keywords",
                                "Keywords",
                                true,
                                "text",
                                null,
                                null,
                                "e.g. web, development, AI, machine learning",
                                <Tag />,
                                "Add relevant keywords separated by commas to help categorize your project"
                            )}
                            {renderField(
                                "abstract",
                                "Abstract",
                                true,
                                "text",
                                null,
                                6,
                                "Provide a comprehensive summary of your project, including its purpose, methodology, findings, and conclusions",
                                <FileText />,
                                "A detailed summary of your project, usually 150-250 words"
                            )}
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="flex items-center p-3 bg-green-50 rounded-md mb-4">
                                <User className="w-5 h-5 text-green-600 mr-2" />
                                <span className="text-sm text-green-800">Enter information about the team and contributors</span>
                            </div>

                            {renderField(
                                "author",
                                "Author Name",
                                true,
                                "text",
                                null,
                                null,
                                "Your full name",
                                <User />
                            )}
                            {renderField(
                                "supervisor",
                                "Supervisor",
                                true,
                                "text",
                                null,
                                null,
                                "Name of your project supervisor",
                                <User />,
                                "The faculty member who guided and oversaw your project"
                            )}
                            {renderField(
                                "externalExaminer",
                                "External Examiner",
                                true,
                                "text",
                                null,
                                null,
                                "Name of the external examiner",
                                <User />,
                                "The external evaluator who will review your project"
                            )}
                            {renderField(
                                "faculty",
                                "Faculty",
                                true,
                                "text",
                                facultyOptions,
                                null,
                                null,
                                <School />
                            )}
                            {renderField(
                                "batch",
                                "Batch",
                                true,
                                "text",
                                batchOptions,
                                null,
                                null,
                                <Award />
                            )}
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div className="flex items-center p-3 bg-purple-50 rounded-md mb-4">
                                <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                                <span className="text-sm text-purple-800">Select project dates and upload your documentation</span>
                            </div>

                            {renderField(
                                "medium",
                                "Medium",
                                true,
                                "text",
                                mediumOptions,
                                null,
                                null,
                                <Briefcase />,
                                "The format in which your project will be presented"
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {renderField(
                                    "issueDate",
                                    "Issue Date",
                                    true,
                                    "date",
                                    null,
                                    null,
                                    null,
                                    <Calendar />,
                                    "The date when the project was assigned"
                                )}
                                {renderField(
                                    "vivaDate",
                                    "Viva Date",
                                    true,
                                    "date",
                                    null,
                                    null,
                                    null,
                                    <Calendar />,
                                    "The date of your oral examination"
                                )}
                                {renderField(
                                    "submissionDate",
                                    "Submission Date",
                                    true,
                                    "date",
                                    null,
                                    null,
                                    null,
                                    <Calendar />,
                                    "The final date for project submission (must be after issue date)"
                                )}
                            </div>
                            {renderField(
                                "reportFile",
                                "Upload Report",
                                true,
                                "file",
                                null,
                                null,
                                null,
                                <Upload />,
                                "Upload your complete project report in PDF, DOC, DOCX, or ZIP format (max 10MB)"
                            )}
                        </div>
                    )}
                </div>

                <div className="p-6 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                    {currentStep > 1 ? (
                        <button
                            type="button"
                            onClick={handlePrevious}
                            className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 transition-colors flex items-center"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => navigate('/projects')}
                            className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    )}

                    {currentStep < 3 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Submit
                                </>
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProjectReportForm;