import React, {  useState} from 'react';
import {Button, Container, Grid, Paper, TextField, Typography} from '@mui/material';
import NavBar from "./NavBar.tsx";
import {apiService} from "../services/ApiService.ts";
import {AxiosResponse} from "axios";
import { useAuth} from '../services/AuthContext';

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
    const { loginUser } = useAuth();
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

//        const response: IUserResponse = await AuthService.login(credentials);
        console.log(response)
        loginUser(response.data.token, response.data.user);
        window.location.href = '/dashboard';
        /* if (response.data) {
            // const userResponse: IUserResponse = response.data;
          //   const token = userResponse.token;
           //  loginUser(token);
            // const refreshToken = userResponse.refreshToken;
             //const user: IUser = userResponse.user;

             // Save token to local storage
           /!*  localStorage.setItem('token', token);
             localStorage.setItem('refreshToken', refreshToken);
             localStorage.setItem('fullName', user.fullName);
             localStorage.setItem('email', user.email);
              console.log(user)
             // Dispatch login action with user details
             let dispatch1 = dispatch(login(user));
              console.log(dispatch1)*!/
              // Redirect to the dashboard or any other protected route
                window.location.href = '/dashboard'; // For example, redirect to the dashboard*!/
         } else {
             alert('Invalid username or password');
         }*/
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
