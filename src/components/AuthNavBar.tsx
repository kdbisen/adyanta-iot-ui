import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,

    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    ListItemButton, ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { RootState } from '../redux/store';
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MemoryIcon from "@mui/icons-material/Memory";
import {useAuth} from "../services/AuthContext.tsx"; // Import your root state type

// Define a type for user details


// Map Redux state to component props
const mapState = (state: RootState) => ({
    user: state.auth.user // Assuming you have a slice named "user" in your Redux store
});

// Define props type including Redux props
//type PropsFromRedux = ConnectedProps<typeof connector>;

// Combine component props and Redux props
//type Props = PropsFromRedux;

interface Props  {
    setSelectedMenu: (menuTitle: string) => void;
}


function AuthNavBar(props: Props) {
    const { userResponse } = useAuth();
    console.log(props)
    console.log(userResponse)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuSelect = (menu: string) => {
        props.setSelectedMenu(menu);

    };

    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: '#013219' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        IoT Company
                    </Typography>
                    <div>
                        <IconButton color="inherit" onClick={handleAvatarClick}>
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            id="avatar-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>{userResponse ?userResponse.user.fullName: '------'}</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
                <div onClick={toggleDrawer}>
                    {['Devices', 'Products' ].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={() => handleMenuSelect(text)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <Inventory2Icon /> : <MemoryIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </div>
            </Drawer>
        </div>
    );
}

// Connect component to Redux store
const connector = connect(mapState);

export default connector(AuthNavBar);
