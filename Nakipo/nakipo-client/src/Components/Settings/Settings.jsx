import React, {useState} from "react";
import SettingsHeader from "./SettingsHeader";
import UpdateAccountDetails from "./UpdateAccountDetails";
import UpdatePassword from "./UpdatePassword";
import {useGetUserQuery} from "../Auth/AuthApiSlice";
import Header from "../Headers/Header";

export default function Settings(){
    const [settings,setSettings] = useState("account");
    const {data:user, isLoading} = useGetUserQuery();
    const userProvider = React.useMemo(() => user?.provider?.toLowerCase().trim() || "", [user]);



    return (
        <>
            {(userProvider === "google" || userProvider === "tiktok") ?
                <div>
                    <Header/>
                    <h2 className="text-center text-dark-blue my-4">עדכון פרטים</h2>
                    {isLoading ? <h2>בטעינה...</h2> :
                <UpdateAccountDetails user={user}/>}
                </div>
                :
                <div>
        <SettingsHeader settings={settings} setSettings={setSettings} />
                    {isLoading ? <h2>בטעינה...</h2> :
                        <>
            {settings === "account" && <UpdateAccountDetails user={user}/>}
            {settings === "password" && <UpdatePassword/>}
                        </>
                    }
                </div>
            }
        </>
    )
}