// AddProductForm.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {apiService} from "../services/ApiService.ts";

const AddProductForm: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response  = await apiService.postData ('/iot/product', { id: Math.random(), name, price: parseFloat(price) });

        console.log(response);
        if(response.status === 200){

            dispatch(addProduct({ id: Math.random(), name, price: parseFloat(price) }));
        }
        setName('');
        setPrice('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        Add Product
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Product Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Add Product
                    </Button>
                </Grid>
            </Grid>

        </form>
    );
};

export default AddProductForm;
