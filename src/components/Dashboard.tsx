// Dashboard.tsx

import React, {useState} from 'react';
import SilentTokenRefresh from "../services/SilentTokenRefrsh.tsx";
import AuthNavBar from "./AuthNavBar.tsx";
import AddProductForm from "./AddProductForm.tsx";
import ProductList from "./ProductList.tsx";
import DeviceList from "./DeviceList.tsx";
import AddDeviceForm from "./AddDeviceForm.tsx";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MemoryIcon from '@mui/icons-material/Memory';

import {Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer} from '@mui/material';

const drawerWidth = 240;


const Dashboard: React.FC = () => {

    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('');

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpenDrawer(open);
    };
    const handleMenuSelect = (menu: string) => {
        setSelectedMenu(menu);
        setOpenDrawer(false);
    };

    return (
        <div>
            <AuthNavBar/>
            <SilentTokenRefresh/>
            <Button onClick={toggleDrawer(true)}>Toggle Menu</Button>

            <div style={{display: 'flex'}}>
                <SwipeableDrawer
                    anchor="left"
                    open={openDrawer}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    style={{width: drawerWidth}}
                >

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
                </SwipeableDrawer>
                <div style={{flexGrow: 1, padding: '20px'}}>
                    {selectedMenu === 'Devices' && (
                        <>
                            <h1>Add Device</h1>
                            <AddDeviceForm/>
                            <DeviceList/>
                        </>
                    )}
                    {selectedMenu === 'Products' && (
                        <>
                            <h1>Add Product</h1>
                            <AddProductForm/>
                            <ProductList/>
                        </>
                    )}
                </div>
            </div>
            {/* Add your dashboard content here */}
        </div>
    );
}

export default Dashboard;
