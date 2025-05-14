import React from "react";
import {useNavigate} from "react-router-dom";
import '../../CSS/explanation.css'

export default function FirstStep({nextToStep02}) {

    const nav = useNavigate();


    return (
        <div>
            <img src={"/files/Logo_1.png"} height={55} className="d-flex mx-auto mt-4"/>
            <div className="explantion-container">
            <h1 className="text-center text-dark-blue my-5">
יצאת עם הכלב?
                <br/>
הוא עשה קקי?
                <br/>
                מעולה.
            </h1>
            <button  onClick={() => {
                console.log("Button clicked");
                nextToStep02();
            }} className="btn dark-blue text-dark-coral btn-block mx-auto w-75 d-flex justify-content-center py-3 my-4">הבא</button>
            </div>
            <img src="/files/Face_01.gif" alt="gif" height={200} className="d-flex mx-auto gifs"/>
        </div>

    )
}