import React from "react";
import Header from "./Headers/Header";
import '../CSS/missionDone.css'
import {useGetUserQuery} from "./Auth/AuthApiSlice";
import Loading from "./Loading";
import {s3PublicFilesUrl} from "../Services/CommonConfigurations";


export default function MissionDone() {
    const { data:user, isLoading } = useGetUserQuery();
let username = user ? user.username : null;

if(isLoading){
    return <Loading />;
}

    return(
        <div className="dark-blue text-dark-coral mission-container-fluid">
            <Header/>
            <div className="mission-container">
            <h1 className="text-center col-auto">
           תודה {username}!
    <br/>
           צברת עוד מטבע לשימוש</h1>
            <img className="col-6 mx-auto" src={s3PublicFilesUrl + "Face_05.gif"} />
            </div>

        </div>
    )
}