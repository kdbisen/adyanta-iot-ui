// AddDeviceForm.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDevice } from '../redux/deviceSlice';
import {Button, Grid, TextField, Typography} from "@mui/material";

import {apiService} from "../services/ApiService.ts";


const AddDeviceForm: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addDevice({ id: Math.random(), name, description }));


        const response  = await apiService.postData ('/iot/device', { id: Math.random(), name, description });

//        const response: IUserResponse = await AuthService.login(credentials);
        console.log(response)

        if (response.data) {
            dispatch(addDevice({ id: Math.random(), name, description }));
         /*   const userResponse: IUserResponse = response.data;

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
            // Redirect to the dashboard or any other protected route*/
            window.location.href = '/dashboard'; // For example, redirect to the dashboard*/
        } else {
            alert('Invalid username or password');
        }


        setName('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        Add Device
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Device Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Add Device
                    </Button>
                </Grid>
            </Grid>

        </form>
    );
};

export default AddDeviceForm;
