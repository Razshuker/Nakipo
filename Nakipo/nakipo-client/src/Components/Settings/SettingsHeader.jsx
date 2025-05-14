import Header from "../Headers/Header";
import React from "react";
import {useGetUserQuery} from "../Auth/AuthApiSlice";

export default function SettingsHeader({settings, setSettings}) {
    const { data:user, isLoading } = useGetUserQuery();

    return (
        <>
        <Header/>
    <div className="user-info dark-blue text-dark-coral py-4 text-center">
        {isLoading ? <h2>Loading...</h2> :
            <h2>היי {user && user.username}</h2>
        }
    </div>
    <div className="bottom-bar row row-cols-2">
        <div className="col wallet p-0">
            <div
                onClick={() => setSettings("account")}
                className={`${settings === "account" ? "text-dark-coral denim" : "dark-coral text-dark-blue"} mt-1 me-1 mb-1 py-2 px-3`}
            >
                <p className="col-auto">פרטי משתמש</p>
            </div>
        </div>

        <div className="col rating-table p-0">
            <div
                onClick={() => setSettings("password")}
                className={`${settings === "password" ? "text-dark-coral denim" : "dark-coral text-dark-blue"} mt-1 ms-1 me-1 mb-1 py-2 px-3`}
            >
                <p className="col-auto">עדכון סיסמה</p>
            </div>
        </div>
    </div>
        </>
)
}