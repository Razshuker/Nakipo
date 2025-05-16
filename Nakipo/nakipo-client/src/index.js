import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DesktopView from './Components/DesktopView';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./App/store";
import {BrowserRouter} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";

function RootComponent() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <GoogleOAuthProvider clientId="962429869854-7vjm85cs5nsh2urlsa3ibsgosv07qsfu.apps.googleusercontent.com">
        <BrowserRouter>
            <Provider store={store}>
                {isMobile ? <App /> : <DesktopView />}
            </Provider>
        </BrowserRouter>
        </GoogleOAuthProvider>

    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

reportWebVitals();
