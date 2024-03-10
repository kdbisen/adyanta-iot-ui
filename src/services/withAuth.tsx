// withAuth.tsx
import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming you have AuthProvider and useAuth hooks implemented

const withAuth = <P extends object>(
    WrappedComponent: ComponentType<P>
): React.FC<P> => {
    const WithAuth: React.FC<P> = (props) => {
        const { user } = useAuth();
        console.log(user)
        if (!user) {
            return <Navigate to="/signin" replace />;
        }

        return <WrappedComponent {...props} />;
    };

    return WithAuth;
};

export default withAuth;
