// deviceSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Device {
    id: number;
    name: string;
    description: string;
}

interface DeviceState {
    devices: Device[];
}

const initialState: DeviceState = {
    devices: [],
};

const deviceSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        addDevice(state, action: PayloadAction<Device>) {
            state.devices.push(action.payload);
        },
    },
});

export const { addDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
