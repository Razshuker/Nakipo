import React from "react";
import {useNavigate} from "react-router-dom";
import {s3Url} from "../../Services/CommonConfigurations";
import '../../CSS/explanation.css'

export default function SecondStep({nextToStep03}){
    const nav = useNavigate();

    return (
            <div>
                <img src={s3Url+"peteat.png"} height={70} className="d-flex mx-auto mt-2"/>
                <div className="explantion-container">
                <h1 className="text-center text-dark-blue my-5 col-auto">
                    שלוף שקית,
                    <br/>
                    תאסוף, תצלם-
                    <br/>
                    וקיבלת מטבע.
                </h1>
                <button onClick={()=> nextToStep03()} className="btn dark-blue text-dark-coral mx-auto btn-block w-75 d-flex justify-content-center py-3 my-4 col-auto">אוקיי</button>
                </div>
                <img src="/files/Face_02.gif" alt="gif" height={200} className="d-flex mx-auto gifs"/>
            </div>
    )
}