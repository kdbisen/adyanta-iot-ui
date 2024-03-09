import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import {apiService} from "../services/ApiService.ts";
import NavBar from "./NavBar.tsx";
interface FormData {
  firstName: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  role: string[];
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    username: '',
    lastName: '',
    email: '',
    name: '',
    password: '',
    role: [],
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Make a POST request

      formData.username = formData.email;
      formData.name = formData.firstName + ' ' + formData.lastName;
      formData.role = ['USER'];

      const response = await apiService.postData<FormData>('/api/auth/signup', formData);
      console.log('Data posted successfully:', response.data);
      window.location.href = '/signin';
      // Reset form data
      setFormData({ firstName: '',lastName:'',name:'', email: '',password:'',username:'',role:[] });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
      <div>
        <NavBar />
      <Container maxWidth="xs">

        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      </div>
  );
}

export default SignUpForm;