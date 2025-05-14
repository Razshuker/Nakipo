import { Navigate, useLocation } from "react-router-dom";
import {getCookie} from "./Services/CommonConfigurations";

const InitialRoute = ({ children }) => {
    const location = useLocation();

    const accessToken = getCookie('accessToken');
    const userId = getCookie('userId');
    const hasVisited = getCookie('hasVisited');

    const isAuthenticated = accessToken != null && userId != null;

    // If not visited and not on explanation page, force redirect to explanation
    if (!hasVisited && location.pathname !== '/01') {
        return <Navigate to="/01" replace />;
    }

    // If visited but not logged in and not already on login page, redirect
    if (hasVisited && !isAuthenticated && location.pathname !== '/login') {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, allow access
    return children;
};

export default InitialRoute;
