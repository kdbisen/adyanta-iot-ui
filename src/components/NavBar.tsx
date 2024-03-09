import React from 'react';
import { AppBar, Toolbar, Typography,   Tabs, Tab } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (


        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                   Adyanta IOT
                </Typography>
                <Tabs value={false}>
                    <Tab label="Sign In" component={RouterLink} to="/signin" />
                    <Tab label="Sign Up" component={RouterLink} to="/signup" />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
