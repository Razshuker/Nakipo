import React from 'react';
import { Navigate } from 'react-router-dom';
import {getCookie} from "./Services/CommonConfigurations";


const PrivateRoute = ({ children }) => {
    const accessToken = getCookie('accessToken');
    const userId = getCookie('userId');

    const isAuthenticated = accessToken != null &&  userId != null;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
