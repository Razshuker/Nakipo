import React from 'react';
import { Navigate } from 'react-router-dom';
import {getCookie} from "./Services/CommonConfigurations";


const PrivateRoute = ({ children }) => {
    const accessToken = getCookie('access-token');
    const userId = getCookie('user-id');

    const isAuthenticated = (!accessToken || accessToken != null || accessToken!= "") && (!userId || userId != null || userId != "");

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
