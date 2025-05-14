import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import TakePhoto from "./Components/TakePhoto";
import MissionDone from "./Components/MissionDone";
import MainAccount from "./Components/Account/MainAccount";
import About from "./Components/About";
import GetCupon from "./Components/Account/GetCupon";
import Settings from "./Components/Auth/Settings";
import InitialRoute from "./InitialRoute";
import Explanation from "./Components/AppExplanation/Explanation";

const AppRoutes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/explanation",
        element: <Explanation />,
    },
    {
        path: "/takePhoto",
        element: (
            <InitialRoute>
                <TakePhoto />
            </InitialRoute>
        ),
    },
    {
        path: "/mission-done",
        element: (
            <InitialRoute>
                <MissionDone />
            </InitialRoute>
        ),
    },
    {
        path: "/",
        element: (
            <InitialRoute>
                <MainAccount />
            </InitialRoute>
        ),
    },
    {
        path: "/about-us",
        element: (
            <InitialRoute>
                <About />
            </InitialRoute>
        ),
    },
    {
        path: "/share",
        element: (
            <InitialRoute>
                <GetCupon />
            </InitialRoute>
        ),
    },
    {
        path: "/settings",
        element: (
            <InitialRoute>
                <Settings />
            </InitialRoute>
        ),
    },
];

export default AppRoutes;
