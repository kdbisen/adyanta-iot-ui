// ProtectedRoute.tsx
import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthContext';

type ProtectedRouteProps = {
    element: React.ReactNode;
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, ...rest }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/signin" />}
        />
    );
};

export default ProtectedRoute;
