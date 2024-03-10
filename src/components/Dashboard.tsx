// Dashboard.tsx

import React, {useState} from 'react';
import SilentTokenRefresh from "../services/SilentTokenRefrsh.tsx";
import AuthNavBar from "./AuthNavBar.tsx";
import AddProductForm from "./AddProductForm.tsx";
import ProductList from "./ProductList.tsx";
import DeviceList from "./DeviceList.tsx";
import AddDeviceForm from "./AddDeviceForm.tsx";
//import withAuth from '../services/withAuth.tsx';
import {useAuth} from "../services/AuthContext.tsx";



const Dashboard: React.FC = ( ) => {
    const { user } = useAuth();
    console.log(user)
    const [selectedMenu, setSelectedMenu] = useState('');




    return (
        <div>
            <AuthNavBar setSelectedMenu={menuTitle =>setSelectedMenu(menuTitle) }/>
            <SilentTokenRefresh/>

            <div style={{display: 'flex'}}>

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

export default  Dashboard;
