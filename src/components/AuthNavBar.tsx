import React, {useEffect} from 'react';
import {AppBar, Toolbar, Typography,  Button} from '@mui/material';
import {apiService} from "../services/ApiService.ts";
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../redux/authSlice';
import {RootState} from "../redux/store.ts";


const AuthNavBar: React.FC = () => {

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
/*    const user = useSelector((state: RootState) => {

        console.log(state)
        return state.auth.user;
    });*/
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(isAuthenticated)
        localStorage.getItem('token')
        if(!localStorage.getItem('token')) {
          window.location.href = '/signin';
        }
    })

    const handleSignout = async ( ) => {
        // Clear the token from local storage

        // Clear the authentication status

        const response = await apiService.postData('/api/auth/signout',{});
        console.log('Data posted successfully:', response.data);
        if(response){
            dispatch(logout());
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.href = '/signin';
        }
        // Optionally redirect the user to the login page or any other page

    };
    return (


        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    Adyanta IOT <h1>Welcome, {localStorage.getItem('userName')}!</h1>
                </Typography>

                {localStorage.getItem('token') ? (
                    <div>

                        <Button onClick={()=>handleSignout()} color="inherit" >Log Out</Button>
                    </div>
                ) : (
                    <h1>Please sign in</h1>
                )}

            </Toolbar>
        </AppBar>
    );
}

export default AuthNavBar;
