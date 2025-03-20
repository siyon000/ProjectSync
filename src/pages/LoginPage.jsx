import React from 'react';
import NavBar from '../components/common/NavBar';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <NavBar />
            <div className="flex-grow flex justify-center items-center">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg animate-fade-in">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-primary">Welcome to ProjectSync</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to access your project management dashboard
                        </p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
