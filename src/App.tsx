import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from "./components/Dashboard.tsx";
import {AuthProvider} from "./services/AuthContext.tsx";
import theme from "./theme.ts";

import { ThemeProvider } from '@mui/material/styles';
import {CssBaseline} from "@mui/material";


const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
        <AuthProvider>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/signin" element={<SignInForm/>}/>
                    <Route path="/signup" element={<SignUpForm/>}/>
                    <Route path="/" element={<Navigate to="/signin"/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>

                </Routes>
            </Router>
        </AuthProvider>
        </ThemeProvider>
    );
}


export default App;
