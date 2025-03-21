import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FileText, LogOut, Menu, X, Plus, User } from 'lucide-react';

const NavBar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-gradient-to-r from-blue-700 to-blue-600 shadow-lg sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center  text-white text-xl font-bold group">
                        <FileText className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                        <span className="group-hover:text-blue-200 transition-colors duration-200">ProjectSync</span>
                    </div>
                    {/* Desktop menu */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {user && (
                            <>
                                <Link to="/projects" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out flex items-center">
                                    <FileText className="mr-1 h-4 w-4" />
                                    Projects
                                </Link>
                                <Link to="/submit-project" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out flex items-center">
                                    <Plus className="mr-1 h-4 w-4" />
                                    Submit Project
                                </Link>
                                <div className="border-l border-blue-300 h-6 mx-2"></div>
                                <div className="flex items-center text-white mr-4">
                                    <div className="bg-blue-300 rounded-full p-1 mr-2 shadow-md">
                                        <User className="h-4 w-4 text-blue-700" />
                                    </div>
                                    <span className="text-sm font-medium">{user.username || 'User'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out flex items-center shadow-md hover:shadow-lg"
                                >
                                    <LogOut className="mr-1 h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden animate-fade-in">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-blue-400 bg-blue-600 shadow-inner">
                        {user && (
                            <>
                                <div className="flex items-center text-white px-3 py-2">
                                    <div className="bg-blue-300 rounded-full p-1 mr-2 shadow-md">
                                        <User className="h-4 w-4 text-blue-700" />
                                    </div>
                                    <span className="font-medium">{user.username || 'User'}</span>
                                </div>
                                <Link
                                    to="/projects"
                                    className="text-white hover:bg-blue-500  px-3 py-2 rounded-md text-base font-medium flex items-center transition-all duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <FileText className="mr-2 h-5 w-5" />
                                    Projects
                                </Link>
                                <Link
                                    to="/submit-project"
                                    className="text-white hover:bg-blue-500  px-3 py-2 rounded-md text-base font-medium flex items-center transition-all duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Plus className="mr-2 h-5 w-5" />
                                    Submit Project
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left bg-blue-800 hover:bg-blue-900 text-white  px-3 py-2 rounded-md text-base font-medium flex items-center transition-all duration-200 shadow-md"
                                >
                                    <LogOut className="mr-2 h-5 w-5" />
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;