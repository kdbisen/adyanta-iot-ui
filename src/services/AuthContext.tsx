// AuthProvider.tsx
import React, {createContext, ReactNode, useContext, useState} from 'react';

/*type User = {
    username: string;
};*/

interface User {
    id: number;
    email: string;
    fullName: string;
    roles: string[];
}

type AuthContextType = {
    user: User | null;
    loginUser: (token: string, user: User) => void;
    logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const loginUser = (token: string, user: User) => {
        // Here you can decode the token and extract user information
        // For simplicity, let's assume token contains username
      //  const decodedToken = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('token', token);
        setUser(user);
    };

    const logoutUser = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children} {/* This is where TypeScript might raise an error */}
        </AuthContext.Provider>
    );
};
