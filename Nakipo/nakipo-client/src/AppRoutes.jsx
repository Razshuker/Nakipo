import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import TakePhoto from "./Components/TakePhoto";
import MissionDone from "./Components/MissionDone";
import MainAccount from "./Components/Account/MainAccount";
import About from "./Components/About";
import PrivateRoute from "./PrivateRoute";
import GetCupon from "./Components/Account/GetCupon";


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
    element: (
        <PrivateRoute>
        <TakePhoto/>
        </PrivateRoute>
        )
},
    {
    path: "/mission-done",
    element:(
        <PrivateRoute>
    <MissionDone/>
        </PrivateRoute>
)
},
    {
    path: "/",
    element:(
        <PrivateRoute>
        <MainAccount/>
        </PrivateRoute>
    )
},
    {
    path: "/about-us",
    element:(
        <PrivateRoute>
        <About/>
        </PrivateRoute>
    )
},
    {
    path: "/share",
    element:(
        <PrivateRoute>
        <GetCupon/>
        </PrivateRoute>
    )
},

]

export default AppRoutes;