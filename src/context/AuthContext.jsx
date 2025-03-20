import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // In a real app, this would validate credentials with a backend
                if (credentials.username === 'admin' && credentials.password === 'password') {
                    const userData = { id: 1, username: credentials.username, role: 'admin' };
                    setUser(userData);
                    resolve(userData);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);