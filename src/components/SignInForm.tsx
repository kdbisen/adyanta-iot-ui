import React, {useState} from 'react';
import {Button, Container, Grid, TextField, Typography} from '@mui/material';
import NavBar from "./NavBar.tsx";
import {apiService} from "../services/ApiService.ts";
import {AxiosResponse} from "axios";
import {useDispatch} from "react-redux";
import {login} from "../redux/authSlice.ts";

interface IUserResponse {
    id: number;
    email: string;
    username: string;
    token: string;
    type: string;
    refreshToken: string;
    roles: string[];
}

const SignInForm: React.FC = () => {
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response: AxiosResponse<IUserResponse> = await apiService.postData<IUserResponse>('/api/auth/signin', credentials);

//        const response: IUserResponse = await AuthService.login(credentials);
        console.log(response)

        if (response.data) {
            const userResponse: IUserResponse = response.data;

            const token = userResponse.token;
            const refreshToken = userResponse.refreshToken;
            const username = userResponse.username;
            // Save token to local storage
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userName', username);
            const user = {id: userResponse.id, username: userResponse.username}; // Example user object
            console.log(user)
            // Dispatch login action with user details
            let dispatch1 = dispatch(login(user));
            console.log(dispatch1)
             // Redirect to the dashboard or any other protected route
               window.location.href = '/dashboard'; // For example, redirect to the dashboard*/
        } else {
            alert('Invalid username or password');
        }
    };


    return (
        <div>
            <NavBar/>
            <Container maxWidth="xs">

                <Typography variant="h4" align="center" gutterBottom>
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                type="username"
                                value={credentials.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>

    );
}

export default SignInForm;
