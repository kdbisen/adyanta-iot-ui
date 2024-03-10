// AddDeviceForm.tsx

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addDevice} from '../redux/deviceSlice';
import {
    Button,
    FormControlLabel,

    FormLabel,

    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";

import {apiService} from "../services/ApiService.ts";


const AddDeviceForm: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setDeviceType] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addDevice({id: Math.random(), name, description}));
        const response = await apiService.postData('/iot/device', {id: Math.random(), name, description, type});
//        const response: IUserResponse = await AuthService.login(credentials);
        console.log(response)
        if (response.data) {
            dispatch(addDevice({id: Math.random(), name, description}));
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
                    <FormLabel id="demo-row-radio-buttons-group-label">Please select Device Type</FormLabel>
                    <RadioGroup
                        onChange={(_event, value) => setDeviceType(value)}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="resberry_pi" control={<Radio />} label="Resberry PI" />
                        <FormControlLabel value="wifi_device" control={<Radio />} label="Wifi Device" />
                    </RadioGroup>
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
