import React from 'react';
import {AppBar, Toolbar, Typography, Tabs, Tab, Chip} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (


        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                   Adyanta IOT
                </Typography>
                <Tabs value={false}   textColor="secondary" indicatorColor="secondary">
                    <Tab label={<Chip label="Sign in" color="info" variant="outlined" style={{    backgroundColor: 'white'}}/>} component={RouterLink} to="/signin" />
                    <Tab label={<Chip label="Register" color="error" variant="outlined" style={{    backgroundColor: 'white'}} />} component={RouterLink} to="/signup" />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
