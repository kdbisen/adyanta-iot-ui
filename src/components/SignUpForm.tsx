import React, {useState, ChangeEvent} from 'react';
import {TextField, Button, Grid, Typography, Container, Paper} from '@mui/material';
import {apiService} from "../services/ApiService.ts";
import NavBar from "./NavBar.tsx";
import {login} from "../redux/authSlice.ts";
import {useDispatch} from "react-redux";
import {useAuth} from "../services/AuthContext.tsx";
import {AxiosResponse} from "axios";

interface FormData {
    fullName: string;
    email: string;
    password: string;
    roles: string[];
}
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


const SignUpForm: React.FC = () => {
    const { loginUser } = useAuth();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<FormData>({

        fullName: '',
        email: '',
        password: '',
        roles: [],
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            formData.roles = ['ROLE_USER'];
            const response: AxiosResponse<IUserResponse>  = await apiService.postData<IUserResponse>('/auth/register', formData);



            if (response.data) {
                const userResponse: IUserResponse = response.data;
                const token = userResponse.token;
                loginUser(token);
                const refreshToken = userResponse.refreshToken;
                const user: IUser = userResponse.user;
                // Save token to local storage
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('fullName', user.fullName);
                localStorage.setItem('email', user.email);
                console.log(user)
                // Dispatch login action with user details
                let dispatch1 = dispatch(login(user));
                console.log(dispatch1)
                // Redirect to the dashboard or any other protected route
                window.location.href = '/dashboard'; // For example, redirect to the dashboard*!/
            } else {
                alert('Invalid username or password');
            }

        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <div>
            <NavBar/>
            <Container maxWidth="xs">
              <Paper style={{margin: '1rem', padding: '1rem'}} >
                <Typography variant="h4" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size={'small'}
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size={'small'}
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
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
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="secondary" fullWidth style={{borderRadius: '100px'}}>
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
              </Paper>
            </Container>
        </div>
    );
}

export default SignUpForm;