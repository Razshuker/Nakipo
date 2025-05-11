import {Route, Routes, useLocation} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import {useEffect} from "react";
import './index.css'

function App() {
    const location = useLocation();

    document.body.dir = 'rtl';


    useEffect(() => {
        const path = location.pathname;

        // Remove any previously set page class
        document.body.classList.remove("dark-blue","dark-coral");

        if (path.includes("mission-done") || path.includes("takePhoto")) {
            document.body.classList.add("dark-blue");
        } else if(path.includes("login") || path.includes("register") || path.includes("about") || path.includes("share")) {
            document.body.classList.add("dark-coral");
        }

    }, [location]);

    return (
      <>
          {/*<Header />*/}
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
      </>
  );
}

export default App;
