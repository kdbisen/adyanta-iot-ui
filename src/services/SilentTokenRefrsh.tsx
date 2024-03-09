import React, {useEffect} from 'react';
import axios from 'axios';

const TOKEN_REFRESH_INTERVAL = 60000; // 1 minute

const SilentTokenRefresh: React.FC = () => {


    useEffect(() => {
        const refreshToken = async () => {
            try {
                // Get the token from local storage
                const refreshToken = localStorage.getItem('refreshToken');
                const token = localStorage.getItem('token');
                if (!token) {
                    return; // No token found, do nothing
                }

                // Decode the token to check the expiry time
                const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
                const expiryTimeInSeconds = decodedToken.exp;

                // Calculate the time remaining until the token expires
                const currentTimeInSeconds = Math.floor(Date.now() / 1000);
                const timeUntilExpiryInSeconds = expiryTimeInSeconds - currentTimeInSeconds;

                // If the token is about to expire, refresh it
                if (timeUntilExpiryInSeconds < TOKEN_REFRESH_INTERVAL / 1000) {
                    const response = await axios.post('http://localhost:8080/refreshtoken',{refreshToken:refreshToken});
                    const newToken = response.data.token;
                    // Update the token in local storage
                    localStorage.setItem('token', newToken);
                    // Set authentication status to true

                }
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        };

        // Call refreshToken initially and then at regular intervals
        refreshToken();
        const refreshTokenInterval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);

        // Cleanup function to clear the interval when the component is unmounted
        return () => clearInterval(refreshTokenInterval);
    }, []);



    return (
        <div>


        </div>
    );
};

export default SilentTokenRefresh;
