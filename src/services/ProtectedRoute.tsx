// ProtectedRoute.tsx
import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           component: Component,
                                                           ...rest
                                                       }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            element={user ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default ProtectedRoute;
