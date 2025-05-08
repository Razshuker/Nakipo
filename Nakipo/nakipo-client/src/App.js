import {Route, Routes, useLocation} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import {useEffect} from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import createCache from '@emotion/cache';
import stylisRTLPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from "@emotion/react";
import './index.css'

function App() {
    const location = useLocation();

    const rtlTheme = createTheme({
        direction: 'rtl',
        typography: {
            fontFamily: 'MyCustomFont, sans-serif',
        },

    });


    const rtlCache = createCache({
        key: 'mui-rtl',
        stylisPlugins: [stylisRTLPlugin],
    });

    document.body.dir = 'rtl';


    useEffect(() => {
        const path = location.pathname;

        // Remove any previously set page class
        document.body.classList.remove("dark-blue","dark-coral");

        if (path.includes("mission-done") || path.includes("takePhoto")) {
            document.body.classList.add("dark-blue");
        } else if(path.includes("login") || path.includes("register") || path.includes("about")) {
            document.body.classList.add("dark-coral");
        }

    }, [location]);

    return (
      <>
          <CacheProvider value={rtlCache}>
              <ThemeProvider theme={rtlTheme}>
                  <CssBaseline />
          {/*<Header />*/}
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
              </ThemeProvider>
          </CacheProvider>
      </>
  );
}

export default App;
