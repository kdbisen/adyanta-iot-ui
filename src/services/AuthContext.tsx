// AuthProvider.tsx
import React, {createContext, ReactNode, useContext, useState} from 'react';

interface User {
    id: number;
    email: string;
    fullName: string;
    roles: string[];
}

interface IUserResponse {
    user: User;
    token: string;
    type: string;
    refreshToken: string;
}

type AuthContextType = {
    user: User | null;
    userResponse: IUserResponse | null;
    loginUserResponse: ( user: IUserResponse) => void;
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
    const [userResponse, setUserResponse] = useState<IUserResponse | null>(null);

    const loginUserResponse = (  userRes: IUserResponse) => {
        console.log('loginUserResponse', userRes);
        setUserResponse(userRes)
    }
    const loginUser = (token: string, user: User) => {
        // Here you can decode the token and extract user information
        // For simplicity, let's assume token contains username
      //  const decodedToken = JSON.parse(atob(token.split('.')[1]));
     //   localStorage.setItem('token', token);
        console.log('user')
        console.log(token)
        console.log(user)
        setUser(user);
    };

    const logoutUser = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, userResponse, loginUser, logoutUser, loginUserResponse }}>
            {children} {/* This is where TypeScript might raise an error */}
        </AuthContext.Provider>
    );
};
