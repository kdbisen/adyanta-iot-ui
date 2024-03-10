import React, {  useState} from 'react';
import {Button, Container, Grid, Paper, TextField, Typography} from '@mui/material';
import NavBar from "./NavBar.tsx";
import {apiService} from "../services/ApiService.ts";
import {AxiosResponse} from "axios";
import { useAuth} from '../services/AuthContext';
import { useNavigate } from 'react-router-dom';

interface IUserResponse {
    user: IUser;
    token: string;
    type: string;
    refreshToken: string;
}
interface IUser {
    id: number;
    email: string;
    fullName: string;
    roles: string[];
}

const SignInForm: React.FC = () => {
    const { loginUserResponse } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: '', password: ''});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response: AxiosResponse<IUserResponse> = await apiService.postData<IUserResponse>('/auth/signin', credentials);
        loginUserResponse(response.data)
        navigate('/dashboard');
    };


    return (
        <div>
            <NavBar/>
            <Container maxWidth="xs">
                <Paper style={{margin: '1rem', padding: '1rem'}} >
                <Typography variant="h4" align="center" gutterBottom>
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size={'small'}
                                label="Email"
                                name="email"
                                type="email"
                                value={credentials.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size={'small'}
                                label="Password"
                                name="password"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="secondary" fullWidth style={{borderRadius: '100px'}}>
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                </Paper>
            </Container>
        </div>

    );
}

export default SignInForm;
