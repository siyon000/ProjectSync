import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ClipboardList, LogOut, Menu, X, FileText, FolderPlus } from 'lucide-react';

const NavBar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Close mobile menu when changing routes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Check if we're on a protected route that should show the full navbar
    const isProtectedRoute = location.pathname === '/projects' || location.pathname === '/submit-project';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Determine active link for styling
    const isActive = (path) => {
        return location.pathname === path ? 'bg-blue-800' : '';
    };

    return (
        <nav className="bg-blue-700 shadow-md sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center text-white font-bold group cursor-pointer">
                        <div className="bg-white p-1 rounded-lg mr-2 shadow-sm group-hover:shadow-md transition-all duration-200">
                            <ClipboardList className="h-6 w-6 text-blue-800 group-hover:text-blue-900 transition-colors duration-200" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-lg group-hover:text-blue-100 transition-colors duration-200">ProjectSync</span>
                        </div>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex md:items-center md:space-x-2">
                        {user || isProtectedRoute ? (
                            <>
                                <Link
                                    to="/projects"
                                    className={`${isActive('/projects')} text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out flex items-center`}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Projects
                                </Link>
                                <Link
                                    to="/submit-project"
                                    className={`${isActive('/submit-project')} text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out flex items-center`}
                                >
                                    <FolderPlus className="mr-1 h-4 w-4" />
                                    New Project
                                </Link>

                                {/* Logout button only */}
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out flex items-center"
                                >
                                    <LogOut className="h-4 w-4 text-white" />
                                    <span className="ml-1 text-white">Logout</span>
                                </button>
                            </>
                        ) : null}
                    </div>

                    {/* Mobile menu button - only show if user is logged in or on protected route */}
                    {(user || isProtectedRoute) && (
                        <div className="flex md:hidden items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none transition-all duration-200 ease-in-out"
                                aria-expanded={isMenuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile dropdown menu - replaces the previous modal style */}
            {isMenuOpen && (user || isProtectedRoute) && (
                <div className="md:hidden absolute right-0 w-48 mt-1 mr-4 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                        <Link
                            to="/projects"
                            className="flex items-center px-4 py-2 text-blue-800 hover:bg-blue-50 border-b border-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FileText className="h-5 w-5 mr-3" />
                            <span className="font-medium">Projects</span>
                        </Link>
                        <Link
                            to="/submit-project"
                            className="flex items-center px-4 py-2 text-blue-800 hover:bg-blue-50 border-b border-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FolderPlus className="h-5 w-5 mr-3" />
                            <span className="font-medium">New Project</span>
                        </Link>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                handleLogout();
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;