// store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import deviceReducer from './deviceSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        devices: deviceReducer,
        // Add other reducers here if needed
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
