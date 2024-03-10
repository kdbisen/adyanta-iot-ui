// DeviceList.tsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Device {
    id: number;
    name: string;
    type: string;
    description: string;
}

interface IProps {
    devices: Device[];
}

function DeviceList  (props: IProps)  {

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
                        {props.devices.map((device) => (
                            <TableRow key={device.id}>
                                <TableCell>{device.name}</TableCell>
                                <TableCell>{device.type}</TableCell>
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
}
export default DeviceList;
