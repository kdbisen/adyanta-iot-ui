// ApiService.ts

import axios, { AxiosResponse } from 'axios';
import {Env} from "../Env.ts";

// Define your base URL for the backend server
const baseURL = `${Env.API_BASE_URL}`;


// Create an Axios instance with baseURL
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}` // Attach token to Authorization header
    }
});

// Define custom types for response and error
type ApiResponse<T> = Promise<AxiosResponse<T>>;
//type ApiError = Promise<AxiosError>;

// Define your API methods
export const apiService = {


    // Example method to fetch data
    fetchData: async <T>(url: string): ApiResponse<T> => {
        try {

            const response = await axiosInstance.get<T>(url);
            return response;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    // Example method to post data
    postData: async <T>(url: string, data: any): ApiResponse<T> => {
        console.log(url)
        console.log(data)
        try {
            const response = await axiosInstance.post<T>(url, data);
            return response;
        } catch (error) {
            console.log(error)
            alert(error);
            throw error;

        }
    },

    // Add more methods as needed for different API requests
};
