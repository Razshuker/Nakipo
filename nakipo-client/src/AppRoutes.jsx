import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import TakePhoto from "./Components/TakePhoto";
import MissionDone from "./Components/MissionDone";
import MainAccount from "./Components/Account/MainAccount";


const AppRoutes =[
    {
    path: "/login",
    element: <Login/>
},
    {
    path: "/register",
    element: <Register/>
},
    {
    path: "/takePhoto",
    element: <TakePhoto/>
},
    {
    path: "/mission-done",
    element: <MissionDone/>
},
    {
    path: "/account",
    element: <MainAccount/>
},

]

export default AppRoutes;