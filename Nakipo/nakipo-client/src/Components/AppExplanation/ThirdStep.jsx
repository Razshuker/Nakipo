import React from "react";
import {useNavigate} from "react-router-dom";
import '../../CSS/explanation.css'

export default function ThirdStep() {
    const nav = useNavigate();

    return (
        <div>
            <img src={"/files/Logo_1.png"} height={55} className="d-flex mx-auto mt-4"/>
            <div className="explantion-container">
            <h1 className="text-center text-dark-blue my-5 col-auto">
              המטבעות
                <br/>
             שוות כסף
                <br/>
               ופינוקים.
            </h1>
            <button onClick={()=> nav("/register")} className="btn dark-blue text-dark-coral mx-auto btn-block w-75 d-flex justify-content-center py-3 my-4 col-auto">רק קודם, בואו נירשם</button>
            </div>
            <img src="/files/Face_05.gif" alt="gif" height={200} className="d-flex mx-auto gifs"/>
        </div>
    )
}