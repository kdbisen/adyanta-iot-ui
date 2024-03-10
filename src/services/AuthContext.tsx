// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface User {
    username: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (token: string) => {
        // Here you can decode the token and extract user information
        // For simplicity, let's assume token contains username
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser({ username: decodedToken.username });
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
