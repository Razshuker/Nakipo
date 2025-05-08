import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DesktopView from './Components/DesktopView';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./App/store";
import {BrowserRouter, useLocation} from "react-router-dom";

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
        <BrowserRouter>
            <Provider store={store}>
                {isMobile ? <App /> : <DesktopView />}
            </Provider>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

reportWebVitals();
