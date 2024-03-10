import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from "./components/Dashboard.tsx";
import {AuthProvider} from "./services/AuthContext.tsx";

const App: React.FC = () => {
    return (
        <AuthProvider>
        <Router>
            <div>
                <Routes>
                    <Route path="/signin" element={<SignInForm/>}/>
                    <Route path="/signup" element={<SignUpForm/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/" element={<Navigate to="/signin"/>}/>
                </Routes>
            </div>
        </Router>
        </AuthProvider>
    );
}

export default App;
