// Dashboard.tsx

import React, {useState} from 'react';
import AuthNavBar from "./AuthNavBar.tsx";
import AddProductForm from "./AddProductForm.tsx";
import ProductList from "./ProductList.tsx";
import DeviceList from "./DeviceList.tsx";
import AddDeviceForm from "./AddDeviceForm.tsx";
import {useAuth} from "../services/AuthContext.tsx";



const Dashboard: React.FC = ( ) => {
    const { userResponse } = useAuth();
    console.log(userResponse)
    const [selectedMenu, setSelectedMenu] = useState('Devices');

    return (
        <div>
            <AuthNavBar setSelectedMenu={menuTitle =>setSelectedMenu(menuTitle) }/>
            {/*<SilentTokenRefresh/>*/}

            <div style={{display: 'flex'}}>

                <div style={{flexGrow: 1, padding: '20px'}}>
                    {selectedMenu === 'Devices' && (
                        <>

                            <AddDeviceForm/>
                            <DeviceList devices={[]}/>
                        </>
                    )}
                    {selectedMenu === 'Products' && (
                        <>

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
