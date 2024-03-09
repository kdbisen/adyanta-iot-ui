// DeviceList.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DeviceList: React.FC = () => {
    const devices = useSelector((state: RootState) => state.devices.devices);

    return (
        <div>
            <h2>All Devices</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map((device) => (
                            <TableRow key={device.id}>
                                <TableCell>{device.name}</TableCell>
                                <TableCell>{device.description}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DeviceList;
