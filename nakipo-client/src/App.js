import {Route, Routes, useLocation} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import {useEffect} from "react";

function App() {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        // Remove any previously set page class
        document.body.classList.remove("dark-blue","dark-coral");

        if (path.includes("mission-done") || path.includes("takePhoto")) {
            document.body.classList.add("dark-blue");
        } else if(path.includes("login") || path.includes("register")) {
            document.body.classList.remove("dark-coral");
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
